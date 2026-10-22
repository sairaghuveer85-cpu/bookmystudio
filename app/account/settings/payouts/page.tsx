'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SettingsNav } from '@/components/settings/SettingsNav';
import {
  CheckCircleIcon,
  AlertCircleIcon,
  ShieldPolicyIcon,
} from '@/components/ui/Icons';
import { useAuth } from '@/context/AuthContext';
import {
  payoutApi,
  PayoutSettingsData,
  SavePayoutSettingsPayload,
  AccountHolderType,
  BankAccountType,
  PayoutStatus,
} from '@/lib/api/payouts';

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export default function PayoutSettingsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isConfigured } = useAuth();

  // Settings & Status State
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [payoutData, setPayoutData] = useState<PayoutSettingsData | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingAccountNumber, setIsChangingAccountNumber] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountHolderType, setAccountHolderType] = useState<AccountHolderType>('individual');
  const [accountType, setAccountType] = useState<BankAccountType>('savings');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [bankName, setBankName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('private_limited');
  const [businessGstin, setBusinessGstin] = useState('');

  // Authentication check
  useEffect(() => {
    if (!authLoading && !user && isConfigured) {
      router.push('/login?next=/account/settings/payouts');
    }
  }, [user, authLoading, isConfigured, router]);

  // Load existing payout settings
  const fetchSettings = useCallback(async () => {
    try {
      const res = await payoutApi.getSettings();
      if (res?.success && res.data) {
        setPayoutData(res.data);
        if (res.data.hasPayoutSettings) {
          setAccountHolderName(res.data.accountHolderName || '');
          setAccountHolderType(res.data.accountHolderType || 'individual');
          setAccountType(res.data.accountType || 'savings');
          setIfsc(res.data.ifsc || '');
          setBankName(res.data.bankName || '');
          setBusinessName(res.data.businessName || '');
          setBusinessType(res.data.businessType || 'private_limited');
          setBusinessGstin(res.data.businessGstin || '');
          setIsEditing(false);
        } else {
          // Pre-populate legal name from authenticated user profile
          const defaultName =
            user?.fullName || user?.user_metadata?.full_name || '';
          setAccountHolderName(defaultName);
          setIsEditing(true);
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to load payout settings.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    let isSubscribed = true;

    if (!user) {
      return;
    }

    payoutApi
      .getSettings()
      .then((res) => {
        if (!isSubscribed) return;
        if (res?.success && res.data) {
          setPayoutData(res.data);
          if (res.data.hasPayoutSettings) {
            setAccountHolderName(res.data.accountHolderName || '');
            setAccountHolderType(res.data.accountHolderType || 'individual');
            setAccountType(res.data.accountType || 'savings');
            setIfsc(res.data.ifsc || '');
            setBankName(res.data.bankName || '');
            setBusinessName(res.data.businessName || '');
            setBusinessType(res.data.businessType || 'private_limited');
            setBusinessGstin(res.data.businessGstin || '');
            setIsEditing(false);
          } else {
            const defaultName =
              user?.fullName || user?.user_metadata?.full_name || '';
            setAccountHolderName(defaultName);
            setIsEditing(true);
          }
        }
      })
      .catch((err: unknown) => {
        if (!isSubscribed) return;
        const message =
          err instanceof Error ? err.message : 'Unable to load payout settings.';
        setErrorMsg(message);
      })
      .finally(() => {
        if (isSubscribed) {
          setLoading(false);
          setRefreshing(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [user]);

  const handleRefreshStatus = async () => {
    setRefreshing(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await payoutApi.getStatus();
      if (res?.success && res.data) {
        await fetchSettings();
        setSuccessMsg('Payout status updated from payment provider.');
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to refresh provider status.';
      setErrorMsg(message);
    } finally {
      setRefreshing(false);
    }
  };

  // Client-side form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!accountHolderName.trim()) {
      errors.accountHolderName = 'Account holder legal name is required.';
    }

    const cleanIfsc = ifsc.trim().toUpperCase();
    if (!cleanIfsc) {
      errors.ifsc = 'IFSC code is required.';
    } else if (!IFSC_REGEX.test(cleanIfsc)) {
      errors.ifsc =
        'Invalid IFSC format. Must be 11 characters (e.g. HDFC0001234).';
    }

    const needsAccountNumber =
      !payoutData?.hasPayoutSettings || isChangingAccountNumber;

    if (needsAccountNumber) {
      const cleanAcc = accountNumber.replace(/[\s-]/g, '').trim();
      const cleanConfirm = confirmAccountNumber.replace(/[\s-]/g, '').trim();

      if (!cleanAcc) {
        errors.accountNumber = 'Bank account number is required.';
      } else if (!/^[0-9]{9,18}$/.test(cleanAcc)) {
        errors.accountNumber = 'Account number must contain 9 to 18 digits.';
      }

      if (!cleanConfirm) {
        errors.confirmAccountNumber = 'Please confirm the account number.';
      } else if (cleanAcc !== cleanConfirm) {
        errors.confirmAccountNumber = 'Account numbers do not match.';
      }
    }

    if (accountHolderType === 'business' && !businessName.trim()) {
      errors.businessName = 'Legal business entity name is required.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!validateForm()) {
      return;
    }

    // If replacing an existing account number, prompt for confirmation
    if (payoutData?.hasPayoutSettings && isChangingAccountNumber) {
      setShowConfirmModal(true);
      return;
    }

    executeSave();
  };

  const executeSave = async () => {
    setShowConfirmModal(false);
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const payload: SavePayoutSettingsPayload = {
      accountHolderName: accountHolderName.trim(),
      accountHolderType,
      accountType,
      ifsc: ifsc.trim().toUpperCase(),
      bankName: bankName.trim() || null,
      businessName: accountHolderType === 'business' ? businessName.trim() : null,
      businessType: accountHolderType === 'business' ? businessType : null,
      businessGstin: businessGstin.trim() ? businessGstin.trim().toUpperCase() : null,
    };

    if (!payoutData?.hasPayoutSettings || isChangingAccountNumber) {
      payload.accountNumber = accountNumber.replace(/[\s-]/g, '').trim();
      payload.confirmAccountNumber = confirmAccountNumber.replace(/[\s-]/g, '').trim();
    }

    try {
      const res = await payoutApi.saveSettings(payload);
      if (res?.success && res.data) {
        setPayoutData(res.data);
        setIsEditing(false);
        setIsChangingAccountNumber(false);
        setAccountNumber('');
        setConfirmAccountNumber('');
        setSuccessMsg(
          'Bank details saved securely. Payout configuration updated.'
        );
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Failed to save payout settings.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsChangingAccountNumber(false);
    setAccountNumber('');
    setConfirmAccountNumber('');
    setFieldErrors({});
    if (payoutData) {
      setAccountHolderName(payoutData.accountHolderName || '');
      setAccountHolderType(payoutData.accountHolderType || 'individual');
      setAccountType(payoutData.accountType || 'savings');
      setIfsc(payoutData.ifsc || '');
      setBankName(payoutData.bankName || '');
      setBusinessName(payoutData.businessName || '');
      setBusinessType(payoutData.businessType || 'private_limited');
      setBusinessGstin(payoutData.businessGstin || '');
    }
  };

  // Status helper mapping
  const getStatusBadge = (status: PayoutStatus) => {
    switch (status) {
      case 'AWAITING_PROVIDER_CONNECTION':
        return {
          label: 'Awaiting Razorpay Route Connection',
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          dot: 'bg-amber-400',
        };
      case 'DETAILS_SAVED':
        return {
          label: 'Details Saved',
          color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          dot: 'bg-blue-400',
        };
      case 'VERIFICATION_PENDING':
        return {
          label: 'Verification Pending',
          color: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
          dot: 'bg-sky-400',
        };
      case 'VERIFIED_READY':
        return {
          label: 'Verified / Ready',
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          dot: 'bg-emerald-400',
        };
      case 'SUBMITTED_FOR_VERIFICATION':
        return {
          label: 'Submitted for Verification',
          color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          dot: 'bg-blue-400',
        };
      case 'DETAILS_INCOMPLETE':
        return {
          label: 'Details Incomplete',
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          dot: 'bg-amber-400',
        };
      case 'VERIFICATION_REQUIRED':
        return {
          label: 'Verification Required',
          color: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
          dot: 'bg-orange-400',
        };
      case 'ACTION_REQUIRED':
        return {
          label: 'Action Required',
          color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          dot: 'bg-rose-400',
        };
      case 'UNAVAILABLE':
        return {
          label: 'Unavailable',
          color: 'bg-zinc-700/40 text-zinc-400 border-zinc-600',
          dot: 'bg-zinc-500',
        };
      case 'NOT_SET_UP':
      default:
        return {
          label: 'Not Set Up',
          color: 'bg-zinc-800 text-zinc-400 border-zinc-700',
          dot: 'bg-zinc-500',
        };
    }
  };

  const statusConfig = getStatusBadge(payoutData?.status || 'NOT_SET_UP');

  return (
    <div className="py-8 bg-[#09090B] min-h-[calc(100vh-140px)] text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Production Dashboard', href: '/dashboard' },
            { label: 'Account Profile', href: '/account' },
            { label: 'Settings', href: '/account/settings' },
            { label: 'Payouts' },
          ]}
          className="mb-6"
        />

        {/* Page Header */}
        <div className="pb-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>Payout Settings</span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Razorpay Route
              </span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Manage your bank details and payment information to prepare to receive earnings from your BookMyStudio bookings.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefreshStatus}
            disabled={refreshing || loading}
            className="flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 self-start sm:self-auto"
          >
            <svg
              className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>{refreshing ? 'Checking Status...' : 'Check Status'}</span>
          </button>
        </div>

        {/* Settings Navigation Tabs */}
        <SettingsNav />

        {/* Notification Alerts */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs sm:text-sm flex items-center gap-3">
            <CheckCircleIcon className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-900 text-red-300 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircleIcon className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Status Panel Card */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#121216] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Current Disbursement Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusConfig.color}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                  {statusConfig.label}
                </span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-white">
                {payoutData?.statusMessage ||
                  'Connect your bank account to prepare to receive payments from your bookings.'}
              </p>
            </div>

            <div className="shrink-0 p-3 rounded-xl bg-[#18181E] border border-zinc-800 text-xs text-zinc-300">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-zinc-500">Provider:</span>
                <span className="text-amber-400 font-bold">Razorpay Route (India)</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] mt-1">
                <span className="text-zinc-500">Route Link:</span>
                <span
                  className={
                    payoutData?.providerOnboardingConnected
                      ? 'text-emerald-400 font-bold'
                      : 'text-zinc-400 font-medium'
                  }
                >
                  {payoutData?.providerOnboardingConnected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
            </div>
          </div>

          {/* Honest Provider Status Callout */}
          <div className="mt-6 pt-5 border-t border-zinc-800/80 flex items-start gap-3 text-xs text-zinc-400">
            <ShieldPolicyIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-zinc-200">Integration Notice:</strong> BookMyStudio uses Razorpay Route linked accounts for direct vendor booking disbursements. If the platform has not yet finalized live Route merchant onboarding, your bank details remain securely encrypted with AES-256-GCM. Payouts will disburse automatically once live Route activation is approved.
            </p>
          </div>
        </div>

        {/* View Mode: Saved Masked Details */}
        {payoutData?.hasPayoutSettings && !isEditing ? (
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#121216] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-base font-bold text-white">
                  Verified Bank Account Information
                </h2>
                <p className="text-xs text-zinc-400">
                  Earnings from approved studio and gear bookings are settled to this account.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 min-h-[40px] rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Edit Bank Details
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#18181E] border border-zinc-800 rounded-xl space-y-1">
                <span className="text-zinc-500 font-medium">Account Holder Legal Name</span>
                <div className="text-sm font-bold text-white">
                  {payoutData.accountHolderName}
                </div>
              </div>

              <div className="p-4 bg-[#18181E] border border-zinc-800 rounded-xl space-y-1">
                <span className="text-zinc-500 font-medium">Bank Account Number</span>
                <div className="text-sm font-mono font-bold text-amber-400 tracking-wider">
                  {payoutData.accountNumberMasked}
                </div>
              </div>

              <div className="p-4 bg-[#18181E] border border-zinc-800 rounded-xl space-y-1">
                <span className="text-zinc-500 font-medium">IFSC Code</span>
                <div className="text-sm font-mono font-bold text-white">
                  {payoutData.ifsc}
                </div>
              </div>

              <div className="p-4 bg-[#18181E] border border-zinc-800 rounded-xl space-y-1">
                <span className="text-zinc-500 font-medium">Account Type &amp; Entity</span>
                <div className="text-sm font-bold text-white capitalize">
                  {payoutData.accountType} Account ({payoutData.accountHolderType})
                </div>
              </div>

              {payoutData.bankName && (
                <div className="p-4 bg-[#18181E] border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-zinc-500 font-medium">Bank Name</span>
                  <div className="text-sm font-bold text-white">{payoutData.bankName}</div>
                </div>
              )}

              {payoutData.businessName && (
                <div className="p-4 bg-[#18181E] border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-zinc-500 font-medium">Legal Business Name</span>
                  <div className="text-sm font-bold text-white">{payoutData.businessName}</div>
                </div>
              )}

              {payoutData.businessGstin && (
                <div className="p-4 bg-[#18181E] border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-zinc-500 font-medium">GSTIN</span>
                  <div className="text-sm font-mono font-bold text-white">
                    {payoutData.businessGstin}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Edit / Setup Form */
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#121216]">
            <div className="mb-6 pb-4 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">
                  {payoutData?.hasPayoutSettings
                    ? 'Edit Bank Account Details'
                    : 'Set Up Payout Bank Account'}
                </h2>
                <p className="text-xs text-zinc-400">
                  Please provide your Indian bank account details to receive direct deposits.
                </p>
              </div>

              {payoutData?.hasPayoutSettings && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-3 py-1.5 min-h-[36px] rounded-xl border border-zinc-700 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Account Holder Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-200 mb-2">
                  Account Entity Type
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <button
                    type="button"
                    onClick={() => setAccountHolderType('individual')}
                    className={`py-2.5 px-4 min-h-[44px] rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      accountHolderType === 'individual'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                        : 'bg-[#18181E] border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Individual / Sole Operator
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountHolderType('business')}
                    className={`py-2.5 px-4 min-h-[44px] rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      accountHolderType === 'business'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                        : 'bg-[#18181E] border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Registered Business Entity
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Account Holder Name */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">
                    Account Holder Legal Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    placeholder="Full legal name as listed on bank passbook"
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-[#18181E] border border-zinc-800 rounded-xl text-base sm:text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                  {fieldErrors.accountHolderName && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.accountHolderName}</p>
                  )}
                </div>

                {/* Account Type */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">
                    Bank Account Type <span className="text-amber-500">*</span>
                  </label>
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value as BankAccountType)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-[#18181E] border border-zinc-800 rounded-xl text-base sm:text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
                  >
                    <option value="savings">Savings Account</option>
                    <option value="current">Current Account (Recommended for Studios)</option>
                  </select>
                </div>

                {/* Bank Account Number */}
                {payoutData?.hasPayoutSettings && !isChangingAccountNumber ? (
                  <div className="sm:col-span-2 p-4 rounded-xl bg-[#18181E] border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-zinc-400 block">Current Account Number:</span>
                      <span className="font-mono text-sm font-bold text-amber-400">
                        {payoutData.accountNumberMasked}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsChangingAccountNumber(true)}
                      className="px-3.5 py-2 min-h-[40px] rounded-xl border border-zinc-700 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      Change Account Number
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-200 mb-1">
                        Bank Account Number <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={accountNumber}
                        onChange={(e) =>
                          setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))
                        }
                        placeholder="e.g. 0001234567890"
                        className="w-full px-3.5 py-2.5 min-h-[44px] bg-[#18181E] border border-zinc-800 rounded-xl text-base sm:text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                      {fieldErrors.accountNumber && (
                        <p className="mt-1 text-xs text-red-400">{fieldErrors.accountNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-200 mb-1">
                        Confirm Bank Account Number <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={confirmAccountNumber}
                        onChange={(e) =>
                          setConfirmAccountNumber(e.target.value.replace(/[^0-9]/g, ''))
                        }
                        placeholder="Re-enter account number"
                        className="w-full px-3.5 py-2.5 min-h-[44px] bg-[#18181E] border border-zinc-800 rounded-xl text-base sm:text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                      {fieldErrors.confirmAccountNumber && (
                        <p className="mt-1 text-xs text-red-400">
                          {fieldErrors.confirmAccountNumber}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* IFSC Code */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">
                    IFSC Code <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={11}
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value.toUpperCase().trim())}
                    placeholder="e.g. HDFC0001234"
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-[#18181E] border border-zinc-800 rounded-xl text-base sm:text-xs text-white font-mono uppercase placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                  <p className="mt-1 text-[11px] text-zinc-500">
                    11-character Indian Financial System Code
                  </p>
                  {fieldErrors.ifsc && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.ifsc}</p>
                  )}
                </div>

                {/* Bank Name (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">
                    Bank Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g. HDFC Bank, ICICI Bank, SBI"
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-[#18181E] border border-zinc-800 rounded-xl text-base sm:text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                </div>

                {/* Business Specific Fields */}
                {accountHolderType === 'business' && (
                  <>
                    <div className="sm:col-span-2 pt-2 border-t border-zinc-800">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                        Business Entity Information
                      </h3>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-200 mb-1">
                        Legal Business Name <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        required={accountHolderType === 'business'}
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Apex Cinema Works Pvt Ltd"
                        className="w-full px-3.5 py-2.5 min-h-[44px] bg-[#18181E] border border-zinc-800 rounded-xl text-base sm:text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                      {fieldErrors.businessName && (
                        <p className="mt-1 text-xs text-red-400">{fieldErrors.businessName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-200 mb-1">
                        Business Type
                      </label>
                      <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] bg-[#18181E] border border-zinc-800 rounded-xl text-base sm:text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
                      >
                        <option value="private_limited">Private Limited Company</option>
                        <option value="llp">Limited Liability Partnership (LLP)</option>
                        <option value="proprietorship">Sole Proprietorship</option>
                        <option value="partnership">Partnership Firm</option>
                        <option value="public_limited">Public Limited Company</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-200 mb-1">
                        GSTIN (Optional)
                      </label>
                      <input
                        type="text"
                        maxLength={15}
                        value={businessGstin}
                        onChange={(e) => setBusinessGstin(e.target.value.toUpperCase().trim())}
                        placeholder="e.g. 36AABCB1234A1Z5"
                        className="w-full px-3.5 py-2.5 min-h-[44px] bg-[#18181E] border border-zinc-800 rounded-xl text-base sm:text-xs text-white font-mono uppercase placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3 flex-wrap">
                {payoutData?.hasPayoutSettings && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-5 py-2.5 min-h-[44px] rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting && (
                    <svg
                      className="w-4 h-4 animate-spin text-zinc-950"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  <span>{submitting ? 'Saving Bank Details...' : 'Save Bank Details'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Confirmation Modal when replacing existing account details */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-[#121216] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <AlertCircleIcon className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-white">
              Confirm Bank Account Replacement
            </h3>

            <p className="text-xs text-zinc-300 leading-relaxed">
              You are replacing your existing verified payout bank account with account number ending in{' '}
              <strong className="text-amber-400 font-mono">
                ••••{accountNumber.slice(-4)}
              </strong>
              . Future booking disbursements will be held until this account is verified.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 min-h-[40px] rounded-xl border border-zinc-700 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeSave}
                disabled={submitting}
                className="px-4 py-2 min-h-[40px] rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                Yes, Update Bank Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
