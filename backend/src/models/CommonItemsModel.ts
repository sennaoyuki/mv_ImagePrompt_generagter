import pool from '../config/database';
import { CommonItem, Priority, PaginationParams, PaginatedResponse } from '../types';

export class CommonItemsModel {
  async findAll(options: { seoOptimized?: boolean } = {}): Promise<CommonItem[]> {
    const { seoOptimized = false } = options;
    
    let query = `
      SELECT 
        id,
        name,
        description,
        priority,
        seo_weight,
        content_guidelines,
        created_at,
        updated_at
      FROM common_items
    `;
    
    if (seoOptimized) {
      query += ' ORDER BY seo_weight DESC, priority DESC';
    } else {
      query += ' ORDER BY priority DESC, seo_weight DESC';
    }

    const result = await pool.query(query);
    return result.rows.map(this.mapRowToItem);
  }

  async findById(id: string): Promise<CommonItem | null> {
    const query = `
      SELECT 
        id,
        name,
        description,
        priority,
        seo_weight,
        content_guidelines,
        created_at,
        updated_at
      FROM common_items
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? this.mapRowToItem(result.rows[0]) : null;
  }

  async findByPriority(priority: Priority): Promise<CommonItem[]> {
    const query = `
      SELECT 
        id,
        name,
        description,
        priority,
        seo_weight,
        content_guidelines,
        created_at,
        updated_at
      FROM common_items
      WHERE priority = $1
      ORDER BY seo_weight DESC
    `;

    const result = await pool.query(query, [priority]);
    return result.rows.map(this.mapRowToItem);
  }

  async findWithPagination(
    filters: { priority?: Priority },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<CommonItem>> {
    const { priority } = filters;
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    let whereClause = '';
    const params: any[] = [];

    if (priority) {
      whereClause = ' WHERE priority = $1';
      params.push(priority);
    }

    // Count total items
    const countQuery = `SELECT COUNT(*) FROM common_items${whereClause}`;
    const countResult = await pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated items
    const query = `
      SELECT 
        id,
        name,
        description,
        priority,
        seo_weight,
        content_guidelines,
        created_at,
        updated_at
      FROM common_items
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

  async create(item: Omit<CommonItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<CommonItem> {
    const query = `
      INSERT INTO common_items (name, description, priority, seo_weight, content_guidelines)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, description, priority, seo_weight, content_guidelines, created_at, updated_at
    `;

    const values = [
      item.name,
      item.description,
      item.priority,
      item.seoWeight,
      JSON.stringify(item.contentGuidelines),
    ];

    const result = await pool.query(query, values);
    return this.mapRowToItem(result.rows[0]);
  }

  async update(id: string, item: Partial<CommonItem>): Promise<CommonItem | null> {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (item.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(item.name);
    }
    if (item.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(item.description);
    }
    if (item.priority !== undefined) {
      fields.push(`priority = $${paramIndex++}`);
      values.push(item.priority);
    }
    if (item.seoWeight !== undefined) {
      fields.push(`seo_weight = $${paramIndex++}`);
      values.push(item.seoWeight);
    }
    if (item.contentGuidelines !== undefined) {
      fields.push(`content_guidelines = $${paramIndex++}`);
      values.push(JSON.stringify(item.contentGuidelines));
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    const query = `
      UPDATE common_items 
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, name, description, priority, seo_weight, content_guidelines, created_at, updated_at
    `;

    values.push(id);
    const result = await pool.query(query, values);
    return result.rows.length > 0 ? this.mapRowToItem(result.rows[0]) : null;
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM common_items WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }

  private mapRowToItem(row: any): CommonItem {
    return {
      id: row.id.toString(),
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
      type: 'common',
    };
  }
}