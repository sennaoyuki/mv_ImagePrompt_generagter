import pool from '../config/database';
import { ContentTemplate, ItemType, TemplateType } from '../types';

export class ContentTemplatesModel {
  async findByItemId(itemId: string): Promise<ContentTemplate[]> {
    const query = `
      SELECT 
        id, item_id, item_type, template_type, content, 
        variables, created_at, updated_at
      FROM content_templates
      WHERE item_id = $1
    `;

    const result = await pool.query(query, [itemId]);
    return result.rows.map(this.mapRowToTemplate);
  }

  async findByFilters(filters: {
    itemType?: ItemType;
    templateType?: TemplateType;
  }): Promise<ContentTemplate[]> {
    let whereClause = '';
    const params: any[] = [];

    const conditions = [];
    if (filters.itemType) {
      conditions.push(`item_type = $${params.length + 1}`);
      params.push(filters.itemType);
    }
    if (filters.templateType) {
      conditions.push(`template_type = $${params.length + 1}`);
      params.push(filters.templateType);
    }

    if (conditions.length > 0) {
      whereClause = ` WHERE ${conditions.join(' AND ')}`;
    }

    const query = `
      SELECT 
        id, item_id, item_type, template_type, content, 
        variables, created_at, updated_at
      FROM content_templates
      ${whereClause}
      ORDER BY item_type, template_type
    `;

    const result = await pool.query(query, params);
    return result.rows.map(this.mapRowToTemplate);
  }

  private mapRowToTemplate(row: any): ContentTemplate {
    return {
      id: row.id.toString(),
      itemId: row.item_id.toString(),
      itemType: row.item_type,
      templateType: row.template_type,
      content: row.content,
      variables: row.variables || {},
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}