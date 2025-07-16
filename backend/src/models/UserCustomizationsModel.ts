import pool from '../config/database';
import { UserCustomization, SaveCustomizationRequest, PaginationParams, PaginatedResponse } from '../types';

export class UserCustomizationsModel {
  async create(request: SaveCustomizationRequest): Promise<UserCustomization> {
    const query = `
      INSERT INTO user_customizations (
        user_id, project_name, selected_genres, selected_regions, 
        selected_items, custom_items, settings
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, user_id, project_name, selected_genres, selected_regions, 
               selected_items, custom_items, settings, created_at, updated_at
    `;

    const values = [
      request.userId,
      request.projectName,
      request.selectedGenres || [],
      request.selectedRegions || [],
      JSON.stringify(request.selectedItems || {}),
      JSON.stringify(request.customItems || {}),
      JSON.stringify(request.settings || {}),
    ];

    const result = await pool.query(query, values);
    return this.mapRowToCustomization(result.rows[0]);
  }

  async findByUserId(
    userId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<UserCustomization>> {
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    // Count total items
    const countQuery = `SELECT COUNT(*) FROM user_customizations WHERE user_id = $1`;
    const countResult = await pool.query(countQuery, [userId]);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated items
    const query = `
      SELECT 
        id, user_id, project_name, selected_genres, selected_regions, 
        selected_items, custom_items, settings, created_at, updated_at
      FROM user_customizations
      WHERE user_id = $1
      ORDER BY updated_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(query, [userId, limit, offset]);

    return {
      data: result.rows.map(this.mapRowToCustomization),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<UserCustomization | null> {
    const query = `
      SELECT 
        id, user_id, project_name, selected_genres, selected_regions, 
        selected_items, custom_items, settings, created_at, updated_at
      FROM user_customizations
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? this.mapRowToCustomization(result.rows[0]) : null;
  }

  async update(id: string, request: SaveCustomizationRequest): Promise<UserCustomization | null> {
    const query = `
      UPDATE user_customizations
      SET 
        project_name = $2,
        selected_genres = $3,
        selected_regions = $4,
        selected_items = $5,
        custom_items = $6,
        settings = $7
      WHERE id = $1
      RETURNING id, user_id, project_name, selected_genres, selected_regions, 
               selected_items, custom_items, settings, created_at, updated_at
    `;

    const values = [
      id,
      request.projectName,
      request.selectedGenres || [],
      request.selectedRegions || [],
      JSON.stringify(request.selectedItems || {}),
      JSON.stringify(request.customItems || {}),
      JSON.stringify(request.settings || {}),
    ];

    const result = await pool.query(query, values);
    return result.rows.length > 0 ? this.mapRowToCustomization(result.rows[0]) : null;
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM user_customizations WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }

  private mapRowToCustomization(row: any): UserCustomization {
    return {
      id: row.id.toString(),
      userId: row.user_id,
      projectName: row.project_name,
      selectedGenres: row.selected_genres || [],
      selectedRegions: row.selected_regions || [],
      selectedItems: row.selected_items || {},
      customItems: row.custom_items || {},
      settings: row.settings || {},
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}