import { Request, Response } from 'express';
import { GenresService } from '../services/GenresService';
import { createApiError } from '../middleware/errorHandler';
import { PaginationParams } from '../types';

export class GenresController {
  private genresService: GenresService;

  constructor() {
    this.genresService = new GenresService();
  }

  getGenres = async (req: Request, res: Response): Promise<void> => {
    const { category, page = 1, limit = 20 } = req.query as any;

    const paginationParams: PaginationParams = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    try {
      const result = await this.genresService.getGenres(
        { category },
        paginationParams
      );
      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      throw createApiError('Failed to fetch genres', 500);
    }
  };

  getGenreById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const result = await this.genresService.getGenreById(id);
      if (!result) {
        throw createApiError('Genre not found', 404);
      }
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      throw error;
    }
  };

  getGenreItems = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const result = await this.genresService.getGenreItems(id);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      throw createApiError('Failed to fetch genre items', 500);
    }
  };
}