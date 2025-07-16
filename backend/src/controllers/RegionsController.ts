import { Request, Response } from 'express';
import { RegionsService } from '../services/RegionsService';
import { createApiError } from '../middleware/errorHandler';
import { PaginationParams } from '../types';

export class RegionsController {
  private regionsService: RegionsService;

  constructor() {
    this.regionsService = new RegionsService();
  }

  getRegions = async (req: Request, res: Response): Promise<void> => {
    const { prefecture, page = 1, limit = 20 } = req.query as any;

    const paginationParams: PaginationParams = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    try {
      const result = await this.regionsService.getRegions(
        { prefecture },
        paginationParams
      );
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      throw createApiError('Failed to fetch regions', 500);
    }
  };

  getRegionById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const result = await this.regionsService.getRegionById(id);
      if (!result) {
        throw createApiError('Region not found', 404);
      }
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      throw error;
    }
  };

  getRegionItems = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const result = await this.regionsService.getRegionItems(id);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      throw createApiError('Failed to fetch region items', 500);
    }
  };
}