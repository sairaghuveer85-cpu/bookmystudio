'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@/components/ui/Icons';
import { ProductionCrewMember } from '@/lib/types';
import { useMarketplace } from '@/context/MarketplaceContext';

interface CrewCardProps {
  member: ProductionCrewMember;
  isAdded?: boolean;
  onToggleAdd?: (member: ProductionCrewMember) => void;
}

export function CrewCard({
  member,
  isAdded: propIsAdded,
  onToggleAdd: propOnToggleAdd,
}: CrewCardProps) {
  const { isCrewSelected, toggleCrew } = useMarketplace();

  const added = propIsAdded !== undefined ? propIsAdded : isCrewSelected(member.id);
  const handleToggle = () => {
    if (propOnToggleAdd) {
      propOnToggleAdd(member);
    } else {
      toggleCrew(member);
    }
  };

  return (
    <article className="group bento-card-interactive bg-white dark:bg-[#181818] rounded-2xl border border-slate-200/90 dark:border-[#303030] overflow-hidden hover:border-slate-300 dark:hover:border-[#454545] hover:shadow-xl dark:hover:shadow-[0_12px_36px_rgb(0,0,0,0.5)] flex flex-col h-full">
      
      {/* Crew Portrait Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <Link href={`/crew/${member.slug}`} className="block w-full h-full">
          <Image
            src={member.imageUrl}
            alt={member.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        {/* Role Badge Top Left */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-black/85 text-white backdrop-blur-xs border border-white/10">
            {member.role}
          </span>
        </div>

        {/* Next Available Pill Bottom Right */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Next Available: {member.nextAvailable}</span>
          </span>
        </div>
      </div>

      {/* Crew Details Container */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F5F5F5] line-clamp-1 group-hover:text-black dark:group-hover:text-white transition-colors">
              <Link href={`/crew/${member.slug}`} className="hover:underline">
                {member.name}
              </Link>
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-slate-900 dark:text-[#F5F5F5] font-semibold text-xs">
              <StarIcon className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{member.rating.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-[#8A8A8A] mt-0.5 truncate">
            {member.credits}
          </p>

          {/* Working Gear Kit Specification */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-[#262626]">
            <p className="text-[11px] text-slate-600 dark:text-[#B3B3B3] leading-snug line-clamp-2">
              <span className="font-semibold text-slate-700 dark:text-[#F5F5F5]">Working Kit:</span>{' '}
              {member.workingKit.replace('Working Kit: ', '')}
            </p>
          </div>
        </div>

        {/* Rate & Add to Crew CTA */}
        <div className="pt-2 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between gap-2">
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-[#F5F5F5]">
              ${member.dayRate10h}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-[#8A8A8A] font-medium ml-1">/ 10h Day</span>
          </div>

          <button
            type="button"
            onClick={handleToggle}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              added
                ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-2xs'
                : 'border border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545] bg-white dark:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-50 dark:hover:bg-[#262626]'
            }`}
          >
            {added ? 'Added to Roster' : '+ Add to Call Sheet'}
          </button>
        </div>

      </div>

    </article>
  );
}
