import pool from '../config/database';
import { ComplianceItem, Priority, PaginationParams, PaginatedResponse } from '../types';

export class ComplianceItemsModel {
  async findByGenreIds(genreIds: string[]): Promise<ComplianceItem[]> {
    if (genreIds.length === 0) return [];

    const placeholders = genreIds.map((_, index) => `$${index + 1}`).join(', ');
    const query = `
      SELECT 
        ci.id, ci.compliance_rule_id, ci.name, ci.description, 
        ci.priority, ci.content_guidelines, ci.created_at, ci.updated_at
      FROM compliance_items ci
      JOIN compliance_rules cr ON ci.compliance_rule_id = cr.id
      WHERE cr.applicable_genres && ARRAY[${placeholders}]::integer[]
      ORDER BY ci.priority DESC
    `;

    const result = await pool.query(query, genreIds);
    return result.rows.map(this.mapRowToItem);
  }

  async findById(id: string): Promise<ComplianceItem | null> {
    const query = `
      SELECT 
        id, compliance_rule_id, name, description, priority, 
        content_guidelines, created_at, updated_at
      FROM compliance_items
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? this.mapRowToItem(result.rows[0]) : null;
  }

  async findWithPagination(
    filters: { priority?: Priority },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<ComplianceItem>> {
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
    const countQuery = `SELECT COUNT(*) FROM compliance_items${whereClause}`;
    const countResult = await pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated items
    const query = `
      SELECT 
        id, compliance_rule_id, name, description, priority, 
        content_guidelines, created_at, updated_at
      FROM compliance_items
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

  private mapRowToItem(row: any): ComplianceItem {
    return {
      id: row.id.toString(),
      complianceRuleId: row.compliance_rule_id.toString(),
      name: row.name,
      description: row.description,
      priority: row.priority,
      seoWeight: 0, // Not stored in compliance_items table
      contentGuidelines: row.content_guidelines || {
        recommendedLength: 0,
        keywordSuggestions: [],
        avoidExpressions: [],
      },
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      type: 'compliance',
    };
  }
}