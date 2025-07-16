import { ContentTemplatesModel } from '../models/ContentTemplatesModel';
import { ContentExamplesModel } from '../models/ContentExamplesModel';
import { TemplateResponse, ItemType, TemplateType } from '../types';

export class TemplatesService {
  private contentTemplatesModel: ContentTemplatesModel;
  private contentExamplesModel: ContentExamplesModel;

  constructor() {
    this.contentTemplatesModel = new ContentTemplatesModel();
    this.contentExamplesModel = new ContentExamplesModel();
  }

  async getTemplatesByItemId(itemId: string): Promise<TemplateResponse> {
    const templates = await this.contentTemplatesModel.findByItemId(itemId);
    const examples = await this.contentExamplesModel.findByItemId(itemId);

    return {
      htmlTemplate: templates.find(t => t.templateType === 'html')?.content || '',
      cssTemplate: '', // Would be populated from a CSS template
      structuredData: {}, // Would be populated from structured data
      contentExamples: examples,
      seoGuidelines: [], // Would be populated from SEO guidelines
    };
  }

  async getTemplates(filters: {
    itemType?: ItemType;
    templateType?: TemplateType;
  }) {
    return this.contentTemplatesModel.findByFilters(filters);
  }

  async getContentExamples(itemId: string) {
    return this.contentExamplesModel.findByItemId(itemId);
  }
}