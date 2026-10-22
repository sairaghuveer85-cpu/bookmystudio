import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { z } from 'zod';

// Load .env file safely checking server/.env, cwd/.env, and parent directory
const candidates = [
  path.resolve(process.cwd(), 'server', '.env'),
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '..', '..', '.env'),
];

for (const envPath of candidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z
    .string()
    .default('mongodb://127.0.0.1:27017/bookmystudio'),
  CLIENT_ORIGIN: z.string().default('http://localhost:3000'),
  SESSION_SECRET: z.string().default('bms_dev_session_secret_32_characters_long_min_production'),
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.coerce.number().default(465),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().default('BookMyStudio <no-reply@bookmystudio.com>'),
  PAYOUT_ENCRYPTION_SECRET: z.string().optional(),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
  RAZORPAY_ROUTE_ENABLED: z
    .string()
    .transform((val) => val === 'true')
    .optional()
    .default('false'),
  GOOGLE_MAPS_SERVER_API_KEY: z.string().optional(),
  SMS_PROVIDER: z.enum(['mock', 'msg91', 'twilio']).default('mock'),
  SMS_API_KEY: z.string().optional(),
  SMS_SENDER_ID: z.string().optional(),
  SMS_TEMPLATE_ID: z.string().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_FROM_NUMBER: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables configuration:');
  console.error(JSON.stringify(parsed.error.format(), null, 2));
  process.exit(1);
}

export const env = parsed.data;

if (env.NODE_ENV === 'production' && env.SESSION_SECRET.includes('dev_session_secret')) {
  console.warn('⚠️ WARNING: Using default SESSION_SECRET in production. Set a random 32+ character string in your environment.');
}

