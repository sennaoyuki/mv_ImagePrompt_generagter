import pool from '../config/database';
import { GenreSpecificItem, Priority, PaginationParams, PaginatedResponse } from '../types';

export class GenreSpecificItemsModel {
  async findByGenreId(genreId: string, options: { seoOptimized?: boolean } = {}): Promise<GenreSpecificItem[]> {
    const { seoOptimized = false } = options;
    
    let query = `
      SELECT 
        id, genre_id, name, description, priority, seo_weight, 
        content_guidelines, created_at, updated_at
      FROM genre_specific_items
      WHERE genre_id = $1
    `;
    
    if (seoOptimized) {
      query += ' ORDER BY seo_weight DESC, priority DESC';
    } else {
      query += ' ORDER BY priority DESC, seo_weight DESC';
    }

    const result = await pool.query(query, [genreId]);
    return result.rows.map(this.mapRowToItem);
  }

  async findById(id: string): Promise<GenreSpecificItem | null> {
    const query = `
      SELECT 
        id, genre_id, name, description, priority, seo_weight, 
        content_guidelines, created_at, updated_at
      FROM genre_specific_items
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? this.mapRowToItem(result.rows[0]) : null;
  }

  async findWithPagination(
    genreId: string,
    filters: { priority?: Priority },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<GenreSpecificItem>> {
    const { priority } = filters;
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    let whereClause = ' WHERE genre_id = $1';
    const params: any[] = [genreId];

    if (priority) {
      whereClause += ' AND priority = $2';
      params.push(priority);
    }

    // Count total items
    const countQuery = `SELECT COUNT(*) FROM genre_specific_items${whereClause}`;
    const countResult = await pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated items
    const query = `
      SELECT 
        id, genre_id, name, description, priority, seo_weight, 
        content_guidelines, created_at, updated_at
      FROM genre_specific_items
      ${whereClause}
      ORDER BY priority DESC, seo_weight DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    params.push(limit, offset);
    const result = await pool.query(query, params);

    return {
      data: result.rows.map(this.mapRowToItem),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  private mapRowToItem(row: any): GenreSpecificItem {
    return {
      id: row.id.toString(),
      genreId: row.genre_id.toString(),
      name: row.name,
      description: row.description,
      priority: row.priority,
      seoWeight: row.seo_weight,
      contentGuidelines: row.content_guidelines || {
        recommendedLength: 0,
        keywordSuggestions: [],
        avoidExpressions: [],
      },
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      type: 'genre_specific',
    };
  }
}