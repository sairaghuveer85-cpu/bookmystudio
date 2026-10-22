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
    <section id="categories" className="py-8 bg-[#0E0E12] border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Subheader & Breadcrumb */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-zinc-500 font-mono">
              STUDIO DIRECTORY
            </span>
            <span className="text-zinc-600">/</span>
            <span className="font-semibold text-zinc-200">
              Browse by Architecture &amp; Light Direction
            </span>
          </div>

          <Link
            href="/studios"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors group"
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
                    ? 'bg-[#18181E] border-amber-500 ring-1 ring-amber-500 shadow-sm'
                    : 'bg-[#121216] border-zinc-800 hover:border-zinc-700 hover:bg-[#18181E]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-zinc-950 font-bold'
                        : 'bg-zinc-850 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-amber-400'
                    }`}
                  >
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-500 font-mono">
                    {cat.count}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                    {cat.name}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5 leading-tight">
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

