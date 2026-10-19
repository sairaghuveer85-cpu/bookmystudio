'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ShieldPolicyIcon } from '@/components/ui/Icons';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export function FinalCta() {
  return (
    <section className="py-16 bg-white dark:bg-[#101010] border-t border-slate-100 dark:border-[#202020] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-slate-900 dark:bg-[#181818] border border-slate-800 dark:border-[#303030] text-white relative overflow-hidden shadow-xl">
            
            {/* Ambient Background Glowing Blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-blob" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-4000" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-emerald-950/40 text-emerald-400 text-xs font-semibold border border-white/15 dark:border-emerald-500/30">
                <ShieldPolicyIcon className="w-3.5 h-3.5 animate-pulse" />
                <span>Direct $2,000,000 Production Liability Endorsement</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to Plan Your Next Shoot?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 dark:text-[#B3B3B3] max-w-xl leading-relaxed">
                Join vetted commercial line producers, agency directors, and union cinematographers. Lock in verified cycloramas, soundstages, filming locations, and crew.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/studios"
                  className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-[0.98] hover:scale-[1.02] flex items-center gap-2 cursor-pointer group"
                >
                  <span>Explore Studios</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/create-account"
                  className="px-6 py-3 rounded-xl border border-slate-700 dark:border-[#454545] bg-slate-800/80 dark:bg-[#202020] hover:bg-slate-800 dark:hover:bg-[#262626] text-white text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] hover:border-slate-500 cursor-pointer"
                >
                  Create Account
                </Link>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
