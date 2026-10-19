'use client';

import React from 'react';
import Link from 'next/link';
import {
  CycloramaCategoryIcon,
  SunDaylightIcon,
  SoundstageIcon,
  WarehouseIcon,
  GearCrateIcon,
  CamlockPowerIcon,
  ArrowRightIcon,
} from '@/components/ui/Icons';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export function MarketplaceDiscoveryCards() {
  const categories = [
    {
      title: 'Photography Studios',
      description: 'Daylight lofts, high-CRI continuous rigs, and editorial spaces',
      href: '/studios',
      count: '76 Spaces',
      icon: <SunDaylightIcon className="w-5 h-5" />,
    },
    {
      title: 'Cyclorama Studios',
      description: '1 & 2-wall seamless infinity coves with drive-in roll-up doors',
      href: '/studios',
      count: '114 Stages',
      icon: <CycloramaCategoryIcon className="w-5 h-5" />,
    },
    {
      title: 'Soundstages',
      description: 'STC 60+ certified soundproof stages with heavy 3-phase power',
      href: '/studios',
      count: '48 Stages',
      icon: <SoundstageIcon className="w-5 h-5" />,
    },
    {
      title: 'Filming Locations',
      description: 'Architectural warehouses, industrial docks, and cast-iron lofts',
      href: '/locations',
      count: '54 Locations',
      icon: <WarehouseIcon className="w-5 h-5" />,
    },
    {
      title: 'Production Crew',
      description: 'Insured IATSE Local 52/600 department heads and camera crews',
      href: '/crew',
      count: '90+ Crew',
      icon: <GearCrateIcon className="w-5 h-5" />,
    },
    {
      title: 'Equipment & Grip',
      description: 'Arri Alexa 35, Aputure Electro Storm, sound packages, and dollies',
      href: '/equipment',
      count: '120+ Kits',
      icon: <CamlockPowerIcon className="w-5 h-5" />,
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-slate-50/70 dark:bg-[#141414] border-b border-slate-100 dark:border-[#202020] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#8A8A8A]">
                  MARKETPLACE DIRECTORY
                </span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5]">
                Browse Production Spaces &amp; Services
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-[#B3B3B3]">
                Discover certified stages, raw locations, vetted heads of department, and cinema packages.
              </p>
            </div>

            <Link
              href="/search"
              className="text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] hover:text-slate-950 dark:hover:text-[#F5F5F5] flex items-center gap-1 shrink-0 transition-colors group cursor-pointer"
            >
              <span>Search All Marketplace Assets</span>
              <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        {/* 6-Card Category Grid with Staggered Scroll Reveals & Bento Interactive Hovers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((cat, index) => (
            <ScrollReveal key={cat.title} delay={index * 60}>
              <Link
                href={cat.href}
                className="bento-card-interactive p-5 rounded-2xl border border-slate-200/90 dark:border-[#303030] bg-white dark:bg-[#181818] hover:border-slate-300 dark:hover:border-[#454545] hover:shadow-lg dark:hover:shadow-[0_12px_36px_rgb(0,0,0,0.45)] group flex flex-col justify-between h-full cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] flex items-center justify-center group-hover:bg-slate-900 dark:group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-105">
                      {cat.icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-[#8A8A8A] font-mono">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F5F5F5] group-hover:text-black dark:group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-[#8A8A8A] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] group-hover:text-slate-950 dark:group-hover:text-[#F5F5F5] transition-colors">
                  <span>Explore Category</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
