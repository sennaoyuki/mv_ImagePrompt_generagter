import { Router } from 'express';
import Joi from 'joi';
import { validateRequest, validateQuery, validateParams } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { ItemsController } from '../controllers/ItemsController';

const router = Router();
const itemsController = new ItemsController();

// Validation schemas
const generateItemsSchema = Joi.object({
  genres: Joi.array().items(Joi.string()).min(1).required(),
  region: Joi.string().optional(),
  seoOptimized: Joi.boolean().default(false),
  includeCompliance: Joi.boolean().default(false),
});

const getItemsSchema = Joi.object({
  type: Joi.string().valid('common', 'genre_specific', 'region_specific', 'compliance').optional(),
  genre: Joi.string().optional(),
  region: Joi.string().optional(),
  priority: Joi.string().valid('required', 'recommended', 'optional').optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
});

const itemIdSchema = Joi.object({
  id: Joi.string().required(),
});

// Routes
router.post(
  '/generate',
  validateRequest(generateItemsSchema),
  asyncHandler(itemsController.generateItems)
);

router.get(
  '/',
  validateQuery(getItemsSchema),
  asyncHandler(itemsController.getItems)
);

router.get(
  '/:id',
  validateParams(itemIdSchema),
  asyncHandler(itemsController.getItemById)
);

router.get(
  '/common',
  validateQuery(getItemsSchema),
  asyncHandler(itemsController.getCommonItems)
);

router.get(
  '/genre/:genreId',
  validateParams(Joi.object({ genreId: Joi.string().required() })),
  asyncHandler(itemsController.getGenreSpecificItems)
);

router.get(
  '/region/:regionId',
  validateParams(Joi.object({ regionId: Joi.string().required() })),
  asyncHandler(itemsController.getRegionSpecificItems)
);

router.get(
  '/compliance',
  validateQuery(getItemsSchema),
  asyncHandler(itemsController.getComplianceItems)
);

export default router;