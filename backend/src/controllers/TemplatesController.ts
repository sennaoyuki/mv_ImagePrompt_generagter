import { Request, Response } from 'express';
import { TemplatesService } from '../services/TemplatesService';
import { createApiError } from '../middleware/errorHandler';

export class TemplatesController {
  private templatesService: TemplatesService;

  constructor() {
    this.templatesService = new TemplatesService();
  }

  getTemplatesByItemId = async (req: Request, res: Response): Promise<void> => {
    const { itemId } = req.params;

    try {
      const result = await this.templatesService.getTemplatesByItemId(itemId);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      throw createApiError('Failed to fetch templates', 500);
    }
  };

  getTemplates = async (req: Request, res: Response): Promise<void> => {
    const { itemType, templateType } = req.query as any;

    try {
      const result = await this.templatesService.getTemplates({
        itemType,
        templateType,
      });
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      throw createApiError('Failed to fetch templates', 500);
    }
  };

  getContentExamples = async (req: Request, res: Response): Promise<void> => {
    const { itemId } = req.params;

    try {
      const result = await this.templatesService.getContentExamples(itemId);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      throw createApiError('Failed to fetch content examples', 500);
    }
  };
}