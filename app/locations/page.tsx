'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { LocationCard } from '@/components/locations/LocationCard';
import { MobileFilterSheet } from '@/components/search/MobileFilterSheet';
import { FilterIcon } from '@/components/ui/Icons';
import { INITIAL_LOCATIONS } from '@/lib/data';
import { LocationCategory } from '@/lib/types';

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'area-desc'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredLocations = useMemo(() => {
    let result = [...INITIAL_LOCATIONS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.submarket.toLowerCase().includes(q) ||
          l.categoryLabel.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((l) => l.category === selectedCategory);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.dayRate10h - b.dayRate10h);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.dayRate10h - a.dayRate10h);
    } else if (sortBy === 'area-desc') {
      result.sort((a, b) => b.areaSqFt - a.areaSqFt);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Filming Locations' }]} />

      {/* Header */}
      <div className="mt-2 pb-6 border-b border-slate-100 dark:border-[#303030]">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#8A8A8A]">
          LOCATION SCOUTING DIRECTORY
        </span>
        <h1 className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5]">
          Filming Locations &amp; Industrial Spaces
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-[#8A8A8A] max-w-2xl leading-relaxed">
          Pre-scouted brick warehouses, landmark lofts, deep-water pier terminals, and rooftop panoramas permitted for commercial filming.
        </p>
      </div>

      {/* Toolbar */}
      <div className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Keyword Search + Mobile Filter Button */}
          <div className="flex items-center gap-2 flex-1 max-w-lg">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search locations by architectural style, dock access, or zoning..."
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
              {selectedCategory !== 'all' && (
                <span className="w-4 h-4 rounded-full bg-white text-slate-950 text-[10px] font-extrabold flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Desktop Sort Select */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <label htmlFor="locationSortSelect" className="text-xs font-semibold text-slate-600 dark:text-[#8A8A8A]">
              Sort By:
            </label>
            <select
              id="locationSortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2.5 min-h-[44px] text-xs rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#181818] font-medium text-slate-800 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] cursor-pointer"
            >
              <option value="featured">Featured Hubs</option>
              <option value="price-asc">Day Rate: Low to High</option>
              <option value="price-desc">Day Rate: High to Low</option>
              <option value="area-desc">Area: Largest Space</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Horizontally scrollable on mobile) */}
        <div className="flex overflow-x-auto pb-1 scrollbar-none items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'all'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            All Spaces
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('warehouse')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'warehouse'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            Brick Warehouses
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('loft')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'loft'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            Cast-Iron Lofts
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('industrial')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'industrial'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            Maritime Docks
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('rooftop')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'rooftop'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            Rooftop Panoramas
          </button>

          {(searchQuery || selectedCategory !== 'all') && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs font-semibold text-slate-500 dark:text-[#8A8A8A] hover:text-slate-900 dark:hover:text-[#F5F5F5] underline ml-2 cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Meta Bar */}
      <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-[#8A8A8A] border-b border-slate-100 dark:border-[#303030] pb-3">
        <span>
          Showing <strong className="text-slate-900 dark:text-[#F5F5F5] font-bold">{filteredLocations.length}</strong> filming {filteredLocations.length === 1 ? 'location' : 'locations'}
        </span>
        <span className="text-[11px] text-slate-400 dark:text-[#8A8A8A]">All locations supported by NYC MOFTB liaison team</span>
      </div>

      {/* Locations Grid */}
      <div className="mt-6">
        {filteredLocations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredLocations.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No filming locations matched your search"
            description="Try searching for a different neighborhood or reset the category filter to view all production properties."
            actionLabel="Reset Location Filters"
            onAction={resetAllFilters}
          />
        )}
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <MobileFilterSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Filming Locations"
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat as LocationCategory | 'all')}
        categories={[
          { id: 'all', label: 'All Spaces' },
          { id: 'warehouse', label: 'Industrial Warehouses' },
          { id: 'loft', label: 'Cast-Iron Lofts' },
          { id: 'commercial', label: 'Commercial Buildings' },
          { id: 'rooftop', label: 'Rooftops' },
          { id: 'mansion', label: 'Estates & Mansions' },
        ]}
        sortBy={sortBy}
        onSelectSortBy={(sort) => setSortBy(sort as typeof sortBy)}
        sortOptions={[
          { id: 'featured', label: 'Featured Hubs' },
          { id: 'price-asc', label: 'Day Rate: Low to High' },
          { id: 'price-desc', label: 'Day Rate: High to Low' },
          { id: 'area-desc', label: 'Area: Largest Space' },
        ]}
        onResetFilters={resetAllFilters}
        totalResultsCount={filteredLocations.length}
      />
    </div>
  );
}

