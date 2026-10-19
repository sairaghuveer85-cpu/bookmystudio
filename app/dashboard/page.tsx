'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import {
  CycloramaCategoryIcon,
  WarehouseIcon,
  GearCrateIcon,
  BookmarkIcon,
  ShieldPolicyIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@/components/ui/Icons';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, isConfigured, signOut } = useAuth();
  const { bookmarkedIds, selectedCrew } = useMarketplace();

  // Client-side authentication guard
  useEffect(() => {
    if (!isLoading && !user && isConfigured) {
      router.push('/login?next=/dashboard');
    }
  }, [user, isLoading, isConfigured, router]);

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Producer';
  const email = user?.email || 'producer@bookmystudio.com';
  const isEmailVerified = Boolean(user?.email_confirmed_at);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="py-8 bg-white dark:bg-[#101010] min-h-[calc(100vh-140px)] text-slate-900 dark:text-[#F5F5F5] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Production Dashboard' },
          ]}
          className="mb-6"
        />

        {/* Supabase Pending Setup Banner */}
        {!isConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold block text-amber-950 dark:text-amber-300">Supabase Auth Configuration Pending</span>
              <span className="text-[11px] text-amber-800 dark:text-amber-400">
                You are previewing the personalized dashboard. Connect your Supabase project keys in `.env.local` to manage live sessions.
              </span>
            </div>
            <Link
              href="/account/settings"
              className="px-3 py-1.5 rounded-lg bg-amber-900 text-white font-semibold text-xs whitespace-nowrap self-start sm:self-auto hover:bg-amber-800 transition-colors"
            >
              Account Settings
            </Link>
          </div>
        )}

        {/* Dashboard Header Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 dark:bg-[#181818] border border-transparent dark:border-[#303030] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                COMMERCIAL PRODUCER ACCOUNT
              </span>
              {isEmailVerified ? (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Identity</span>
                </span>
              ) : (
                <span className="text-[11px] text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  Email Verification Pending
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {fullName}
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Connected as <strong className="text-slate-200">{email}</strong>. Manage stage holds, shortlist production spaces, and assemble your union crew roster.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Link
              href="/studios"
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Search Studios
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2.5 border border-slate-700 dark:border-[#454545] bg-slate-800/80 dark:bg-[#202020] text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Production Studios */}
          <Link
            href="/studios"
            className="p-5 rounded-2xl border border-slate-200/90 dark:border-[#303030] bg-white dark:bg-[#181818] hover:border-slate-300 dark:hover:border-[#454545] hover:shadow-md dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] flex items-center justify-center mb-3 group-hover:bg-slate-900 dark:group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <CycloramaCategoryIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5] group-hover:text-black dark:group-hover:text-white transition-colors">
                Production Studios
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#8A8A8A] leading-relaxed">
                Discover seamless cycloramas, STC 60+ soundstages, and daylight lofts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] group-hover:text-slate-900 dark:group-hover:text-[#F5F5F5] transition-colors">
              <span>Browse 140+ Stages</span>
              <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Card 2: Filming Locations */}
          <Link
            href="/locations"
            className="p-5 rounded-2xl border border-slate-200/90 dark:border-[#303030] bg-white dark:bg-[#181818] hover:border-slate-300 dark:hover:border-[#454545] hover:shadow-md dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] flex items-center justify-center mb-3 group-hover:bg-slate-900 dark:group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <WarehouseIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5] group-hover:text-black dark:group-hover:text-white transition-colors">
                Filming Locations
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#8A8A8A] leading-relaxed">
                Explore architectural warehouses, Brooklyn docks, and cast-iron lofts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] group-hover:text-slate-900 dark:group-hover:text-[#F5F5F5] transition-colors">
              <span>Explore Locations</span>
              <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Card 3: Saved Shortlist */}
          <Link
            href="/saved"
            className="p-5 rounded-2xl border border-slate-200/90 dark:border-[#303030] bg-white dark:bg-[#181818] hover:border-slate-300 dark:hover:border-[#454545] hover:shadow-md dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] flex items-center justify-center mb-3 group-hover:bg-slate-900 dark:group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <BookmarkIcon className="w-5 h-5" filled={bookmarkedIds.length > 0} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5] group-hover:text-black dark:group-hover:text-white transition-colors">
                Saved Shortlist
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#8A8A8A] leading-relaxed">
                {bookmarkedIds.length === 0
                  ? 'No spaces or equipment bookmarked yet.'
                  : `${bookmarkedIds.length} shortlisted items ready for client deck.`}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] group-hover:text-slate-900 dark:group-hover:text-[#F5F5F5] transition-colors">
              <span>View Saved ({bookmarkedIds.length})</span>
              <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Card 4: Call Sheet Gear Crate */}
          <Link
            href="/crew-list"
            className="p-5 rounded-2xl border border-slate-200/90 dark:border-[#303030] bg-white dark:bg-[#181818] hover:border-slate-300 dark:hover:border-[#454545] hover:shadow-md dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] flex items-center justify-center mb-3 group-hover:bg-slate-900 dark:group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <GearCrateIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5] group-hover:text-black dark:group-hover:text-white transition-colors">
                Call Sheet Roster
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#8A8A8A] leading-relaxed">
                {selectedCrew.length === 0
                  ? 'No department heads added to call sheet.'
                  : `${selectedCrew.length} verified department heads selected.`}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] group-hover:text-slate-900 dark:group-hover:text-[#F5F5F5] transition-colors">
              <span>Manage Roster ({selectedCrew.length})</span>
              <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>

        {/* Section: Shoot Booking History */}
        <div className="mt-12">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#202020]">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
                Confirmed Shoot Bookings &amp; Stage Holds
              </h2>
              <p className="text-xs text-slate-500 dark:text-[#8A8A8A] mt-0.5">
                Real-time booking status, COI verification certificates, and door access passcodes.
              </p>
            </div>
            <Link
              href="/studios"
              className="text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] hover:text-slate-950 dark:hover:text-[#F5F5F5] flex items-center gap-1 transition-colors"
            >
              <span>+ New Booking Inquiry</span>
              <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>

          {/* Genuine Empty State */}
          <EmptyState
            title="No Active or Past Shoot Bookings Found"
            description="You do not have any confirmed commercial soundstage or filming location bookings on file. Submit an inquiry on any stage detail page to schedule your next production."
            actionLabel="Discover Available Studios"
            actionHref="/studios"
          />
        </div>

        {/* Production Trust & COI Banner */}
        <div className="mt-8 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldPolicyIcon className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold">
                $2,000,000 Direct Production Liability Endorsement Active
              </h4>
              <p className="text-[11px] sm:text-xs text-emerald-800 dark:text-emerald-400/90 mt-0.5">
                Every reservation confirmed on your account automatically includes primary Certificate of Insurance (COI) coverage naming the host stage as Additional Insured.
              </p>
            </div>
          </div>
          <Link
            href="/terms"
            className="text-xs font-bold text-emerald-900 dark:text-emerald-400 underline whitespace-nowrap self-start md:self-auto"
          >
            View Policy Terms
          </Link>
        </div>

      </div>
    </div>
  );
}
