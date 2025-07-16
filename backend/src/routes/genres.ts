import { Router } from 'express';
import Joi from 'joi';
import { validateParams, validateQuery } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { GenresController } from '../controllers/GenresController';

const router = Router();
const genresController = new GenresController();

// Validation schemas
const getGenresSchema = Joi.object({
  category: Joi.string().valid('medical', 'beauty', 'fitness', 'general').optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
});

const genreIdSchema = Joi.object({
  id: Joi.string().required(),
});

// Routes
router.get(
  '/',
  validateQuery(getGenresSchema),
  asyncHandler(genresController.getGenres)
);

router.get(
  '/:id',
  validateParams(genreIdSchema),
  asyncHandler(genresController.getGenreById)
);

router.get(
  '/:id/items',
  validateParams(genreIdSchema),
  asyncHandler(genresController.getGenreItems)
);

export default router;