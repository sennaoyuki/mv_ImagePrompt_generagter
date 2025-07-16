import { Request, Response } from 'express';
import { ItemsService } from '../services/ItemsService';
import { createApiError } from '../middleware/errorHandler';
import { GenerateRequest, PaginationParams } from '../types';

export class ItemsController {
  private itemsService: ItemsService;

  constructor() {
    this.itemsService = new ItemsService();
  }

  generateItems = async (req: Request, res: Response): Promise<void> => {
    const generateRequest: GenerateRequest = req.body;
    
    try {
      const result = await this.itemsService.generateItems(generateRequest);
      res.json({
        success: true,
        data: result,
        message: 'Items generated successfully',
      });
    } catch (error) {
      throw createApiError('Failed to generate items', 500);
    }
  };

  getItems = async (req: Request, res: Response): Promise<void> => {
    const {
      type,
      genre,
      region,
      priority,
      page = 1,
      limit = 20,
    } = req.query as any;

    const paginationParams: PaginationParams = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    try {
      const result = await this.itemsService.getItems(
        { type, genre, region, priority },
        paginationParams
      );
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      throw createApiError('Failed to fetch items', 500);
    }
  };

  getItemById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const item = await this.itemsService.getItemById(id);
      if (!item) {
        throw createApiError('Item not found', 404);
      }
      res.json({
        success: true,
        data: item,
      });
    } catch (error) {
      throw error;
    }
  };

  getCommonItems = async (req: Request, res: Response): Promise<void> => {
    const {
      priority,
      page = 1,
      limit = 20,
    } = req.query as any;

    const paginationParams: PaginationParams = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    try {
      const result = await this.itemsService.getCommonItems(
        { priority },
        paginationParams
      );
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      throw createApiError('Failed to fetch common items', 500);
    }
  };

  getGenreSpecificItems = async (req: Request, res: Response): Promise<void> => {
    const { genreId } = req.params;
    const {
      priority,
      page = 1,
      limit = 20,
    } = req.query as any;

    const paginationParams: PaginationParams = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    try {
      const result = await this.itemsService.getGenreSpecificItems(
        genreId,
        { priority },
        paginationParams
      );
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      throw createApiError('Failed to fetch genre-specific items', 500);
    }
  };

  getRegionSpecificItems = async (req: Request, res: Response): Promise<void> => {
    const { regionId } = req.params;
    const {
      priority,
      page = 1,
      limit = 20,
    } = req.query as any;

    const paginationParams: PaginationParams = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    try {
      const result = await this.itemsService.getRegionSpecificItems(
        regionId,
        { priority },
        paginationParams
      );
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      throw createApiError('Failed to fetch region-specific items', 500);
    }
  };

  getComplianceItems = async (req: Request, res: Response): Promise<void> => {
    const {
      priority,
      page = 1,
      limit = 20,
    } = req.query as any;

    const paginationParams: PaginationParams = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    try {
      const result = await this.itemsService.getComplianceItems(
        { priority },
        paginationParams
      );
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      throw createApiError('Failed to fetch compliance items', 500);
    }
  };
}