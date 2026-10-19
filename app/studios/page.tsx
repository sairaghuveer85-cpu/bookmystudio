'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { StudioCard } from '@/components/studios/StudioCard';
import { MobileFilterSheet } from '@/components/search/MobileFilterSheet';
import { FilterIcon } from '@/components/ui/Icons';
import { INITIAL_STUDIOS } from '@/lib/data';
import { StudioCategory } from '@/lib/types';

export default function StudiosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<StudioCategory | 'all'>('all');
  const [camlockOnly, setCamlockOnly] = useState(false);
  const [driveInOnly, setDriveInOnly] = useState(false);
  const [soundproofOnly, setSoundproofOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'size-desc' | 'rating-desc'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredStudios = useMemo(() => {
    let result = [...INITIAL_STUDIOS];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.submarket.toLowerCase().includes(q) ||
          s.equipmentHighlight.toLowerCase().includes(q) ||
          s.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.category === selectedCategory);
    }

    // Technical feature filters
    if (camlockOnly) {
      result = result.filter((s) => s.features.camlockPower);
    }
    if (driveInOnly) {
      result = result.filter((s) => s.features.driveInAccess);
    }
    if (soundproofOnly) {
      result = result.filter((s) => s.features.stc60Certified);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.dayRate10h - b.dayRate10h);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.dayRate10h - a.dayRate10h);
    } else if (sortBy === 'size-desc') {
      result.sort((a, b) => b.specs.sqFt - a.specs.sqFt);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, camlockOnly, driveInOnly, soundproofOnly, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setCamlockOnly(false);
    setDriveInOnly(false);
    setSoundproofOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedCategory !== 'all' ||
    camlockOnly ||
    driveInOnly ||
    soundproofOnly;

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (camlockOnly ? 1 : 0) +
    (driveInOnly ? 1 : 0) +
    (soundproofOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Production Studios' }]} />

      {/* Header Banner */}
      <div className="mt-2 pb-6 border-b border-slate-100 dark:border-[#303030]">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#8A8A8A]">
          STUDIO MARKETPLACE
        </span>
        <h1 className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5]">
          Production Studios &amp; Soundstages
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-[#8A8A8A] max-w-2xl leading-relaxed">
          Discover certified cycloramas, soundproof soundstages, natural daylight lofts, and culinary production stages ready for commercial wraps.
        </p>
      </div>

      {/* Search & Filter Controls Toolbar */}
      <div className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Keyword Search Input + Mobile Filter Button */}
          <div className="flex items-center gap-2 flex-1 max-w-lg">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search studios by name, neighborhood, or lighting grid..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 min-h-[44px] text-base sm:text-xs rounded-xl border border-slate-200 dark:border-[#303030] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] bg-white dark:bg-[#181818] text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#8A8A8A]"
              />
              <svg
                className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 dark:text-[#8A8A8A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 w-6 h-6 flex items-center justify-center text-slate-400 dark:text-[#8A8A8A] hover:text-slate-600 dark:hover:text-[#F5F5F5] text-xs cursor-pointer"
                  aria-label="Clear search input"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Filter Sheet Trigger Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-xl bg-slate-900 dark:bg-emerald-600 text-white text-xs font-bold shrink-0 shadow-xs cursor-pointer active:scale-95 transition-all"
              aria-label="Open filter panel"
            >
              <FilterIcon className="w-4 h-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-slate-950 text-[10px] font-extrabold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Sort Control */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <label htmlFor="sortSelect" className="text-xs font-semibold text-slate-600 dark:text-[#8A8A8A]">
              Sort By:
            </label>
            <select
              id="sortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2.5 min-h-[44px] text-xs rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#181818] font-medium text-slate-800 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] cursor-pointer"
            >
              <option value="featured">Featured Hubs</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="size-desc">Stage Size: Largest First</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Spec Toggles Row (Horizontally scrollable on mobile) */}
        <div className="flex overflow-x-auto pb-1 scrollbar-none items-center gap-2 pt-1">
          {/* Category Pills */}
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'all'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            All Categories
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('cyclorama')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'cyclorama'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            Cycloramas
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('soundstage')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'soundstage'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            Soundstages
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('daylight')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'daylight'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            Daylight Lofts
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('kitchen')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'kitchen'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            Kitchen Stages
          </button>

          <span className="text-slate-300 dark:text-[#383838] mx-1 hidden sm:inline">|</span>

          {/* Quick Technical Filters */}
          <button
            type="button"
            onClick={() => setCamlockOnly(!camlockOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
              camlockOnly
                ? 'bg-slate-900 dark:bg-[#10B981]/20 text-white dark:text-[#10B981] border-slate-900 dark:border-[#10B981]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${camlockOnly ? 'bg-emerald-400' : 'bg-slate-300 dark:bg-slate-600'}`} />
            <span>3-Phase Camlock</span>
          </button>

          <button
            type="button"
            onClick={() => setDriveInOnly(!driveInOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
              driveInOnly
                ? 'bg-slate-900 dark:bg-[#10B981]/20 text-white dark:text-[#10B981] border-slate-900 dark:border-[#10B981]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${driveInOnly ? 'bg-emerald-400' : 'bg-slate-300 dark:bg-slate-600'}`} />
            <span>Drive-in Bay</span>
          </button>

          <button
            type="button"
            onClick={() => setSoundproofOnly(!soundproofOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
              soundproofOnly
                ? 'bg-slate-900 dark:bg-[#10B981]/20 text-white dark:text-[#10B981] border-slate-900 dark:border-[#10B981]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${soundproofOnly ? 'bg-emerald-400' : 'bg-slate-300 dark:bg-slate-600'}`} />
            <span>STC 60+ Soundproof</span>
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs font-semibold text-slate-500 dark:text-[#8A8A8A] hover:text-slate-900 dark:hover:text-[#F5F5F5] underline ml-2 cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Meta */}
      <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-[#8A8A8A] border-b border-slate-100 dark:border-[#303030] pb-3">
        <span>
          Showing <strong className="text-slate-900 dark:text-[#F5F5F5] font-bold">{filteredStudios.length}</strong> certified production {filteredStudios.length === 1 ? 'stage' : 'stages'}
        </span>
        <span className="text-[11px] text-slate-400 dark:text-[#8A8A8A]">All bookings include $2M direct liability policy</span>
      </div>

      {/* Studios Grid */}
      <div className="mt-6">
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredStudios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No production stages match your current criteria"
            description="Try removing technical filters like 600A Camlock or Soundproof to explore all commercial stages."
            actionLabel="Reset All Filters"
            onAction={resetAllFilters}
          />
        )}
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <MobileFilterSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Studios & Stages"
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat as StudioCategory | 'all')}
        categories={[
          { id: 'all', label: 'All Categories' },
          { id: 'cyclorama', label: 'Cycloramas' },
          { id: 'soundstage', label: 'Soundstages' },
          { id: 'daylight', label: 'Daylight Lofts' },
          { id: 'kitchen', label: 'Kitchen Stages' },
        ]}
        sortBy={sortBy}
        onSelectSortBy={(sort) => setSortBy(sort as typeof sortBy)}
        sortOptions={[
          { id: 'featured', label: 'Featured Hubs' },
          { id: 'price-asc', label: 'Price: Low to High' },
          { id: 'price-desc', label: 'Price: High to Low' },
          { id: 'size-desc', label: 'Stage Size: Largest First' },
          { id: 'rating-desc', label: 'Highest Rated' },
        ]}
        camlockOnly={camlockOnly}
        onToggleCamlock={() => setCamlockOnly(!camlockOnly)}
        driveInOnly={driveInOnly}
        onToggleDriveIn={() => setDriveInOnly(!driveInOnly)}
        soundproofOnly={soundproofOnly}
        onToggleSoundproof={() => setSoundproofOnly(!soundproofOnly)}
        onResetFilters={resetAllFilters}
        totalResultsCount={filteredStudios.length}
      />
    </div>
  );
}

