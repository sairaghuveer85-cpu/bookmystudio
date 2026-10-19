'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, BookmarkIcon, ArrowRightIcon } from '@/components/ui/Icons';
import { EquipmentItem } from '@/lib/types';
import { useMarketplace } from '@/context/MarketplaceContext';

interface EquipmentCardProps {
  equipment: EquipmentItem;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  const { isBookmarked, toggleBookmark } = useMarketplace();
  const bookmarked = isBookmarked(equipment.id);

  return (
    <article className="group bento-card-interactive bg-white dark:bg-[#181818] rounded-2xl border border-slate-200/90 dark:border-[#303030] overflow-hidden hover:border-slate-300 dark:hover:border-[#454545] hover:shadow-xl dark:hover:shadow-[0_12px_36px_rgb(0,0,0,0.5)] flex flex-col h-full">
      
      {/* Equipment Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <Link href={`/equipment/${equipment.slug}`} className="block w-full h-full">
          <Image
            src={equipment.imageUrl}
            alt={equipment.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        {/* Floating Brand Badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-black/85 text-white backdrop-blur-xs border border-white/10">
            {equipment.brand}
          </span>
        </div>

        {/* Bookmark Action */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(equipment.id);
          }}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-150 active:scale-80 hover:scale-105 cursor-pointer ${
            bookmarked
              ? 'bg-white text-slate-900 shadow-sm'
              : 'bg-black/40 text-white hover:bg-white hover:text-slate-900'
          }`}
          aria-label={bookmarked ? `Remove ${equipment.name} from saved` : `Save ${equipment.name} to bookmarks`}
        >
          <BookmarkIcon filled={bookmarked} className="w-3.5 h-3.5 transition-transform" />
        </button>
      </div>

      {/* Details Container */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F5F5F5] line-clamp-1 group-hover:text-black dark:group-hover:text-white transition-colors">
              <Link href={`/equipment/${equipment.slug}`} className="hover:underline">
                {equipment.name}
              </Link>
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-slate-900 dark:text-[#F5F5F5] font-semibold text-xs">
              <StarIcon className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{equipment.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-[#8A8A8A] mt-0.5 truncate">
            {equipment.categoryLabel}
          </p>

          {/* Specs Snippet */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-[#262626]">
            <p className="text-[11px] text-slate-600 dark:text-[#B3B3B3] line-clamp-2 leading-relaxed">
              {equipment.keySpecs[0]}
            </p>
          </div>
        </div>

        {/* Pricing & Link */}
        <div className="pt-2 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-extrabold text-slate-900 dark:text-[#F5F5F5]">
                ${equipment.dayRate}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-[#8A8A8A] font-medium">/ Day</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-[#8A8A8A] font-medium">
              ${equipment.weeklyRate} / Week (3-day rate)
            </div>
          </div>

          <Link
            href={`/equipment/${equipment.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545] bg-white dark:bg-[#202020] hover:bg-slate-50 dark:hover:bg-[#262626] text-slate-800 dark:text-[#F5F5F5] text-[11px] font-semibold transition-all active:scale-[0.98] hover:-translate-y-0.5 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span>View Kit</span>
            <ArrowRightIcon className="w-3 h-3 text-slate-400 dark:text-[#8A8A8A] group-hover:text-slate-900 dark:group-hover:text-[#F5F5F5] transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

    </article>
  );
}
