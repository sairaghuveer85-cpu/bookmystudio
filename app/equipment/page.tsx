'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { EquipmentCard } from '@/components/equipment/EquipmentCard';
import { MobileFilterSheet } from '@/components/search/MobileFilterSheet';
import { FilterIcon } from '@/components/ui/Icons';
import { INITIAL_EQUIPMENT } from '@/lib/data';
import { EquipmentCategory } from '@/lib/types';

export default function EquipmentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'value-desc'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredEquipment = useMemo(() => {
    let result = [...INITIAL_EQUIPMENT];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.brand.toLowerCase().includes(q) ||
          e.categoryLabel.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.keySpecs.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((e) => e.category === selectedCategory);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.dayRate - b.dayRate);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.dayRate - a.dayRate);
    } else if (sortBy === 'value-desc') {
      result.sort((a, b) => b.replacementValue - a.replacementValue);
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
      <Breadcrumbs items={[{ label: 'Equipment & Grip' }]} />

      {/* Header */}
      <div className="mt-2 pb-6 border-b border-slate-100 dark:border-[#303030]">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#8A8A8A]">
          PRODUCTION EQUIPMENT MARKETPLACE
        </span>
        <h1 className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5]">
          Production Equipment &amp; Grip Packages
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-[#8A8A8A] max-w-2xl leading-relaxed">
          Pre-inspected cinema camera packages, point-source color LED fixtures, audio field recorders, and hydraulic dollies.
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
                placeholder="Search gear by brand (ARRI, Aputure, Sound Devices, Fisher)..."
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
            <label htmlFor="eqSortSelect" className="text-xs font-semibold text-slate-600 dark:text-[#8A8A8A]">
              Sort By:
            </label>
            <select
              id="eqSortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2.5 min-h-[44px] text-xs rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#181818] font-medium text-slate-800 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] cursor-pointer"
            >
              <option value="featured">Featured Gear</option>
              <option value="price-asc">Day Rate: Low to High</option>
              <option value="price-desc">Day Rate: High to Low</option>
              <option value="value-desc">Highest Replacement Value</option>
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
            All Inventory
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('cameras')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'cameras'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            Cinema Cameras
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('lighting')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'lighting'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            LED &amp; HMI Lighting
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('audio')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'audio'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            Sound &amp; Wireless
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('grip')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'grip'
                ? 'bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] border-black dark:border-[#F5F5F5]'
                : 'bg-white dark:bg-[#181818] text-slate-700 dark:text-[#B3B3B3] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545]'
            }`}
          >
            Dollies &amp; Grip
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
          Showing <strong className="text-slate-900 dark:text-[#F5F5F5] font-bold">{filteredEquipment.length}</strong> equipment {filteredEquipment.length === 1 ? 'kit' : 'kits'}
        </span>
        <span className="text-[11px] text-slate-400 dark:text-[#8A8A8A]">All rentals backed by $250,000 inland marine equipment floater policy</span>
      </div>

      {/* Equipment Grid */}
      <div className="mt-6">
        {filteredEquipment.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredEquipment.map((eq) => (
              <EquipmentCard key={eq.id} equipment={eq} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No production equipment matched your search"
            description="Try searching for another manufacturer (ARRI, Aputure, RED) or clear category filters."
            actionLabel="Reset Equipment Filters"
            onAction={resetAllFilters}
          />
        )}
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <MobileFilterSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Equipment & Gear"
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat as EquipmentCategory | 'all')}
        categories={[
          { id: 'all', label: 'All Inventory' },
          { id: 'cameras', label: 'Cinema Cameras' },
          { id: 'lighting', label: 'Continuous Lighting' },
          { id: 'lenses', label: 'Cinema Primes & Zooms' },
          { id: 'audio', label: 'Production Audio' },
          { id: 'grip', label: 'Grip & Rigging' },
        ]}
        sortBy={sortBy}
        onSelectSortBy={(sort) => setSortBy(sort as typeof sortBy)}
        sortOptions={[
          { id: 'featured', label: 'Featured Gear' },
          { id: 'price-asc', label: 'Day Rate: Low to High' },
          { id: 'price-desc', label: 'Day Rate: High to Low' },
          { id: 'value-desc', label: 'Highest Replacement Value' },
        ]}
        onResetFilters={resetAllFilters}
        totalResultsCount={filteredEquipment.length}
      />
    </div>
  );
}

