'use client';

import React from 'react';
import Link from 'next/link';
import {
  CycloramaCategoryIcon,
  SunDaylightIcon,
  SoundstageIcon,
  PodcastMicIcon,
  KitchenRangeIcon,
  WarehouseIcon,
  ArrowRightIcon,
} from '@/components/ui/Icons';
import { STUDIO_CATEGORIES } from '@/lib/data';
import { StudioCategory } from '@/lib/types';

interface CategoryDirectoryProps {
  selectedCategory?: StudioCategory | 'all';
  onSelectCategory?: (category: StudioCategory) => void;
}

export function CategoryDirectory({
  selectedCategory,
  onSelectCategory,
}: CategoryDirectoryProps) {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'cyclorama':
        return <CycloramaCategoryIcon className="w-5 h-5" />;
      case 'sun':
        return <SunDaylightIcon className="w-5 h-5" />;
      case 'soundstage':
        return <SoundstageIcon className="w-5 h-5" />;
      case 'mic':
        return <PodcastMicIcon className="w-5 h-5" />;
      case 'kitchen':
        return <KitchenRangeIcon className="w-5 h-5" />;
      case 'warehouse':
        return <WarehouseIcon className="w-5 h-5" />;
      default:
        return <CycloramaCategoryIcon className="w-5 h-5" />;
    }
  };

  return (
    <section id="categories" className="py-8 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Subheader & Breadcrumb */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-500">
              STUDIO DIRECTORY
            </span>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-800">
              Browse by Architecture &amp; Light Direction
            </span>
          </div>

          <Link
            href="/studios"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors group"
          >
            <span>View All 124 Spaces</span>
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Categories Row (Horizontal scroll on mobile, 6-col grid on desktop) */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {STUDIO_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.categoryKey;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory?.(cat.categoryKey)}
                className={`flex-1 min-w-[170px] sm:min-w-0 p-3.5 rounded-xl border text-left transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-white border-slate-900 shadow-sm ring-1 ring-slate-900'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200 group-hover:text-slate-900'
                    }`}
                  >
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    {cat.count}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-black">
                    {cat.name}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                    {cat.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

