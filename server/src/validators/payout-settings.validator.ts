import { z } from 'zod';
import { sanitizeAccountNumber, sanitizeIfsc, IFSC_REGEX } from '../utils/crypto';

export const savePayoutSettingsSchema = z
  .object({
    accountHolderName: z
      .string({ required_error: 'Account holder name is required' })
      .trim()
      .min(2, 'Account holder name must be at least 2 characters')
      .max(120, 'Account holder name cannot exceed 120 characters'),

    accountHolderType: z
      .enum(['individual', 'business'], {
        invalid_type_error: 'Account holder type must be individual or business',
      })
      .default('individual'),

    accountType: z
      .enum(['savings', 'current'], {
        invalid_type_error: 'Account type must be savings or current',
      })
      .default('savings'),

    ifsc: z
      .string({ required_error: 'IFSC code is required' })
      .transform(sanitizeIfsc)
      .refine((val) => IFSC_REGEX.test(val), {
        message: 'Invalid IFSC code format. Must be 11 characters (e.g., HDFC0000123)',
      }),

    bankName: z.string().trim().max(100).optional().nullable(),

    accountNumber: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (val ? sanitizeAccountNumber(val) : val))
      .refine((val) => !val || /^[0-9]{9,18}$/.test(val), {
        message: 'Account number must contain between 9 and 18 numeric digits',
      }),

    confirmAccountNumber: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (val ? sanitizeAccountNumber(val) : val)),

    businessName: z.string().trim().max(120).optional().nullable(),
    businessType: z.string().trim().max(60).optional().nullable(),

    businessPan: z
      .string()
      .trim()
      .toUpperCase()
      .optional()
      .nullable()
      .refine((val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val), {
        message: 'Invalid Indian PAN format (e.g. ABCDE1234F)',
      }),

    businessGstin: z
      .string()
      .trim()
      .toUpperCase()
      .optional()
      .nullable()
      .refine(
        (val) => !val || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val),
        {
          message: 'Invalid Indian GSTIN format',
        }
      ),
  })
  .superRefine((data, ctx) => {
    // If accountNumber is provided, confirmAccountNumber must match exactly
    if (data.accountNumber) {
      if (!data.confirmAccountNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please confirm your bank account number',
          path: ['confirmAccountNumber'],
        });
      } else if (data.accountNumber !== data.confirmAccountNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Bank account numbers do not match',
          path: ['confirmAccountNumber'],
        });
      }
    }

    // Business name validation for business accounts
    if (data.accountHolderType === 'business' && (!data.businessName || data.businessName.length < 2)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Legal business name is required for business accounts',
        path: ['businessName'],
      });
    }
  });

export type SavePayoutSettingsInput = z.infer<typeof savePayoutSettingsSchema>;

