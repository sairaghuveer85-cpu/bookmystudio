'use client';

import React, { useState } from 'react';
import {
  CamlockPowerIcon,
  GripIcon,
  TruckLoadingIcon,
  StageManagerIcon,
  ShieldPolicyIcon,
  CheckCircleIcon,
} from '@/components/ui/Icons';
import { FACILITY_COMPARISON_DATA } from '@/lib/data';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export function FacilityComparison() {
  const [mobileActiveTier, setMobileActiveTier] = useState<'dryHire' | 'turnkey'>('turnkey');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'power':
        return <CamlockPowerIcon className="w-4 h-4 text-slate-500 dark:text-emerald-400" />;
      case 'grip':
        return <GripIcon className="w-4 h-4 text-slate-500 dark:text-emerald-400" />;
      case 'truck':
        return <TruckLoadingIcon className="w-4 h-4 text-slate-500 dark:text-emerald-400" />;
      case 'manager':
        return <StageManagerIcon className="w-4 h-4 text-slate-500 dark:text-emerald-400" />;
      case 'shield':
        return <ShieldPolicyIcon className="w-4 h-4 text-slate-500 dark:text-emerald-400" />;
      default:
        return <CamlockPowerIcon className="w-4 h-4 text-slate-500 dark:text-emerald-400" />;
    }
  };

  return (
    <section id="comparison" className="py-14 sm:py-16 bg-slate-50/70 dark:bg-[#141414] border-b border-slate-200/80 dark:border-[#202020] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#8A8A8A]">
              FACILITY OPERATIONS
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5]">
              Self-Service Dry Hire <span className="text-slate-400 font-normal">vs.</span> Full Turnkey Production Stage
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-[#B3B3B3] leading-relaxed">
              Choose the operational tier that matches your production&apos;s scope. Every booking on BookMyStudio includes our automated $2,000,000 liability guarantee and verified stage load-in uniform.
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile Tier Switcher (< md) */}
        <div className="mt-6 md:hidden flex p-1 bg-white dark:bg-[#181818] rounded-xl border border-slate-200 dark:border-[#303030] shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileActiveTier('dryHire')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              mobileActiveTier === 'dryHire'
                ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5]'
            }`}
          >
            Standard Dry Hire Space
          </button>
          <button
            type="button"
            onClick={() => setMobileActiveTier('turnkey')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              mobileActiveTier === 'turnkey'
                ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5]'
            }`}
          >
            Turnkey Production Stage
          </button>
        </div>

        {/* Comparison Table / Matrix with Scroll Reveal */}
        <ScrollReveal delay={100}>
          <div className="mt-6 bg-white dark:bg-[#181818] rounded-2xl border border-slate-200/90 dark:border-[#303030] shadow-xs overflow-hidden bento-card-interactive">
            
            {/* Desktop Table Header (md+) */}
            <div className="hidden md:grid md:grid-cols-12 border-b border-slate-200 dark:border-[#303030] bg-white dark:bg-[#181818]">
              <div className="md:col-span-5 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
                FACILITY SPECIFICATION / SERVICE
              </div>
              <div className="md:col-span-3 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
                STANDARD DRY HIRE SPACE
              </div>
              <div className="md:col-span-4 px-4 py-2 flex items-center justify-center">
                <div className="w-full bg-slate-900 dark:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider text-center py-2.5 rounded-lg shadow-2xs">
                  TURNKEY PRODUCTION STAGE
                </div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-100 dark:divide-[#262626]">
              {FACILITY_COMPARISON_DATA.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 md:py-4.5 md:px-6 items-center hover:bg-slate-50/70 dark:hover:bg-[#202020]/70 transition-colors"
                >
                  {/* Specification Column */}
                  <div className="md:col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#262626] flex items-center justify-center shrink-0">
                      {getServiceIcon(row.iconName)}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-[#F5F5F5]">
                      {row.specification}
                    </span>
                  </div>

                  {/* Dry Hire Column */}
                  <div
                    className={`mt-2 md:mt-0 md:col-span-3 text-xs text-slate-500 dark:text-[#8A8A8A] md:block ${
                      mobileActiveTier === 'dryHire' ? 'block pl-11' : 'hidden'
                    }`}
                  >
                    <span className="md:hidden font-semibold text-slate-700 dark:text-[#B3B3B3] block mb-0.5">Dry Hire:</span>
                    {row.standardDryHire}
                  </div>

                  {/* Turnkey Stage Column */}
                  <div
                    className={`mt-2 md:mt-0 md:col-span-4 md:block ${
                      mobileActiveTier === 'turnkey' ? 'block pl-11' : 'hidden'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-[#F5F5F5]">
                      <CheckCircleIcon className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>{row.turnkeyStage}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
