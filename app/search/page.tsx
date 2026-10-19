'use client';

import React, { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { StudioCard } from '@/components/studios/StudioCard';
import { LocationCard } from '@/components/locations/LocationCard';
import { CrewCard } from '@/components/crew/CrewCard';
import { EquipmentCard } from '@/components/equipment/EquipmentCard';
import { SearchIcon, LocationPinIcon } from '@/components/ui/Icons';
import {
  INITIAL_STUDIOS,
  INITIAL_LOCATIONS,
  INITIAL_CREW,
  INITIAL_EQUIPMENT,
  LOCATION_OPTIONS,
} from '@/lib/data';

type SearchTab = 'all' | 'studios' | 'locations' | 'crew' | 'equipment';
type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get('q') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialStageType = searchParams.get('stageType') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedTab, setSelectedTab] = useState<SearchTab>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  const tabContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [tabIndicatorStyle, setTabIndicatorStyle] = useState<{
    left: number;
    width: number;
    height: number;
    top: number;
    opacity: number;
  }>({ left: 0, width: 0, height: 0, top: 0, opacity: 0 });

  // Filter & Sort Studios
  const matchingStudios = useMemo(() => {
    const list = INITIAL_STUDIOS.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.submarket.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.specs.sqFt.toString().includes(q);

      const matchLoc =
        !selectedLocation ||
        s.location.toLowerCase().includes(selectedLocation.toLowerCase().split('&')[0].trim().toLowerCase()) ||
        s.submarket.toLowerCase().includes(selectedLocation.toLowerCase().split('&')[0].trim().toLowerCase());

      const matchType =
        !initialStageType ||
        s.badgeTopLeft.toLowerCase().includes(initialStageType.toLowerCase().slice(0, 5));

      return matchQuery && matchLoc && matchType;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.dayRate10h - b.dayRate10h);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.dayRate10h - a.dayRate10h);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [searchQuery, selectedLocation, initialStageType, sortBy]);

  // Filter & Sort Locations
  const matchingLocations = useMemo(() => {
    const list = INITIAL_LOCATIONS.filter((l) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.submarket.toLowerCase().includes(q) ||
        l.categoryLabel.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.amenities.some((a: string) => a.toLowerCase().includes(q));

      const matchLoc =
        !selectedLocation ||
        l.location.toLowerCase().includes(selectedLocation.toLowerCase().split('&')[0].trim().toLowerCase()) ||
        l.submarket.toLowerCase().includes(selectedLocation.toLowerCase().split('&')[0].trim().toLowerCase());

      return matchQuery && matchLoc;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.dayRate10h - b.dayRate10h);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.dayRate10h - a.dayRate10h);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [searchQuery, selectedLocation, sortBy]);

  // Filter & Sort Crew
  const matchingCrew = useMemo(() => {
    const list = INITIAL_CREW.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.unionAffiliation.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.workingKit.toLowerCase().includes(q) ||
        c.skills.some((skill: string) => skill.toLowerCase().includes(q));

      const matchLoc =
        !selectedLocation ||
        c.location.toLowerCase().includes(selectedLocation.toLowerCase().split('&')[0].trim().toLowerCase());

      return matchQuery && matchLoc;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.dayRate10h - b.dayRate10h);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.dayRate10h - a.dayRate10h);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [searchQuery, selectedLocation, sortBy]);

  // Filter & Sort Equipment
  const matchingEquipment = useMemo(() => {
    const list = INITIAL_EQUIPMENT.filter((e) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.brand.toLowerCase().includes(q) ||
        e.categoryLabel.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.keySpecs.some((spec: string) => spec.toLowerCase().includes(q)) ||
        e.includedAccessories.some((inc: string) => inc.toLowerCase().includes(q));

      return matchQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.dayRate - b.dayRate);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.dayRate - a.dayRate);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [searchQuery, sortBy]);

  const totalResultsCount =
    matchingStudios.length +
    matchingLocations.length +
    matchingCrew.length +
    matchingEquipment.length;

  const tabs = [
    { id: 'all' as const, label: `All Results (${totalResultsCount})` },
    { id: 'studios' as const, label: `Studios (${matchingStudios.length})` },
    { id: 'locations' as const, label: `Filming Locations (${matchingLocations.length})` },
    { id: 'crew' as const, label: `Crew Roster (${matchingCrew.length})` },
    { id: 'equipment' as const, label: `Equipment & Grip (${matchingEquipment.length})` },
  ];

  const activeTabIdx = tabs.findIndex((t) => t.id === selectedTab);

  useEffect(() => {
    const updateTabIndicator = () => {
      if (activeTabIdx === -1 || !tabRefs.current[activeTabIdx] || !tabContainerRef.current) {
        setTabIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const targetEl = tabRefs.current[activeTabIdx];
      if (!targetEl) return;
      setTabIndicatorStyle({
        left: targetEl.offsetLeft,
        width: targetEl.offsetWidth,
        height: targetEl.offsetHeight,
        top: targetEl.offsetTop,
        opacity: 1,
      });
    };

    updateTabIndicator();
    window.addEventListener('resize', updateTabIndicator);
    return () => window.removeEventListener('resize', updateTabIndicator);
  }, [selectedTab, activeTabIdx, totalResultsCount, matchingStudios.length, matchingLocations.length, matchingCrew.length, matchingEquipment.length]);

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSortBy('relevance');
    router.replace('/search');
  };

  return (
    <div className="py-8 sm:py-10 bg-white dark:bg-[#101010] min-h-[calc(100vh-140px)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Marketplace Search' },
          ]}
          className="mb-6"
        />

        {/* Page Header & Controls Bar */}
        <div className="pb-6 border-b border-slate-200/80 dark:border-[#262626]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-subtle" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#8A8A8A]">
                  MARKETPLACE INVENTORY
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5]">
                Marketplace Search
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8A8A8A]">
              {totalResultsCount === 0
                ? 'No matching listings found'
                : `Showing ${totalResultsCount} verified production ${
                    totalResultsCount === 1 ? 'asset' : 'assets'
                  }`}
            </p>
          </div>

          {/* Interactive Search & Filter Controls Bar */}
          <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center gap-3">
            
            {/* Visually Dominant Search Input */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#8A8A8A] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cycloramas, soundstages, union DPs, Arri Alexa, lighting..."
                className="w-full pl-10 pr-16 py-3 min-h-[44px] bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] rounded-xl text-base sm:text-sm text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#202020] transition-all duration-200 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs text-slate-400 dark:text-[#8A8A8A] hover:text-slate-700 dark:hover:text-[#F5F5F5] rounded cursor-pointer font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Location Selector */}
            <div className="relative w-full md:w-60">
              <LocationPinIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#8A8A8A] pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-9 pr-8 py-3 min-h-[44px] bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] rounded-xl text-base sm:text-sm font-medium text-slate-800 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#202020] cursor-pointer transition-all duration-200 shadow-2xs appearance-none"
              >
                <option value="">All Production Hubs</option>
                {LOCATION_OPTIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-[#8A8A8A]">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Sorting Dropdown */}
            <div className="relative w-full md:w-52">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full pl-3.5 pr-8 py-3 min-h-[44px] bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] rounded-xl text-base sm:text-sm font-medium text-slate-800 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#202020] cursor-pointer transition-all duration-200 shadow-2xs appearance-none"
              >
                <option value="relevance">Sort: Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Day Rate: Low to High</option>
                <option value="price-desc">Day Rate: High to Low</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-[#8A8A8A]">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* Category Filter Tabs with Sliding Indicator */}
        <div className="py-4 border-b border-slate-200/80 dark:border-[#262626] overflow-x-auto scrollbar-none">
          <div
            ref={tabContainerRef}
            className="relative inline-flex items-center p-1 rounded-full bg-slate-100 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626]"
          >
            {/* Sliding background pill */}
            <div
              className="absolute rounded-full bg-slate-900 dark:bg-emerald-600 shadow-2xs pointer-events-none transition-all duration-260 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: 0,
                transform: `translateX(${tabIndicatorStyle.left}px)`,
                width: `${tabIndicatorStyle.width}px`,
                height: `${tabIndicatorStyle.height}px`,
                top: `${tabIndicatorStyle.top}px`,
                opacity: tabIndicatorStyle.opacity,
              }}
            />

            {tabs.map((tab, idx) => {
              const isSelected = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => setSelectedTab(tab.id)}
                  className={`relative z-10 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-600 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Body */}
        <div className="mt-8">
          {totalResultsCount === 0 ? (
            <EmptyState
              title="No production listings found"
              description="No studios, filming locations, crew members, or equipment match your current search query and filters."
              actionLabel="Reset Search Filters"
              onAction={handleClearAll}
            />
          ) : (
            <div className="space-y-12">
              {/* Studios Section */}
              {(selectedTab === 'all' || selectedTab === 'studios') &&
                matchingStudios.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
                          Production Studios &amp; Soundstages ({matchingStudios.length})
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                      {matchingStudios.map((studio) => (
                        <StudioCard key={studio.id} studio={studio} />
                      ))}
                    </div>
                  </div>
                )}

              {/* Filming Locations Section */}
              {(selectedTab === 'all' || selectedTab === 'locations') &&
                matchingLocations.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
                          Filming Locations ({matchingLocations.length})
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                      {matchingLocations.map((location) => (
                        <LocationCard key={location.id} location={location} />
                      ))}
                    </div>
                  </div>
                )}

              {/* Crew Section */}
              {(selectedTab === 'all' || selectedTab === 'crew') &&
                matchingCrew.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
                          Production Crew &amp; Department Heads ({matchingCrew.length})
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                      {matchingCrew.map((member) => (
                        <CrewCard key={member.id} member={member} />
                      ))}
                    </div>
                  </div>
                )}

              {/* Equipment Section */}
              {(selectedTab === 'all' || selectedTab === 'equipment') &&
                matchingEquipment.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
                          Equipment &amp; Camera Packages ({matchingEquipment.length})
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                      {matchingEquipment.map((equipment) => (
                        <EquipmentCard key={equipment.id} equipment={equipment} />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-slate-500">
          <div className="inline-block w-8 h-8 border-2 border-slate-900 dark:border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Searching Marketplace...
          </p>
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
