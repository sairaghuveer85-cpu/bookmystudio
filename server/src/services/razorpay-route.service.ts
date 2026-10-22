import { env } from '../config/env';

export interface RazorpayRouteConfigStatus {
  configured: boolean;
  keyIdPresent: boolean;
  keySecretPresent: boolean;
  routeEnabled: boolean;
  isTestMode: boolean;
}

export interface CreateLinkedAccountInput {
  email: string;
  fullName: string;
  phone?: string | null;
  accountHolderType: 'individual' | 'business';
  legalBusinessName?: string | null;
  businessType?: string | null;
}

export interface RazorpayAccountResponse {
  id: string;
  type: string;
  status: string;
  email: string;
  profile?: Record<string, unknown>;
  notes?: Record<string, unknown>;
}

export class RazorpayRouteService {
  private keyId: string;
  private keySecret: string;
  private routeEnabled: boolean;

  constructor() {
    this.keyId = env.RAZORPAY_KEY_ID || '';
    this.keySecret = env.RAZORPAY_KEY_SECRET || '';
    this.routeEnabled = env.RAZORPAY_ROUTE_ENABLED || false;
  }

  /**
   * Returns whether Razorpay Route credentials and flags are active.
   */
  public isConfigured(): boolean {
    return Boolean(this.keyId && this.keySecret && this.routeEnabled);
  }

  /**
   * Diagnostics status without exposing raw credentials.
   */
  public getConfigStatus(): RazorpayRouteConfigStatus {
    const keyIdPresent = Boolean(this.keyId && this.keyId.trim().length > 0);
    const keySecretPresent = Boolean(this.keySecret && this.keySecret.trim().length > 0);
    const isTestMode = this.keyId.startsWith('rzp_test_');

    return {
      configured: this.isConfigured(),
      keyIdPresent,
      keySecretPresent,
      routeEnabled: this.routeEnabled,
      isTestMode,
    };
  }

  /**
   * Initiates linked account creation on Razorpay Route via the documented REST API.
   * Documentation: https://razorpay.com/docs/payments/route/linked-accounts/
   */
  public async createLinkedAccount(
    input: CreateLinkedAccountInput
  ): Promise<RazorpayAccountResponse> {
    if (!this.isConfigured()) {
      throw new Error(
        'Razorpay Route integration is not configured on this BookMyStudio instance. Platform Route activation required.'
      );
    }

    const authHeader = Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64');

    const payload = {
      email: input.email,
      phone: input.phone || undefined,
      type: 'standard',
      legal_business_name:
        input.accountHolderType === 'business' && input.legalBusinessName
          ? input.legalBusinessName
          : input.fullName,
      business_type:
        input.accountHolderType === 'business'
          ? input.businessType || 'private_limited'
          : 'individual',
      contact_name: input.fullName,
      profile: {
        category: 'services',
        subcategory: 'photography_studios',
        description: 'BookMyStudio Host / Production Vendor',
      },
      notes: {
        platform: 'BookMyStudio',
      },
    };

    try {
      const response = await fetch('https://api.razorpay.com/v1/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authHeader}`,
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as Record<string, unknown>;

      if (!response.ok) {
        const errorDetail =
          (data?.error as { description?: string; message?: string })?.description ||
          (data?.error as { description?: string; message?: string })?.message ||
          `Razorpay API rejected request with status ${response.status}`;
        throw new Error(`Razorpay Route error: ${errorDetail}`);
      }

      return data as unknown as RazorpayAccountResponse;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to communicate with Razorpay Route API';
      console.error('Razorpay Route account creation failed:', message);
      throw new Error(message);
    }
  }

  /**
   * Fetches latest verification status of a linked account from Razorpay.
   */
  public async fetchAccountStatus(accountId: string): Promise<Record<string, unknown> | null> {
    if (!this.isConfigured() || !accountId) {
      return null;
    }

    const authHeader = Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64');

    try {
      const response = await fetch(`https://api.razorpay.com/v1/accounts/${accountId}`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${authHeader}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      return (await response.json()) as Record<string, unknown>;
    } catch (err: unknown) {
      console.warn('Failed to fetch Razorpay account status:', err instanceof Error ? err.message : err);
      return null;
    }
  }
}

export const razorpayRouteService = new RazorpayRouteService();

