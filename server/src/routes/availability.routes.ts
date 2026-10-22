import { Router } from 'express';
import {
  getAvailability,
  calculateQuote,
  addBlockedDate,
} from '../controllers/availability.controller';
import { requireAuth } from '../middleware/auth.middleware';

export const availabilityRouter = Router();

// Public: Get availability overview for a listing (by category and slug or ObjectId)
// Supports ?date=YYYY-MM-DD or ?month=YYYY-MM
availabilityRouter.get('/:category/:listingId', getAvailability);

// Public / Client: Recalculate authoritative price quote for a booking interval
availabilityRouter.post('/quote', calculateQuote);

// Authenticated Owner/Admin: Block out dates/time ranges for maintenance or private holds
availabilityRouter.post('/:category/:listingId/block', requireAuth, addBlockedDate);

