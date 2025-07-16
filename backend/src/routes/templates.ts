import { Router } from 'express';
import Joi from 'joi';
import { validateParams, validateQuery } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { TemplatesController } from '../controllers/TemplatesController';

const router = Router();
const templatesController = new TemplatesController();

// Validation schemas
const templateIdSchema = Joi.object({
  itemId: Joi.string().required(),
});

const getTemplatesSchema = Joi.object({
  itemType: Joi.string().valid('common', 'genre_specific', 'region_specific', 'compliance').optional(),
  templateType: Joi.string().valid('html', 'text', 'structured').optional(),
});

// Routes
router.get(
  '/:itemId',
  validateParams(templateIdSchema),
  asyncHandler(templatesController.getTemplatesByItemId)
);

router.get(
  '/',
  validateQuery(getTemplatesSchema),
  asyncHandler(templatesController.getTemplates)
);

router.get(
  '/:itemId/examples',
  validateParams(templateIdSchema),
  asyncHandler(templatesController.getContentExamples)
);

export default router;