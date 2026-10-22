import crypto from 'crypto';
import { env } from '../config/env';

// Derive a 32-byte cryptographic key deterministically from the configured encryption secret or session secret
function getEncryptionKey(): Buffer {
  const secret = env.PAYOUT_ENCRYPTION_SECRET || env.SESSION_SECRET || 'bms_payout_vault_default_secret_32';
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * Encrypt sensitive payout string using AES-256-GCM authenticated encryption.
 */
export function encryptSensitiveData(plaintext: string): {
  encrypted: string;
  iv: string;
  tag: string;
} {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const tag = cipher.getAuthTag().toString('hex');

  return {
    encrypted,
    iv: iv.toString('hex'),
    tag,
  };
}

/**
 * Decrypt sensitive payout string using AES-256-GCM.
 */
export function decryptSensitiveData(encryptedHex: string, ivHex: string, tagHex: string): string {
  const key = getEncryptionKey();
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Formats a bank account number into a secure masked string.
 * Example: '000492819284' -> '••••••••9284'
 */
export function maskAccountNumber(accountNumber: string): string {
  if (!accountNumber) return '';
  const trimmed = accountNumber.trim();
  if (trimmed.length <= 4) {
    return `••••${trimmed}`;
  }
  const last4 = trimmed.slice(-4);
  return `••••••••${last4}`;
}

/**
 * Sanitizes an account number by removing all whitespace and hyphens while preserving leading zeros.
 */
export function sanitizeAccountNumber(accountNumber: string): string {
  if (!accountNumber) return '';
  return accountNumber.replace(/[\s-]/g, '').trim();
}

/**
 * Sanitizes and validates an Indian Financial System Code (IFSC).
 * Format: 4 alphabetic characters, followed by 0, followed by 6 alphanumeric characters.
 */
export function sanitizeIfsc(ifsc: string): string {
  if (!ifsc) return '';
  return ifsc.toUpperCase().replace(/\s/g, '').trim();
}

export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

