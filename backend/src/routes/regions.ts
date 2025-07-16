import { Router } from 'express';
import Joi from 'joi';
import { validateParams, validateQuery } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { RegionsController } from '../controllers/RegionsController';

const router = Router();
const regionsController = new RegionsController();

// Validation schemas
const getRegionsSchema = Joi.object({
  prefecture: Joi.string().optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
});

const regionIdSchema = Joi.object({
  id: Joi.string().required(),
});

// Routes
router.get(
  '/',
  validateQuery(getRegionsSchema),
  asyncHandler(regionsController.getRegions)
);

router.get(
  '/:id',
  validateParams(regionIdSchema),
  asyncHandler(regionsController.getRegionById)
);

router.get(
  '/:id/items',
  validateParams(regionIdSchema),
  asyncHandler(regionsController.getRegionItems)
);

export default router;