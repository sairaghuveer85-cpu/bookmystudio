'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { CheckCircleIcon, ShieldPolicyIcon } from '@/components/ui/Icons';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, isConfigured, signOut } = useAuth();

  useEffect(() => {
    if (!isLoading && !user && isConfigured) {
      router.push('/login?next=/account');
    }
  }, [user, isLoading, isConfigured, router]);

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Producer';
  const email = user?.email || 'producer@bookmystudio.com';
  const isEmailVerified = Boolean(user?.email_confirmed_at);
  const accountId = user?.id ? `BMS-${user.id.slice(0, 8).toUpperCase()}` : 'BMS-8492041';
  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'November 2026';

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="py-8 bg-white dark:bg-[#101010] min-h-[calc(100vh-140px)] text-slate-900 dark:text-[#F5F5F5] transition-colors duration-150">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Production Dashboard', href: '/dashboard' },
            { label: 'Account Profile' },
          ]}
          className="mb-6"
        />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#8A8A8A]">
                PRODUCER DOSSIER
              </span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5]">
              Production Entity &amp; Profile
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-[#B3B3B3]">
              Manage your commercial production company identity, email verification, and stage insurance records.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/account/settings"
              className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-[#454545] hover:bg-slate-50 dark:hover:bg-[#202020] text-slate-700 dark:text-[#F5F5F5] text-xs font-semibold transition-colors"
            >
              Security Settings
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-3.5 py-2 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#181818] shadow-xs space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-xl">
              {fullName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">{fullName}</h2>
              <p className="text-xs text-slate-500 dark:text-[#8A8A8A]">{email}</p>
              <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-[#F5F5F5] px-2 py-0.5 rounded">
                  ID: {accountId}
                </span>
                {isEmailVerified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                    <CheckCircleIcon className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Email Verified</span>
                  </span>
                ) : (
                  <Link
                    href={`/verify-email?email=${encodeURIComponent(email)}`}
                    className="text-[10px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded hover:bg-amber-100 dark:hover:bg-amber-900/40"
                  >
                    Verify Email &rarr;
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="pt-6 border-t border-slate-100 dark:border-[#262626] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200/80 dark:border-[#303030]">
              <span className="block text-slate-500 dark:text-[#8A8A8A] font-medium">Account Tier</span>
              <span className="block text-sm font-bold text-slate-900 dark:text-[#F5F5F5] mt-1">
                Commercial Production Signatory
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-[#8A8A8A] mt-0.5">
                Eligible for instant automated COI generation up to $2,000,000.
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200/80 dark:border-[#303030]">
              <span className="block text-slate-500 dark:text-[#8A8A8A] font-medium">Registration Date</span>
              <span className="block text-sm font-bold text-slate-900 dark:text-[#F5F5F5] mt-1">
                {createdAt}
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-[#8A8A8A] mt-0.5">
                Verified member of BookMyStudio global production directory.
              </span>
            </div>
          </div>

          {/* Insurance Policy Endorsement Box */}
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300 space-y-2">
            <div className="font-bold flex items-center gap-2">
              <ShieldPolicyIcon className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Production Liability Endorsement Status: ACTIVE</span>
            </div>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-400/90 leading-relaxed">
              Your account is pre-approved for comprehensive commercial shoot liability coverage. When booking through the platform, Certificates of Insurance (COI) are dispatched directly to host stages naming them as Primary Additional Insured.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
