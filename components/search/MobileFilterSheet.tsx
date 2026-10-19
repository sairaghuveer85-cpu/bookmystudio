'use client';

import React, { useEffect } from 'react';
import { CloseIcon, ZapIcon, TruckIcon } from '@/components/ui/Icons';

interface FilterOption {
  id: string;
  label: string;
}

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: FilterOption[];
  sortBy: string;
  onSelectSortBy: (sort: string) => void;
  sortOptions: FilterOption[];
  camlockOnly?: boolean;
  onToggleCamlock?: () => void;
  driveInOnly?: boolean;
  onToggleDriveIn?: () => void;
  soundproofOnly?: boolean;
  onToggleSoundproof?: () => void;
  onResetFilters: () => void;
  totalResultsCount?: number;
}

export function MobileFilterSheet({
  isOpen,
  onClose,
  title = 'Filters & Sorting',
  selectedCategory,
  onSelectCategory,
  categories,
  sortBy,
  onSelectSortBy,
  sortOptions,
  camlockOnly,
  onToggleCamlock,
  driveInOnly,
  onToggleDriveIn,
  soundproofOnly,
  onToggleSoundproof,
  onResetFilters,
  totalResultsCount,
}: MobileFilterSheetProps) {
  // Lock body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-end justify-center animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-up Sheet */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#181818] rounded-t-3xl border-t border-slate-200 dark:border-[#303030] shadow-2xl z-10 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-250 ease-out">
        
        {/* Grab Handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-[#404040]" />
        </div>

        {/* Sheet Header */}
        <div className="px-5 py-3 border-b border-slate-100 dark:border-[#262626] flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5]">
            {title}
          </h3>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-[#F5F5F5] underline cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-[#F5F5F5] bg-slate-100 dark:bg-[#252525] cursor-pointer"
              aria-label="Close filters"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sheet Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          
          {/* Sorting Group */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A] mb-2.5">
              Sort By
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {sortOptions.map((opt) => {
                const isSelected = sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelectSortBy(opt.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-emerald-600 text-white font-semibold'
                        : 'bg-slate-50 dark:bg-[#202020] text-slate-700 dark:text-[#CCCCCC] hover:bg-slate-100 dark:hover:bg-[#282828]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Group */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A] mb-2.5">
              Category
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-emerald-600 text-white border-slate-900 dark:border-emerald-600 shadow-2xs font-semibold'
                        : 'bg-slate-50 dark:bg-[#202020] text-slate-700 dark:text-[#CCCCCC] border-slate-200 dark:border-[#303030] hover:border-slate-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Technical Specifications (if supported on page) */}
          {(onToggleCamlock || onToggleDriveIn || onToggleSoundproof) && (
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A] mb-2.5">
                Technical Capabilities
              </span>
              <div className="space-y-2">
                {onToggleCamlock && (
                  <button
                    type="button"
                    onClick={onToggleCamlock}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-colors cursor-pointer ${
                      camlockOnly
                        ? 'border-slate-900 dark:border-emerald-500 bg-slate-50 dark:bg-[#222]'
                        : 'border-slate-200 dark:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#202020]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ZapIcon className={`w-4 h-4 ${camlockOnly ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-[#F5F5F5]">
                          3-Phase Camlock (600A)
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-[#8A8A8A]">
                          Heavy power distribution for cinema lighting packages
                        </div>
                      </div>
                    </div>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        camlockOnly
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-slate-300 dark:border-[#505050]'
                      }`}
                    >
                      {camlockOnly && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                )}

                {onToggleDriveIn && (
                  <button
                    type="button"
                    onClick={onToggleDriveIn}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-colors cursor-pointer ${
                      driveInOnly
                        ? 'border-slate-900 dark:border-emerald-500 bg-slate-50 dark:bg-[#222]'
                        : 'border-slate-200 dark:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#202020]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <TruckIcon className={`w-4 h-4 ${driveInOnly ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-[#F5F5F5]">
                          Drive-in Vehicle Loading
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-[#8A8A8A]">
                          Direct roll-in stage door for grip trucks and hero cars
                        </div>
                      </div>
                    </div>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        driveInOnly
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-slate-300 dark:border-[#505050]'
                      }`}
                    >
                      {driveInOnly && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                )}

                {onToggleSoundproof && (
                  <button
                    type="button"
                    onClick={onToggleSoundproof}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-colors cursor-pointer ${
                      soundproofOnly
                        ? 'border-slate-900 dark:border-emerald-500 bg-slate-50 dark:bg-[#222]'
                        : 'border-slate-200 dark:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#202020]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${soundproofOnly ? 'text-emerald-500' : 'text-slate-400'}`}>
                        dB
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-[#F5F5F5]">
                          STC 60+ Certified Soundproof
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-[#8A8A8A]">
                          Acoustically isolated for live sync audio and dialog
                        </div>
                      </div>
                    </div>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        soundproofOnly
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-slate-300 dark:border-[#505050]'
                      }`}
                    >
                      {soundproofOnly && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Sheet Footer CTA */}
        <div className="p-4 border-t border-slate-100 dark:border-[#262626] safe-area-bottom bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-full bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          >
            {totalResultsCount !== undefined
              ? `Show ${totalResultsCount} Matching Results`
              : 'Apply Filters'}
          </button>
        </div>

      </div>
    </div>
  );
}

