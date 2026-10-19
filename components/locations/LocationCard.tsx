'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, BookmarkIcon, ArrowRightIcon } from '@/components/ui/Icons';
import { FilmingLocation } from '@/lib/types';
import { useMarketplace } from '@/context/MarketplaceContext';

interface LocationCardProps {
  location: FilmingLocation;
}

export function LocationCard({ location }: LocationCardProps) {
  const { isBookmarked, toggleBookmark } = useMarketplace();
  const bookmarked = isBookmarked(location.id);

  return (
    <article className="group bento-card-interactive bg-white dark:bg-[#181818] rounded-2xl border border-slate-200/90 dark:border-[#303030] overflow-hidden hover:border-slate-300 dark:hover:border-[#454545] hover:shadow-xl dark:hover:shadow-[0_12px_36px_rgb(0,0,0,0.5)] flex flex-col h-full">
      
      {/* Location Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <Link href={`/locations/${location.slug}`} className="block w-full h-full">
          <Image
            src={location.imageUrl}
            alt={location.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        {/* Floating Category Badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-black/85 text-white backdrop-blur-xs border border-white/10">
            {location.categoryLabel}
          </span>
        </div>

        {/* Bookmark Action */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(location.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-150 active:scale-90 hover:scale-105 cursor-pointer ${
            bookmarked
              ? 'bg-white text-slate-900 shadow-sm'
              : 'bg-black/40 text-white hover:bg-white hover:text-slate-900'
          }`}
          aria-label={bookmarked ? `Remove ${location.name} from saved` : `Save ${location.name} to bookmarks`}
        >
          <BookmarkIcon filled={bookmarked} className="w-4 h-4 transition-transform" />
        </button>
      </div>

      {/* Details Container */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F5F5F5] line-clamp-1 group-hover:text-black dark:group-hover:text-white transition-colors">
              <Link href={`/locations/${location.slug}`} className="hover:underline">
                {location.name}
              </Link>
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-slate-900 dark:text-[#F5F5F5] font-semibold text-xs">
              <StarIcon className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{location.rating.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-[#8A8A8A] mt-0.5 truncate">
            {location.location}
          </p>

          {/* Specs Line */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-[#262626] flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-slate-600 dark:text-[#B3B3B3] font-medium">
            <span>{location.areaSqFt.toLocaleString()} sq ft</span>
            <span className="text-slate-300 dark:text-[#454545]">·</span>
            <span>{location.ceilingHeight}</span>
            <span className="text-slate-300 dark:text-[#454545]">·</span>
            <span className="text-slate-700 dark:text-emerald-400 font-semibold">{location.powerSupply}</span>
          </div>

          <p className="mt-1 text-[11px] text-slate-500 dark:text-[#8A8A8A] line-clamp-1 italic">
            {location.curfewRestrictions}
          </p>
        </div>

        {/* Pricing & Link */}
        <div className="pt-2 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-extrabold text-slate-900 dark:text-[#F5F5F5]">
                ${location.dayRate10h.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-[#8A8A8A] font-medium">/ 10h Day</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-[#8A8A8A] font-medium">
              ${location.hourlyRate} / hr
            </div>
          </div>

          <Link
            href={`/locations/${location.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545] bg-white dark:bg-[#202020] hover:bg-slate-50 dark:hover:bg-[#262626] text-slate-800 dark:text-[#F5F5F5] text-[11px] font-semibold transition-colors"
          >
            <span>View Location</span>
            <ArrowRightIcon className="w-3 h-3 text-slate-400 dark:text-[#8A8A8A] group-hover:text-slate-900 dark:group-hover:text-[#F5F5F5]" />
          </Link>
        </div>
      </div>

    </article>
  );
}
