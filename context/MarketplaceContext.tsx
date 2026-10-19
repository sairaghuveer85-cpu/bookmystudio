'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';
import { ProductionCrewMember } from '@/lib/types';

interface MarketplaceContextType {
  bookmarkedIds: string[];
  selectedCrew: ProductionCrewMember[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  toggleCrew: (member: ProductionCrewMember) => void;
  removeCrew: (id: string) => void;
  clearCrew: () => void;
  isCrewSelected: (id: string) => boolean;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

// Memory caches for stable reference identity across re-renders
const emptyBookmarks: string[] = [];
let cachedBookmarksRaw = '';
let cachedBookmarks: string[] = emptyBookmarks;

const emptyCrew: ProductionCrewMember[] = [];
let cachedCrewRaw = '';
let cachedCrew: ProductionCrewMember[] = emptyCrew;

function subscribeBookmarks(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('bms_bookmarks_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('bms_bookmarks_change', callback);
  };
}

function getBookmarksSnapshot(): string[] {
  if (typeof window === 'undefined') return emptyBookmarks;
  try {
    const raw = localStorage.getItem('bms_bookmarks') || '[]';
    if (raw !== cachedBookmarksRaw) {
      cachedBookmarksRaw = raw;
      cachedBookmarks = JSON.parse(raw);
    }
    return cachedBookmarks;
  } catch {
    return emptyBookmarks;
  }
}

function getBookmarksServerSnapshot(): string[] {
  return emptyBookmarks;
}

function subscribeCrew(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('bms_crew_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('bms_crew_change', callback);
  };
}

function getCrewSnapshot(): ProductionCrewMember[] {
  if (typeof window === 'undefined') return emptyCrew;
  try {
    const raw = localStorage.getItem('bms_crew') || '[]';
    if (raw !== cachedCrewRaw) {
      cachedCrewRaw = raw;
      cachedCrew = JSON.parse(raw);
    }
    return cachedCrew;
  } catch {
    return emptyCrew;
  }
}

function getCrewServerSnapshot(): ProductionCrewMember[] {
  return emptyCrew;
}

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const bookmarkedIds = useSyncExternalStore(
    subscribeBookmarks,
    getBookmarksSnapshot,
    getBookmarksServerSnapshot
  );

  const selectedCrew = useSyncExternalStore(
    subscribeCrew,
    getCrewSnapshot,
    getCrewServerSnapshot
  );

  const toggleBookmark = (id: string) => {
    const current = getBookmarksSnapshot();
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    try {
      localStorage.setItem('bms_bookmarks', JSON.stringify(next));
      window.dispatchEvent(new Event('bms_bookmarks_change'));
    } catch {
      // Ignore localStorage quotas
    }
  };

  const isBookmarked = (id: string) => bookmarkedIds.includes(id);

  const toggleCrew = (member: ProductionCrewMember) => {
    const current = getCrewSnapshot();
    const exists = current.some((m) => m.id === member.id);
    const next = exists ? current.filter((m) => m.id !== member.id) : [...current, member];
    try {
      localStorage.setItem('bms_crew', JSON.stringify(next));
      window.dispatchEvent(new Event('bms_crew_change'));
    } catch {
      // Ignore localStorage quotas
    }
  };

  const removeCrew = (id: string) => {
    const current = getCrewSnapshot();
    const next = current.filter((m) => m.id !== id);
    try {
      localStorage.setItem('bms_crew', JSON.stringify(next));
      window.dispatchEvent(new Event('bms_crew_change'));
    } catch {
      // Ignore localStorage quotas
    }
  };

  const clearCrew = () => {
    try {
      localStorage.setItem('bms_crew', JSON.stringify([]));
      window.dispatchEvent(new Event('bms_crew_change'));
    } catch {
      // Ignore localStorage quotas
    }
  };

  const isCrewSelected = (id: string) => selectedCrew.some((m) => m.id === id);

  return (
    <MarketplaceContext.Provider
      value={{
        bookmarkedIds,
        selectedCrew,
        toggleBookmark,
        isBookmarked,
        toggleCrew,
        removeCrew,
        clearCrew,
        isCrewSelected,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}

