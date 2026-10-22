import { Router } from 'express';
import {
  getPayoutSettings,
  savePayoutSettings,
  initiateProviderOnboarding,
  getPayoutStatus,
} from '../controllers/payout-settings.controller';
import { handlePayoutWebhook } from '../controllers/payout-webhook.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { savePayoutSettingsSchema } from '../validators/payout-settings.validator';

export const payoutSettingsRouter = Router();

// Webhook endpoint (verified via HMAC-SHA256 signature, not user session)
payoutSettingsRouter.post('/webhooks', handlePayoutWebhook);

// All user-facing payout routes require an authenticated user
payoutSettingsRouter.use(requireAuth);

// GET /api/payout-settings — Retrieve safe masked bank details & status
payoutSettingsRouter.get('/', getPayoutSettings);

// PUT /api/payout-settings — Save or update bank details
payoutSettingsRouter.put('/', validateBody(savePayoutSettingsSchema), savePayoutSettings);

// POST /api/payout-settings/onboarding — Initiate Razorpay Route linked account
payoutSettingsRouter.post('/onboarding', initiateProviderOnboarding);

// GET /api/payout-settings/status — Refresh and return latest verification status
payoutSettingsRouter.get('/status', getPayoutStatus);

