'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LogoMark, ShieldPolicyIcon } from '@/components/ui/Icons';
import { PolicyModal } from '@/components/modals/PolicyModal';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export function Footer() {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-white dark:bg-[#101010] border-t border-slate-200 dark:border-[#303030] pt-16 pb-12 text-slate-600 dark:text-[#B3B3B3] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal>
            {/* Main 5-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-100 dark:border-[#202020]">
              
              {/* Brand & Manifesto Column (Span 2 on lg) */}
              <div className="lg:col-span-2 space-y-4">
                <Link href="/" className="inline-flex items-center gap-2.5 group">
                  <LogoMark className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-[#F5F5F5] uppercase">
                    BOOKMYSTUDIO
                  </span>
                </Link>

                <p className="text-xs text-slate-500 dark:text-[#8A8A8A] leading-relaxed max-w-sm">
                  The architectural production marketplace connecting directors, DPs, and commercial producers with certified cycloramas, soundstages, filming locations, and crew worldwide.
                </p>

                {/* Direct Liability Policy Included Badge */}
                <button
                  type="button"
                  onClick={() => setIsPolicyOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-400 text-[11px] font-semibold hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-left"
                >
                  <ShieldPolicyIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>$2,000,000 DIRECT PRODUCTION LIABILITY POLICY INCLUDED</span>
                </button>
              </div>

            {/* Column 2: Marketplace Discovery */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F5F5F5]">
                Discovery
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/studios" className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors">
                    Production Studios
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors">
                    Filming Locations
                  </Link>
                </li>
                <li>
                  <Link href="/crew" className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors">
                    Production Crew Roster
                  </Link>
                </li>
                <li>
                  <Link href="/equipment" className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors">
                    Equipment &amp; Grip Packages
                  </Link>
                </li>
                <li>
                  <Link href="/saved" className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors">
                    Saved Listings
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform & Host */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F5F5F5]">
                Platform &amp; Host
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/list-your-studio" className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors">
                    List Your Studio Space
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsPolicyOpen(true)}
                    className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors text-left cursor-pointer"
                  >
                    Host Guarantees &amp; COI
                  </button>
                </li>
                <li>
                  <Link href="/about" className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors">
                    About BookMyStudio
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors">
                    Production Support Desk
                  </Link>
                </li>
                <li>
                  <Link href="/crew-list" className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors">
                    Call Sheet Gear Crate
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Production Standards */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F5F5F5]">
                Standards
              </h4>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-[#8A8A8A]">
                <li>
                  <span className="text-slate-700 dark:text-[#B3B3B3] font-medium">Camlock 3-Phase Standards</span>
                </li>
                <li>
                  <span className="text-slate-700 dark:text-[#B3B3B3] font-medium">STC 60+ Acoustic Sync</span>
                </li>
                <li>
                  <span className="text-slate-700 dark:text-[#B3B3B3] font-medium">NYC MOFTB &amp; DOB Permits</span>
                </li>
                <li>
                  <span className="text-slate-700 dark:text-[#B3B3B3] font-medium">IATSE Local 52/600 Crew</span>
                </li>
                <li>
                  <span className="text-slate-700 dark:text-[#B3B3B3] font-medium">Union Equipment Inspection</span>
                </li>
              </ul>
            </div>

          </div>
          </ScrollReveal>

          {/* Bottom Legal & Attribution */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-[#8A8A8A]">
            <p>
              &copy; 2026 BookMyStudio Inc. All production rights reserved. Architectural, Grip &amp; Stage Marketplace.
            </p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setIsPolicyOpen(true)}
                className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors cursor-pointer"
              >
                Insurance Rules &amp; Endorsements
              </button>
              <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

        </div>
      </footer>

      <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
    </>
  );
}
