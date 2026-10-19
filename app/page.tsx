'use client';

import React, { useState } from 'react';
import { HeroSearch } from '@/components/search/HeroSearch';
import { MarketplaceDiscoveryCards } from '@/components/categories/MarketplaceDiscoveryCards';
import { HowItWorks } from '@/components/home/HowItWorks';
import { FacilityComparison } from '@/components/comparison/FacilityComparison';
import { HostBanner } from '@/components/host/HostBanner';
import { FinalCta } from '@/components/home/FinalCta';

import { EarningsCalculatorModal } from '@/components/modals/EarningsCalculatorModal';
import { CrewCartDrawer } from '@/components/modals/CrewCartDrawer';
import { PolicyModal } from '@/components/modals/PolicyModal';
import { MobileDiscoveryView } from '@/components/home/MobileDiscoveryView';
import { MobileSearchModal } from '@/components/search/MobileSearchModal';

import { SHIFT_OPTIONS } from '@/lib/data';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function Home() {
  const {
    selectedCrew,
    removeCrew,
    clearCrew,
  } = useMarketplace();

  // Search and filter state
  const [selectedLocation, setSelectedLocation] = useState('Greenpoint & Brooklyn Navy Yard');
  const [selectedStageType, setSelectedStageType] = useState('White Cyc & Infinity Cove');
  const [selectedShift, setSelectedShift] = useState(SHIFT_OPTIONS[0]);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);

  // Modals state
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Host earnings calculated state
  const [hostPayout, setHostPayout] = useState(14800);
  const [hostDays, setHostDays] = useState(12);
  const [hostDayRate, setHostDayRate] = useState(1400);

  // Quick filter toggle handler
  const handleToggleQuickFilter = (filterKey: string) => {
    setActiveQuickFilters((prev) =>
      prev.includes(filterKey) ? prev.filter((k) => k !== filterKey) : [...prev, filterKey]
    );
  };

  return (
    <div className="flex flex-col min-h-full bg-[var(--bg-page)] dark:bg-[#101010] text-[var(--text-primary)] dark:text-[#F5F5F5] transition-colors duration-150">
      <main className="flex-1">
        {/* Mobile Discovery Experience (lg:hidden) */}
        <div className="lg:hidden">
          <MobileDiscoveryView
            onOpenSearch={() => setIsMobileSearchOpen(true)}
            onOpenPolicyModal={() => setIsPolicyOpen(true)}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        </div>

        {/* Desktop Sophisticated Marketplace Experience (hidden lg:block) */}
        <div className="hidden lg:block">
          {/* SECTION B: Hero Section with Segmented Search */}
          <HeroSearch
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            selectedStageType={selectedStageType}
            onSelectStageType={setSelectedStageType}
            selectedShift={selectedShift}
            onSelectShift={setSelectedShift}
            activeQuickFilters={activeQuickFilters}
            onToggleQuickFilter={handleToggleQuickFilter}
          />

          {/* SECTION C: Discovery Categories (6 Visual Category Cards) */}
          <MarketplaceDiscoveryCards />

          {/* SECTION E: How BookMyStudio Works (3-Step Commercial Workflow) */}
          <HowItWorks />

          {/* Facility Comparison Standards Table */}
          <FacilityComparison />

          {/* SECTION H: Studio Host Network & Earnings Modeler */}
          <HostBanner
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenPolicyModal={() => setIsPolicyOpen(true)}
            calculatedMonthlyPayout={hostPayout}
            calculatedDays={hostDays}
            calculatedDayRate={hostDayRate}
          />

          {/* SECTION I: Final Call to Action */}
          <FinalCta />
        </div>
      </main>

      <MobileSearchModal
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
      />

      {/* Interactive Exploration Modals */}
      <EarningsCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onApplyEstimate={(payout, days, rate) => {
          setHostPayout(payout);
          setHostDays(days);
          setHostDayRate(rate);
        }}
      />

      <CrewCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        selectedCrew={selectedCrew}
        onRemoveCrewMember={removeCrew}
        onClearCrew={clearCrew}
      />

      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />
    </div>
  );
}
