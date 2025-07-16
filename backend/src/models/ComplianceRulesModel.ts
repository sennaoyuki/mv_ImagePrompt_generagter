import pool from '../config/database';
import { ComplianceRule, Law } from '../types';

export class ComplianceRulesModel {
  async findById(id: string): Promise<ComplianceRule | null> {
    const query = `
      SELECT 
        id, law, description, required_items, prohibited_expressions, 
        required_disclosures, applicable_genres, created_at, updated_at
      FROM compliance_rules
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? this.mapRowToRule(result.rows[0]) : null;
  }

  async findByLaw(law: Law): Promise<ComplianceRule[]> {
    const query = `
      SELECT 
        id, law, description, required_items, prohibited_expressions, 
        required_disclosures, applicable_genres, created_at, updated_at
      FROM compliance_rules
      WHERE law = $1
    `;

    const result = await pool.query(query, [law]);
    return result.rows.map(this.mapRowToRule);
  }

  async findByGenreIds(genreIds: string[]): Promise<ComplianceRule[]> {
    if (genreIds.length === 0) return [];

    const placeholders = genreIds.map((_, index) => `$${index + 1}`).join(', ');
    const query = `
      SELECT 
        id, law, description, required_items, prohibited_expressions, 
        required_disclosures, applicable_genres, created_at, updated_at
      FROM compliance_rules
      WHERE applicable_genres && ARRAY[${placeholders}]::integer[]
    `;

    const result = await pool.query(query, genreIds);
    return result.rows.map(this.mapRowToRule);
  }

  private mapRowToRule(row: any): ComplianceRule {
    return {
      id: row.id.toString(),
      law: row.law,
      description: row.description,
      requiredItems: row.required_items || [],
      prohibitedExpressions: row.prohibited_expressions || [],
      requiredDisclosures: row.required_disclosures || [],
      applicableGenres: row.applicable_genres || [],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}