import pool from '../config/database';
import { Region, PaginationParams, PaginatedResponse } from '../types';

export class RegionsModel {
  async findById(id: string): Promise<Region | null> {
    const query = `
      SELECT id, name, prefecture, area_code, created_at, updated_at
      FROM regions
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? this.mapRowToRegion(result.rows[0]) : null;
  }

  async findByName(name: string): Promise<Region | null> {
    const query = `
      SELECT id, name, prefecture, area_code, created_at, updated_at
      FROM regions
      WHERE name = $1
    `;

    const result = await pool.query(query, [name]);
    return result.rows.length > 0 ? this.mapRowToRegion(result.rows[0]) : null;
  }

  async findWithPagination(
    filters: { prefecture?: string },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Region>> {
    const { prefecture } = filters;
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    let whereClause = '';
    const params: any[] = [];

    if (prefecture) {
      whereClause = ' WHERE prefecture = $1';
      params.push(prefecture);
    }

    // Count total items
    const countQuery = `SELECT COUNT(*) FROM regions${whereClause}`;
    const countResult = await pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated items
    const query = `
      SELECT id, name, prefecture, area_code, created_at, updated_at
      FROM regions
      ${whereClause}
      ORDER BY name
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    params.push(limit, offset);
    const result = await pool.query(query, params);

    return {
      data: result.rows.map(this.mapRowToRegion),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  private mapRowToRegion(row: any): Region {
    return {
      id: row.id.toString(),
      name: row.name,
      prefecture: row.prefecture,
      areaCode: row.area_code,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}