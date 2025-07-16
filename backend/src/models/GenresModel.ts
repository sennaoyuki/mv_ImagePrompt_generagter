import pool from '../config/database';
import { Genre, GenreCategory, PaginationParams, PaginatedResponse } from '../types';

export class GenresModel {
  async findAll(): Promise<Genre[]> {
    const query = `
      SELECT id, name, category, seo_keywords, created_at, updated_at
      FROM genres
      ORDER BY name
    `;

    const result = await pool.query(query);
    return result.rows.map(this.mapRowToGenre);
  }

  async findById(id: string): Promise<Genre | null> {
    const query = `
      SELECT id, name, category, seo_keywords, created_at, updated_at
      FROM genres
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? this.mapRowToGenre(result.rows[0]) : null;
  }

  async findByName(name: string): Promise<Genre | null> {
    const query = `
      SELECT id, name, category, seo_keywords, created_at, updated_at
      FROM genres
      WHERE name = $1
    `;

    const result = await pool.query(query, [name]);
    return result.rows.length > 0 ? this.mapRowToGenre(result.rows[0]) : null;
  }

  async findWithPagination(
    filters: { category?: GenreCategory },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Genre>> {
    const { category } = filters;
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    let whereClause = '';
    const params: any[] = [];

    if (category) {
      whereClause = ' WHERE category = $1';
      params.push(category);
    }

    // Count total items
    const countQuery = `SELECT COUNT(*) FROM genres${whereClause}`;
    const countResult = await pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated items
    const query = `
      SELECT id, name, category, seo_keywords, created_at, updated_at
      FROM genres
      ${whereClause}
      ORDER BY name
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    params.push(limit, offset);
    const result = await pool.query(query, params);

    return {
      data: result.rows.map(this.mapRowToGenre),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  private mapRowToGenre(row: any): Genre {
    return {
      id: row.id.toString(),
      name: row.name,
      category: row.category,
      seoKeywords: row.seo_keywords || [],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}