import { Request, Response } from 'express';
import { CustomizationsService } from '../services/CustomizationsService';
import { createApiError } from '../middleware/errorHandler';
import { SaveCustomizationRequest, PaginationParams } from '../types';

export class CustomizationsController {
  private customizationsService: CustomizationsService;

  constructor() {
    this.customizationsService = new CustomizationsService();
  }

  saveCustomization = async (req: Request, res: Response): Promise<void> => {
    const saveRequest: SaveCustomizationRequest = req.body;

    try {
      const result = await this.customizationsService.saveCustomization(saveRequest);
      res.json({
        success: true,
        data: result,
        message: 'Customization saved successfully',
      });
    } catch (error) {
      throw createApiError('Failed to save customization', 500);
    }
  };

  getCustomizations = async (req: Request, res: Response): Promise<void> => {
    const { userId, page = 1, limit = 20 } = req.query as any;

    const paginationParams: PaginationParams = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    try {
      const result = await this.customizationsService.getCustomizations(
        userId,
        paginationParams
      );
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      throw createApiError('Failed to fetch customizations', 500);
    }
  };

  getCustomizationById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const result = await this.customizationsService.getCustomizationById(id);
      if (!result) {
        throw createApiError('Customization not found', 404);
      }
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      throw error;
    }
  };

  updateCustomization = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateRequest: SaveCustomizationRequest = req.body;

    try {
      const result = await this.customizationsService.updateCustomization(id, updateRequest);
      if (!result) {
        throw createApiError('Customization not found', 404);
      }
      res.json({
        success: true,
        data: result,
        message: 'Customization updated successfully',
      });
    } catch (error) {
      throw error;
    }
  };

  deleteCustomization = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const success = await this.customizationsService.deleteCustomization(id);
      if (!success) {
        throw createApiError('Customization not found', 404);
      }
      res.json({
        success: true,
        message: 'Customization deleted successfully',
      });
    } catch (error) {
      throw error;
    }
  };
}