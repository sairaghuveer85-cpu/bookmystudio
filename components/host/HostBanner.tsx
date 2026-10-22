'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldPolicyIcon } from '@/components/ui/Icons';

interface HostBannerProps {
  onOpenCalculator: () => void;
  onOpenPolicyModal: () => void;
  calculatedMonthlyPayout?: number;
  calculatedDays?: number;
  calculatedDayRate?: number;
}

export function HostBanner({
  onOpenCalculator,
  onOpenPolicyModal,
  calculatedMonthlyPayout = 14800,
  calculatedDays = 12,
  calculatedDayRate = 1400,
}: HostBannerProps) {
  return (
    <section id="host" className="py-14 sm:py-16 bg-white dark:bg-[#09090B] border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Architectural Obsidian Container */}
        <div className="bg-zinc-950 dark:bg-[#121216] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl border border-zinc-800 relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Pitch & Action CTAs */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  STUDIO HOST &amp; STAGE NETWORK
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                List Your Stage or Creative Loft — Monetize Dark Days
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                Fill gap dates between commercial wraps with verified film and photo shoots. We pre-screen production budgets, handle automated $2,000,000 direct insurance delivery, and pay out direct ACH deposits within 48 hours of wrap.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/list-your-studio"
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  List a Stage
                </Link>

                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs sm:text-sm font-bold transition-all border border-zinc-700 active:scale-95 cursor-pointer"
                >
                  Calculate Studio Earnings
                </button>

                <button
                  type="button"
                  onClick={onOpenPolicyModal}
                  className="px-4 py-3 rounded-xl text-zinc-400 hover:text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldPolicyIcon className="w-4 h-4 text-amber-400" />
                  <span>$2M Host Protection</span>
                </button>
              </div>

            </div>

            {/* Right Column: Earnings Breakdown Sub-Card */}
            <div className="lg:col-span-5">
              <div className="bg-zinc-900/90 rounded-2xl border border-zinc-800 p-5 sm:p-6 shadow-inner">
                
                <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  ESTIMATED MONTHLY HOST PAYOUT
                </span>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">
                    ${calculatedMonthlyPayout.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">/ month</span>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2.5 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Projected Shoot Days</span>
                    <span className="font-semibold text-white">{calculatedDays} days</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Average 10h Day Rate</span>
                    <span className="font-semibold text-white">${calculatedDayRate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Direct Insurance Endorsement</span>
                    <span className="font-semibold text-amber-400">Included ($0 host cost)</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Payment Processing Window</span>
                    <span className="font-semibold text-white">48h Direct ACH</span>
                  </div>
                </div>

                <p className="mt-4 text-[10px] text-zinc-500 leading-normal">
                  Estimates are illustrative based on commercial NYC/LA market rates. Actual payout depends on stage size, 3-phase camlock access, and calendar availability.
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
