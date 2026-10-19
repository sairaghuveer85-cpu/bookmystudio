'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, BookmarkIcon, ArrowRightIcon } from '@/components/ui/Icons';
import { StudioSpace } from '@/lib/types';
import { useMarketplace } from '@/context/MarketplaceContext';

interface StudioCardProps {
  studio: StudioSpace;
  isBookmarked?: boolean;
  onToggleBookmark?: (studioId: string) => void;
  onCheckDates?: (studio: StudioSpace) => void;
}

export function StudioCard({
  studio,
  isBookmarked: propIsBookmarked,
  onToggleBookmark: propOnToggleBookmark,
  onCheckDates,
}: StudioCardProps) {
  const { isBookmarked: contextIsBookmarked, toggleBookmark: contextToggleBookmark } = useMarketplace();

  const isSaved = propIsBookmarked !== undefined ? propIsBookmarked : contextIsBookmarked(studio.id);
  const handleToggle = () => {
    if (propOnToggleBookmark) {
      propOnToggleBookmark(studio.id);
    } else {
      contextToggleBookmark(studio.id);
    }
  };

  return (
    <article className="group bento-card-interactive bg-white dark:bg-[#181818] rounded-2xl border border-slate-200/90 dark:border-[#303030] overflow-hidden hover:border-slate-300 dark:hover:border-[#454545] hover:shadow-xl dark:hover:shadow-[0_12px_36px_rgb(0,0,0,0.5)] flex flex-col h-full">
      
      {/* Studio Photography Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <Link href={`/studios/${studio.slug}`} className="block w-full h-full">
          <Image
            src={studio.imageUrl}
            alt={studio.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-black/85 text-white backdrop-blur-xs border border-white/10 shadow-xs">
              {studio.badgeTopLeft}
            </span>
            {studio.badgeTopSecondary && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-900/70 text-slate-200 backdrop-blur-xs">
                {studio.badgeTopSecondary}
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleToggle();
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 pointer-events-auto cursor-pointer ${
              isSaved
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-black/40 text-white hover:bg-white hover:text-slate-900'
            }`}
            aria-label={isSaved ? `Remove ${studio.name} from saved` : `Save ${studio.name} to bookmarks`}
          >
            <BookmarkIcon filled={isSaved} className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          </button>
        </div>
      </div>

      {/* Studio Details Container */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
        
        {/* Title, Rating & Location */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F5F5F5] line-clamp-1 group-hover:text-black dark:group-hover:text-white transition-colors">
              <Link href={`/studios/${studio.slug}`} className="hover:underline">
                {studio.name}
              </Link>
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-slate-900 dark:text-[#F5F5F5] font-semibold text-xs">
              <StarIcon className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{studio.rating.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-[#8A8A8A] mt-0.5 truncate">
            {studio.location}
          </p>

          {/* Technical Specs Line */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-[#262626] flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-slate-600 dark:text-[#B3B3B3] font-medium">
            <span>{studio.specs.sqFt.toLocaleString()} sq ft</span>
            <span className="text-slate-300 dark:text-[#454545]">·</span>
            <span>{studio.specs.gridHeight}</span>
            <span className="text-slate-300 dark:text-[#454545]">·</span>
            <span>{studio.specs.power}</span>
            <span className="text-slate-300 dark:text-[#454545]">·</span>
            <span className="text-slate-700 dark:text-emerald-400 font-semibold">{studio.specs.access}</span>
          </div>

          {/* Equipment Highlight Line */}
          <p className="mt-1 text-[11px] text-slate-500 dark:text-[#8A8A8A] line-clamp-1 italic">
            {studio.equipmentHighlight}
          </p>
        </div>

        {/* Pricing & Check Dates / View Action */}
        <div className="pt-2 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-extrabold text-slate-900 dark:text-[#F5F5F5]">
                ${studio.hourlyRate}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-[#8A8A8A] font-medium">/ hr</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-[#8A8A8A] font-medium">
              ${studio.dayRate10h.toLocaleString()} / 10h Day
            </div>
          </div>

          {onCheckDates ? (
            <button
              type="button"
              onClick={() => onCheckDates(studio)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545] bg-white dark:bg-[#202020] hover:bg-slate-50 dark:hover:bg-[#262626] text-slate-800 dark:text-[#F5F5F5] text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <span>Check Dates</span>
              <ArrowRightIcon className="w-3 h-3 text-slate-400 dark:text-[#8A8A8A] group-hover:text-slate-900 dark:group-hover:text-[#F5F5F5]" />
            </button>
          ) : (
            <Link
              href={`/studios/${studio.slug}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545] bg-white dark:bg-[#202020] hover:bg-slate-50 dark:hover:bg-[#262626] text-slate-800 dark:text-[#F5F5F5] text-[11px] font-semibold transition-colors"
            >
              <span>View Stage</span>
              <ArrowRightIcon className="w-3 h-3 text-slate-400 dark:text-[#8A8A8A] group-hover:text-slate-900 dark:group-hover:text-[#F5F5F5]" />
            </Link>
          )}
        </div>

      </div>

    </article>
  );
}
