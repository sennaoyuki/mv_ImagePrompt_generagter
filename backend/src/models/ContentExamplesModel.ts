import pool from '../config/database';
import { ContentExample } from '../types';

export class ContentExamplesModel {
  async findByItemId(itemId: string): Promise<ContentExample[]> {
    const query = `
      SELECT 
        ce.id, ce.template_id, ce.title, ce.content, 
        ce.recommended_length, ce.keyword_suggestions, 
        ce.created_at, ce.updated_at
      FROM content_examples ce
      JOIN content_templates ct ON ce.template_id = ct.id
      WHERE ct.item_id = $1
    `;

    const result = await pool.query(query, [itemId]);
    return result.rows.map(this.mapRowToExample);
  }

  async findByTemplateId(templateId: string): Promise<ContentExample[]> {
    const query = `
      SELECT 
        id, template_id, title, content, recommended_length, 
        keyword_suggestions, created_at, updated_at
      FROM content_examples
      WHERE template_id = $1
    `;

    const result = await pool.query(query, [templateId]);
    return result.rows.map(this.mapRowToExample);
  }

  private mapRowToExample(row: any): ContentExample {
    return {
      id: row.id.toString(),
      templateId: row.template_id.toString(),
      title: row.title,
      content: row.content,
      recommendedLength: row.recommended_length,
      keywordSuggestions: row.keyword_suggestions || [],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}