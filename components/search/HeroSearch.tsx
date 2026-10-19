'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  LocationPinIcon,
  ArchetypeIcon,
  CalendarIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  ShieldPolicyIcon,
  StarIcon,
  CheckCircleIcon,
  ZapIcon,
} from '@/components/ui/Icons';
import { LOCATION_OPTIONS, STAGE_TYPE_OPTIONS, SHIFT_OPTIONS } from '@/lib/data';

interface HeroSearchProps {
  selectedLocation: string;
  onSelectLocation: (loc: string) => void;
  selectedStageType: string;
  onSelectStageType: (type: string) => void;
  selectedShift: { label: string; times: string };
  onSelectShift: (shift: { label: string; times: string }) => void;
  activeQuickFilters: string[];
  onToggleQuickFilter: (filterKey: string) => void;
  onFindStudios?: () => void;
}

export function HeroSearch({
  selectedLocation,
  onSelectLocation,
  selectedStageType,
  onSelectStageType,
  selectedShift,
  onSelectShift,
  activeQuickFilters,
  onToggleQuickFilter,
  onFindStudios,
}: HeroSearchProps) {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<'location' | 'stage' | 'date' | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Outside click and Escape key dismissal for search dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchClick = () => {
    if (onFindStudios) {
      onFindStudios();
      return;
    }
    const params = new URLSearchParams();
    if (selectedLocation) params.set('location', selectedLocation);
    if (selectedStageType) params.set('stageType', selectedStageType);
    if (activeQuickFilters.length > 0) params.set('filters', activeQuickFilters.join(','));
    router.push(`/search?${params.toString()}`);
  };

  const quickFilterOptions = [
    { key: 'camlockPower', label: '3-Phase Camlock (600A)' },
    { key: 'driveInAccess', label: 'Drive-in Vehicle Access' },
    { key: 'stc60Certified', label: 'STC 60+ Certified Sound' },
    { key: 'northDaylight', label: 'North-Facing Daylight' },
    { key: 'gripPackageIncluded', label: 'Grip Package Included' },
  ];

  return (
    <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-16 bg-white dark:bg-[#101010] transition-colors duration-150 overflow-hidden">
      
      {/* 1. Ambient Background Drifting Blobs (SkillXChange Inspired Motion) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[480px] h-[480px] bg-emerald-500/8 dark:bg-emerald-500/12 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[540px] h-[540px] bg-emerald-600/5 dark:bg-emerald-400/8 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-[25%] right-[15%] w-[320px] h-[320px] bg-slate-400/8 dark:bg-slate-600/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split Hero: Typography & Staggered Content + Interactive Floating Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Fast Actions (Span 7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold animate-slide-up delay-75">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase tracking-wider text-[11px] font-bold">
                140+ Commercial Production Stages
              </span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="mt-4 text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5] leading-[1.1] animate-slide-up delay-150">
              Find the Perfect Space for Your Next Shoot
            </h1>

            {/* Supporting Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-[#B3B3B3] font-normal leading-relaxed max-w-xl animate-slide-up delay-200">
              Discover verified cycloramas, soundstages, raw filming locations, union camera crews, and cinema packages with transparent 10-hour shoot day rules.
            </p>

            {/* Action Buttons & Social Proof */}
            <div className="mt-6 flex flex-wrap items-center gap-4 animate-slide-up delay-300">
              <Link
                href="/studios"
                className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
              >
                <span>Explore Studios</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/list-your-studio"
                className="px-5 py-3 rounded-full border border-slate-300 dark:border-[#303030] hover:bg-slate-100 dark:hover:bg-[#181818] text-slate-800 dark:text-[#F5F5F5] text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                List Your Stage
              </Link>

              {/* Trust Badge: COI Included */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-[#8A8A8A] pl-1">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldPolicyIcon className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-[#B3B3B3]">
                  $2M Direct Liability Policy Included
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Floating Showcase (Desktop) (Span 5) */}
          <div className="lg:col-span-5 relative h-[380px] hidden lg:block select-none">
            
            {/* Ambient Radial Highlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-tr from-emerald-500/15 to-slate-400/10 dark:from-emerald-500/20 dark:to-slate-800/20 rounded-full blur-3xl pointer-events-none" />

            {/* Floating Card 1: Studio Highlight (Top Left) */}
            <div className="absolute top-0 left-2 z-10 animate-float">
              <Link
                href="/studios/the-greenpoint-cove"
                className="block w-64 p-4 rounded-2xl bg-white/90 dark:bg-[#181818]/90 backdrop-blur-md border border-slate-200/90 dark:border-[#303030] shadow-xl hover:shadow-2xl dark:shadow-black/50 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-900 mb-3">
                  <Image
                    src="/images/studios/greenpoint-cove.svg"
                    alt="The Greenpoint Cove Studio"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-xs">
                    DAYLIGHT CYC
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-slate-950">
                    $175/hr
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-[#F5F5F5] truncate">
                  The Greenpoint Cove Studio A
                </h3>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-500 dark:text-[#8A8A8A]">
                  <ZapIcon className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>300A 3-Phase · 22ft Steel Grid</span>
                </div>
              </Link>
            </div>

            {/* Floating Card 2: Union Crew Profile (Bottom Right) */}
            <div className="absolute bottom-2 right-2 z-20 animate-float-alt">
              <Link
                href="/crew/marcus-vance-dp"
                className="block w-60 p-4 rounded-2xl bg-white/90 dark:bg-[#181818]/90 backdrop-blur-md border border-slate-200/90 dark:border-[#303030] shadow-xl hover:shadow-2xl dark:shadow-black/50 transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                    <Image
                      src="/images/crew/marcus-vance.svg"
                      alt="Marcus Vance"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-bold bg-slate-100 dark:bg-[#262626] text-slate-700 dark:text-slate-300 uppercase">
                      IATSE 600
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-[#F5F5F5] truncate mt-0.5">
                      Marcus Vance
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-[#8A8A8A] truncate">
                      Director of Photography
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#262626] text-[10px]">
                  <span className="flex items-center gap-1 text-slate-800 dark:text-[#F5F5F5] font-semibold">
                    <StarIcon className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>4.98</span>
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-[#F5F5F5]">
                    $1,650<span className="font-normal text-slate-400">/day</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Floating Card 3: Live Shoot Shield Badge (Center Overlay) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <div className="px-3.5 py-2 rounded-xl bg-slate-900/95 dark:bg-[#202020]/95 text-white backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-bold tracking-wide">
                  COI Endorsement Verified
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* 2. Floating Segmented Studio Search Bar (Refined Entrance & Transitions) */}
        <div ref={searchContainerRef} className="mt-10 relative z-30 animate-slide-up delay-400">
          <div className="bg-white dark:bg-[#181818] rounded-2xl sm:rounded-full border border-slate-200/90 dark:border-[#303030] shadow-[0_12px_40px_rgb(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgb(0,0,0,0.5)] p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-[#262626] transition-all">
            
            {/* Segment 1: Location & Submarket */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'location' ? null : 'location')}
                className="w-full text-left px-4 py-3 sm:py-2.5 rounded-xl sm:rounded-full hover:bg-slate-50 dark:hover:bg-[#202020] transition-colors flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                aria-expanded={activeDropdown === 'location'}
                aria-haspopup="listbox"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#262626] flex items-center justify-center shrink-0 text-slate-700 dark:text-[#F5F5F5]">
                  <LocationPinIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
                    LOCATION &amp; SUBMARKET
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-slate-900 dark:text-[#F5F5F5] truncate">
                    {selectedLocation}
                  </span>
                  <span className="block text-[10px] text-slate-500 dark:text-[#8A8A8A] truncate">
                    Zone 1 (15-min radius)
                  </span>
                </div>
              </button>

              {/* Location Dropdown */}
              {activeDropdown === 'location' && (
                <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#181818] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#303030] p-2 z-50 animate-scale-in">
                  <div className="text-[10px] font-bold text-slate-500 dark:text-[#8A8A8A] px-3 py-1.5 uppercase tracking-wider">
                    Select Production Hub
                  </div>
                  <ul role="listbox">
                    {LOCATION_OPTIONS.map((loc) => (
                      <li key={loc}>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectLocation(loc);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                            selectedLocation === loc
                              ? 'bg-slate-900 dark:bg-emerald-600 text-white font-semibold'
                              : 'text-slate-700 dark:text-[#B3B3B3] hover:bg-slate-100 dark:hover:bg-[#202020] hover:text-slate-900 dark:hover:text-[#F5F5F5]'
                          }`}
                        >
                          {loc}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Segment 2: Stage Archetype */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'stage' ? null : 'stage')}
                className="w-full text-left px-4 py-3 sm:py-2.5 rounded-xl sm:rounded-full hover:bg-slate-50 dark:hover:bg-[#202020] transition-colors flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                aria-expanded={activeDropdown === 'stage'}
                aria-haspopup="listbox"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#262626] flex items-center justify-center shrink-0 text-slate-700 dark:text-[#F5F5F5]">
                    <ArchetypeIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
                      STAGE ARCHETYPE
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-slate-900 dark:text-[#F5F5F5] truncate">
                      {selectedStageType}
                    </span>
                    <span className="block text-[10px] text-slate-500 dark:text-[#8A8A8A] truncate">
                      Rigging &amp; power included
                    </span>
                  </div>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-slate-400 dark:text-[#8A8A8A] shrink-0 ml-1" />
              </button>

              {/* Stage Type Dropdown */}
              {activeDropdown === 'stage' && (
                <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#181818] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#303030] p-2 z-50 animate-scale-in">
                  <div className="text-[10px] font-bold text-slate-500 dark:text-[#8A8A8A] px-3 py-1.5 uppercase tracking-wider">
                    Select Stage Geometry
                  </div>
                  <ul role="listbox">
                    {STAGE_TYPE_OPTIONS.map((type) => (
                      <li key={type}>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectStageType(type);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                            selectedStageType === type
                              ? 'bg-slate-900 dark:bg-emerald-600 text-white font-semibold'
                              : 'text-slate-700 dark:text-[#B3B3B3] hover:bg-slate-100 dark:hover:bg-[#202020] hover:text-slate-900 dark:hover:text-[#F5F5F5]'
                          }`}
                        >
                          {type}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Segment 3: Shoot Date & Shift */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}
                className="w-full text-left px-4 py-3 sm:py-2.5 rounded-xl sm:rounded-full hover:bg-slate-50 dark:hover:bg-[#202020] transition-colors flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                aria-expanded={activeDropdown === 'date'}
                aria-haspopup="listbox"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#262626] flex items-center justify-center shrink-0 text-slate-700 dark:text-[#F5F5F5]">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
                    SHOOT DATE &amp; SHIFT
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-slate-900 dark:text-[#F5F5F5] truncate">
                    {selectedShift.label}
                  </span>
                  <span className="block text-[10px] text-slate-500 dark:text-[#8A8A8A] truncate">
                    {selectedShift.times}
                  </span>
                </div>
              </button>

              {/* Shift Dropdown */}
              {activeDropdown === 'date' && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#181818] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#303030] p-2 z-50 animate-scale-in">
                  <div className="text-[10px] font-bold text-slate-500 dark:text-[#8A8A8A] px-3 py-1.5 uppercase tracking-wider">
                    Select Shoot Shift &amp; Call Sheet Times
                  </div>
                  <ul role="listbox">
                    {SHIFT_OPTIONS.map((opt) => (
                      <li key={opt.label}>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectShift(opt);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                            selectedShift.label === opt.label
                              ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                              : 'hover:bg-slate-100 dark:hover:bg-[#202020]'
                          }`}
                        >
                          <div className={`text-xs font-semibold ${selectedShift.label === opt.label ? 'text-white' : 'text-slate-800 dark:text-[#F5F5F5]'}`}>
                            {opt.label}
                          </div>
                          <div className={`text-[10px] ${selectedShift.label === opt.label ? 'text-slate-300 dark:text-emerald-100' : 'text-slate-500 dark:text-[#8A8A8A]'}`}>
                            {opt.times}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Segment 4: Primary Find Studios Action CTA */}
            <div className="p-1 sm:p-0 sm:pr-1 shrink-0">
              <button
                type="button"
                onClick={handleSearchClick}
                className="w-full sm:w-auto h-12 sm:h-12 px-6 rounded-xl sm:rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-[0.98] cursor-pointer"
              >
                <span>Find Your Space</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* 3. Quick Requirement Chips Row (Refined Hover & Active Interactions) */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A] mr-1">
            QUICK FILTERS:
          </span>

          {quickFilterOptions.map((chip) => {
            const isActive = activeQuickFilters.includes(chip.key);
            return (
              <button
                key={chip.key}
                type="button"
                onClick={() => onToggleQuickFilter(chip.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border hover:-translate-y-0.5 active:translate-y-0 ${
                  isActive
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white border-slate-900 dark:border-emerald-600 shadow-2xs'
                    : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545] hover:bg-slate-50 dark:hover:bg-[#202020] hover:text-slate-900 dark:hover:text-[#F5F5F5]'
                }`}
                aria-pressed={isActive}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isActive ? 'bg-emerald-400' : 'bg-slate-300 dark:bg-[#454545]'
                  }`}
                />
                <span>{chip.label}</span>
              </button>
            );
          })}

          {activeQuickFilters.length > 0 && (
            <button
              type="button"
              onClick={() => {
                activeQuickFilters.forEach((key) => onToggleQuickFilter(key));
              }}
              className="text-[11px] font-semibold text-slate-500 dark:text-[#8A8A8A] hover:text-slate-900 dark:hover:text-[#F5F5F5] underline ml-2 cursor-pointer transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
