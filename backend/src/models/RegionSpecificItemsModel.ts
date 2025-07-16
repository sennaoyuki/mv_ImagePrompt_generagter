import pool from '../config/database';
import { RegionSpecificItem, Priority, PaginationParams, PaginatedResponse } from '../types';

export class RegionSpecificItemsModel {
  async findByRegionId(regionId: string): Promise<RegionSpecificItem[]> {
    const query = `
      SELECT 
        id, region_id, name, description, priority, created_at, updated_at
      FROM region_specific_items
      WHERE region_id = $1
      ORDER BY priority DESC
    `;

    const result = await pool.query(query, [regionId]);
    return result.rows.map(this.mapRowToItem);
  }

  async findById(id: string): Promise<RegionSpecificItem | null> {
    const query = `
      SELECT 
        id, region_id, name, description, priority, created_at, updated_at
      FROM region_specific_items
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? this.mapRowToItem(result.rows[0]) : null;
  }

  async findWithPagination(
    regionId: string,
    filters: { priority?: Priority },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<RegionSpecificItem>> {
    const { priority } = filters;
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    let whereClause = ' WHERE region_id = $1';
    const params: any[] = [regionId];

    if (priority) {
      whereClause += ' AND priority = $2';
      params.push(priority);
    }

    // Count total items
    const countQuery = `SELECT COUNT(*) FROM region_specific_items${whereClause}`;
    const countResult = await pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated items
    const query = `
      SELECT 
        id, region_id, name, description, priority, created_at, updated_at
      FROM region_specific_items
      ${whereClause}
      ORDER BY priority DESC
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

  private mapRowToItem(row: any): RegionSpecificItem {
    return {
      id: row.id.toString(),
      regionId: row.region_id.toString(),
      name: row.name,
      description: row.description,
      priority: row.priority,
      seoWeight: 0, // Not stored in region_specific_items table
      contentGuidelines: {
        recommendedLength: 0,
        keywordSuggestions: [],
        avoidExpressions: [],
      },
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      type: 'region_specific',
    };
  }
}