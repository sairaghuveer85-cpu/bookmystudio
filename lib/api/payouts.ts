import { apiClient } from './client';
import { SingleResponse } from './marketplace';

export type AccountHolderType = 'individual' | 'business';
export type BankAccountType = 'savings' | 'current';

export type PayoutStatus =
  | 'NOT_SET_UP'
  | 'DETAILS_INCOMPLETE'
  | 'DETAILS_SAVED'
  | 'AWAITING_PROVIDER_CONNECTION'
  | 'VERIFICATION_PENDING'
  | 'SUBMITTED_FOR_VERIFICATION'
  | 'VERIFICATION_REQUIRED'
  | 'VERIFIED_READY'
  | 'ACTION_REQUIRED'
  | 'UNAVAILABLE';

export interface PayoutSettingsData {
  hasPayoutSettings: boolean;
  accountHolderName?: string;
  accountHolderType?: AccountHolderType;
  accountType?: BankAccountType;
  accountNumberMasked?: string;
  accountNumberLast4?: string;
  ifsc?: string;
  bankName?: string | null;
  businessName?: string | null;
  businessType?: string | null;
  businessGstin?: string | null;
  status: PayoutStatus;
  statusMessage?: string | null;
  provider: 'razorpay';
  providerOnboardingConnected: boolean;
  providerAccountId?: string | null;
  providerOnboardingStatus?: string;
  missingRequirements?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SavePayoutSettingsPayload {
  accountHolderName: string;
  accountHolderType: AccountHolderType;
  accountType: BankAccountType;
  ifsc: string;
  bankName?: string | null;
  accountNumber?: string | null;
  confirmAccountNumber?: string | null;
  businessName?: string | null;
  businessType?: string | null;
  businessPan?: string | null;
  businessGstin?: string | null;
}

export interface PayoutStatusResponse {
  status: PayoutStatus;
  statusMessage?: string | null;
  providerOnboardingStatus?: string;
  providerOnboardingConnected: boolean;
  updatedAt?: string;
}

export interface OnboardingInitiateResponse {
  providerAccountId?: string;
  status?: string;
  providerOnboardingStatus?: string;
}

export const payoutApi = {
  /**
   * Retrieves the current user's safe payout settings and masked bank details.
   */
  getSettings: () => apiClient.get<SingleResponse<PayoutSettingsData>>('/payout-settings'),

  /**
   * Saves or updates bank details.
   */
  saveSettings: (payload: SavePayoutSettingsPayload) =>
    apiClient.put<SingleResponse<PayoutSettingsData>>('/payout-settings', payload),

  /**
   * Initiates Razorpay Route linked account onboarding.
   */
  initiateOnboarding: () =>
    apiClient.post<SingleResponse<OnboardingInitiateResponse>>('/payout-settings/onboarding'),

  /**
   * Refreshes and returns the latest verification status.
   */
  getStatus: () => apiClient.get<SingleResponse<PayoutStatusResponse>>('/payout-settings/status'),
};
