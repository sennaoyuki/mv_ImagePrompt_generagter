import { Router } from 'express';
import Joi from 'joi';
import { validateRequest, validateParams, validateQuery } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { CustomizationsController } from '../controllers/CustomizationsController';

const router = Router();
const customizationsController = new CustomizationsController();

// Validation schemas
const saveCustomizationSchema = Joi.object({
  userId: Joi.string().required(),
  projectName: Joi.string().required(),
  selectedGenres: Joi.array().items(Joi.string()).optional(),
  selectedRegions: Joi.array().items(Joi.string()).optional(),
  selectedItems: Joi.object().optional(),
  customItems: Joi.object().optional(),
  settings: Joi.object().optional(),
});

const getCustomizationsSchema = Joi.object({
  userId: Joi.string().required(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
});

const customizationIdSchema = Joi.object({
  id: Joi.string().required(),
});

// Routes
router.post(
  '/save',
  validateRequest(saveCustomizationSchema),
  asyncHandler(customizationsController.saveCustomization)
);

router.get(
  '/',
  validateQuery(getCustomizationsSchema),
  asyncHandler(customizationsController.getCustomizations)
);

router.get(
  '/:id',
  validateParams(customizationIdSchema),
  asyncHandler(customizationsController.getCustomizationById)
);

router.put(
  '/:id',
  validateParams(customizationIdSchema),
  validateRequest(saveCustomizationSchema),
  asyncHandler(customizationsController.updateCustomization)
);

router.delete(
  '/:id',
  validateParams(customizationIdSchema),
  asyncHandler(customizationsController.deleteCustomization)
);

export default router;