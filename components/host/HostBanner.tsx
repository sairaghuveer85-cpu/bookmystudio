'use client';

import React from 'react';
import { ScrollReveal } from '@/components/common/ScrollReveal';

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
    <section id="host" className="py-14 sm:py-16 bg-white dark:bg-[#101010] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal>
          {/* Architectural Charcoal Surface Container */}
          <div className="bg-[#141414] dark:bg-[#181818] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl border border-slate-800 dark:border-[#303030] relative overflow-hidden">
            
            {/* Ambient Background Glowing Blobs */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-blob" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-2000" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Pitch & Action CTAs */}
              <div className="lg:col-span-7 space-y-5">
                
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300 dark:text-[#B3B3B3]">
                    STUDIO HOST &amp; STAGE NETWORK
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  List Your Production Stage or Creative Loft — Earn up to $18,500/Month
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 dark:text-[#B3B3B3] leading-relaxed max-w-xl">
                  Monetize dark studio days between commercial wraps. We pre-screen production budgets, issue direct insurance certificates, and back your space with $2,000,000 host property protection.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenCalculator}
                    className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-[0.98] hover:scale-[1.02] cursor-pointer"
                  >
                    Calculate Studio Earnings
                  </button>

                  <button
                    type="button"
                    onClick={onOpenPolicyModal}
                    className="px-5 py-3 rounded-xl border border-slate-700 dark:border-[#454545] bg-[#222222] hover:bg-[#2c2c2c] text-white text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] hover:border-slate-500 cursor-pointer"
                  >
                    Host Protection Policy
                  </button>
                </div>

              </div>

              {/* Right Column: Earnings Breakdown Sub-Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#1c1c1c] dark:bg-[#202020] rounded-2xl border border-slate-700/80 dark:border-[#383838] p-5 sm:p-6 shadow-inner transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-slate-600">
                
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8A8A8A]">
                  ESTIMATED MONTHLY HOST PAYOUT
                </span>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    ${calculatedMonthlyPayout.toLocaleString()}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <span>✔</span>
                  <span>Based on {calculatedDays} booking days per month</span>
                </div>

                {/* Table Breakdown */}
                <div className="mt-4 pt-4 border-t border-slate-700/60 dark:border-[#333333] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300 dark:text-[#B3B3B3]">
                    <span>Average 10hr Day Rate</span>
                    <span className="font-bold text-white">${calculatedDayRate.toLocaleString()} / day</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300 dark:text-[#B3B3B3]">
                    <span>Grip &amp; Lighting Add-on</span>
                    <span className="font-bold text-white">+$2,000 / month</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300 dark:text-[#B3B3B3]">
                    <span>Automated Direct Payout</span>
                    <span className="font-bold text-emerald-400">Net 48hrs after wrap</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </ScrollReveal>

      </div>
    </section>
  );
}
