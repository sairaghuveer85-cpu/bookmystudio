'use client';

import React from 'react';
import Link from 'next/link';
import { SearchIcon, ArchetypeIcon, CheckCircleIcon } from '@/components/ui/Icons';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Discover Spaces & Services',
      description:
        'Browse vetted cycloramas, soundstages, filming locations, union department heads, and cinema packages with transparent power and dimension specs.',
      icon: <SearchIcon className="w-5 h-5 text-slate-800 dark:text-[#F5F5F5]" />,
    },
    {
      number: '02',
      title: 'Compare Technical Specifications',
      description:
        'Evaluate 3-phase Camlock amperage, STC acoustic ratings, drive-in roll-up door clearances, ceiling grid heights, and standard day rates.',
      icon: <ArchetypeIcon className="w-5 h-5 text-slate-800 dark:text-[#F5F5F5]" />,
    },
    {
      number: '03',
      title: 'Request a Hold & Direct COI',
      description:
        'Submit a shoot date inquiry or multi-day RFP. Our facility coordinators and stage managers confirm availability and coordinate automated insurance delivery.',
      icon: <CheckCircleIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#101010] border-b border-slate-100 dark:border-[#202020] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#8A8A8A]">
                COMMERCIAL BOOKING PROCESS
              </span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5]">
              How BookMyStudio Works
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-[#B3B3B3] leading-relaxed">
              From technical scouting to wrapped shoot days, our streamlined workflow removes friction for commercial productions.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Step Process Grid with Staggered Scroll Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 100}>
              <div
                className="bento-card-interactive p-6 rounded-2xl bg-slate-50/70 dark:bg-[#181818] border border-slate-200/80 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545] hover:shadow-lg dark:hover:shadow-[0_12px_36px_rgb(0,0,0,0.45)] space-y-4 relative h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#202020] border border-slate-200 dark:border-[#303030] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      {step.icon}
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-[#8A8A8A]">
                      STEP {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F5F5F5]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-[#B3B3B3] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Platform Disclaimer Note with Scroll Reveal */}
        <ScrollReveal delay={200}>
          <div className="mt-8 p-4 rounded-xl bg-slate-100/70 dark:bg-[#181818] border border-slate-200/60 dark:border-[#303030] text-[11px] text-slate-500 dark:text-[#8A8A8A] flex flex-col sm:flex-row sm:items-center justify-between gap-2 bento-card-interactive">
            <span>
              <strong className="text-slate-800 dark:text-[#F5F5F5]">Production Booking Transparency:</strong> Submitting a shoot date or hold request initiates facility coordination. Final reservation confirmation and load-in access passcodes are issued upon host schedule approval and COI verification.
            </span>
            <Link
              href="/terms"
              className="font-bold text-slate-800 dark:text-emerald-400 hover:underline whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              Read Booking Terms &rarr;
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
