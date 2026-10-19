'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import {
  ShieldPolicyIcon,
  CheckCircleIcon,
  ZapIcon,
  TruckIcon,
} from '@/components/ui/Icons';

export default function ListYourStudioPage() {
  // Calculator State
  const [dayRate, setDayRate] = useState(1400);
  const [bookedDays, setBookedDays] = useState(12);

  const monthlyGross = dayRate * bookedDays;
  const platformFee = Math.round(monthlyGross * 0.10);
  const netMonthlyPayout = monthlyGross - platformFee;
  const projectedAnnual = netMonthlyPayout * 12;

  // Form State
  const [stageName, setStageName] = useState('');
  const [address, setAddress] = useState('');
  const [cityNeighborhood, setCityNeighborhood] = useState('Greenpoint, Brooklyn');
  const [squareFeet, setSquareFeet] = useState('3200');
  const [ceilingHeight, setCeilingHeight] = useState('18');
  const [stageType, setStageType] = useState('White Cyc & Soundstage');
  const [camlockPower, setCamlockPower] = useState('600A 3-Phase Camlock');
  const [driveInAccess, setDriveInAccess] = useState('Yes (14ft Roll-up Gate)');
  const [soundproofing, setSoundproofing] = useState('STC 60 Certified Silent');
  const [hostRate, setHostRate] = useState('1400');
  const [cycRepaintFee, setCycRepaintFee] = useState('350');
  const [hostName, setHostName] = useState('');
  const [hostCompany, setHostCompany] = useState('');
  const [hostEmail, setHostEmail] = useState('');
  const [hostPhone, setHostPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="py-8 bg-white dark:bg-[#101010] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'List Your Studio' },
          ]}
          className="mb-6"
        />

        {/* Hero Section */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#8A8A8A]">
              STUDIO HOST NETWORK
            </span>
          </div>

          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5] leading-tight">
            Turn Your Production Stage Into Predictable Commercial Revenue
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-[#B3B3B3] leading-relaxed">
            BookMyStudio connects verified commercial cycloramas, soundstages, and daylight lofts with tier-one advertising agencies, streaming productions, and union DPs.
          </p>

          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <ShieldPolicyIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>$2,000,000 Direct Liability Insurance on Every Shoot</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] text-xs font-semibold">
              <span>Next-Day ACH Direct Deposit</span>
            </span>
          </div>
        </div>

        {/* Interactive Earnings Calculator Section */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Interactive Controls (Span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                  HOST EARNINGS MODELER
                </span>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight">
                  Estimate Your Monthly Stage Payout
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Adjust your 10-hour day rate and average monthly booked days to project net revenue after our transparent 10% platform fee.
                </p>
              </div>

              {/* Slider 1: 10-hr Day Rate */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-300">Standard 10-Hour Commercial Day Rate</span>
                  <span className="text-base font-extrabold text-white">${dayRate.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={600}
                  max={4500}
                  step={50}
                  value={dayRate}
                  onChange={(e) => setDayRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>$600 (Daylight Loft)</span>
                  <span>$2,500 (Commercial Cyc)</span>
                  <span>$4,500+ (Full Soundstage)</span>
                </div>
              </div>

              {/* Slider 2: Booked Days per Month */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-300">Estimated Booked Days / Month</span>
                  <span className="text-base font-extrabold text-white">{bookedDays} Days</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={24}
                  step={1}
                  value={bookedDays}
                  onChange={(e) => setBookedDays(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>2 Days (Part-Time)</span>
                  <span>12 Days (Average Commercial Hub)</span>
                  <span>24 Days (High Demand)</span>
                </div>
              </div>
            </div>

            {/* Right: Revenue Breakdown Card (Span 5) */}
            <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700/80 rounded-xl p-6 space-y-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Projected Net Monthly Payout
              </span>

              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                ${netMonthlyPayout.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 ml-1.5">/month</span>
              </div>

              <div className="pt-4 border-t border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Gross Shoot Bookings</span>
                  <span className="text-white font-medium">${monthlyGross.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>BookMyStudio Fee (10%)</span>
                  <span className="text-white font-medium">-${platformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Insurance &amp; COI Endorsement</span>
                  <span className="text-emerald-400 font-semibold">Included ($0)</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex justify-between font-bold text-slate-200">
                  <span>Projected Annual Revenue</span>
                  <span className="text-white">${projectedAnnual.toLocaleString()}</span>
                </div>
              </div>

              <a
                href="#onboarding-form"
                className="block text-center w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
              >
                Apply to List This Stage
              </a>
            </div>

          </div>
        </div>

        {/* Host Protections & Guarantees Grid */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-[#F5F5F5] tracking-tight">
              Enterprise Host Protections on Every Booking
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-[#8A8A8A]">
              Unlike generic peer-to-peer venues, BookMyStudio was architected from the ground up to protect high-investment production facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#181818]">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3">
                <ShieldPolicyIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5]">
                $2M Direct Production COI
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#B3B3B3] leading-relaxed">
                Every booking generates an automated Certificate of Insurance naming your facility as Primary Additional Insured before load-in.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#181818]">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] flex items-center justify-center mb-3">
                <CheckCircleIcon className="w-5 h-5 text-slate-800 dark:text-[#F5F5F5]" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5]">
                Pre-Vetted Commercial Crews
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#B3B3B3] leading-relaxed">
                Zero parties or unvetted private events. We verify agency credentials, producer IDs, and production company EIN registrations.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#181818]">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] flex items-center justify-center mb-3">
                <ZapIcon className="w-5 h-5 text-slate-800 dark:text-[#F5F5F5]" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5]">
                Overtime &amp; Power Protection
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#B3B3B3] leading-relaxed">
                Automated overtime billing at 1.5x hourly rate after the 10-hour shoot mark, with clear cyc repaint and heavy camlock tie-in terms.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#181818]">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] flex items-center justify-center mb-3">
                <TruckIcon className="w-5 h-5 text-slate-800 dark:text-[#F5F5F5]" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5]">
                Next-Day Direct Payouts
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#B3B3B3] leading-relaxed">
                Guaranteed direct ACH deposit released within 24 hours of successful wrap, with zero holdbacks or lengthy billing cycles.
              </p>
            </div>
          </div>
        </div>

        {/* Onboarding Form */}
        <div id="onboarding-form" className="mt-20 max-w-3xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#262626] bg-white dark:bg-[#181818] shadow-sm">
            <div className="pb-6 border-b border-slate-100 dark:border-[#262626]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#8A8A8A]">
                  HOST APPLICATION
                </span>
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F5F5F5]">
                Submit Your Stage for Curation
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#8A8A8A]">
                Our architectural team reviews stage ceiling heights, electrical drops, and access doors within 1 business day.
              </p>
            </div>

            {isSubmitted ? (
              <div className="mt-6 p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-950 dark:text-emerald-300 space-y-3">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Studio Application Received!</span>
                </div>
                <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">
                  Thank you for submitting <strong className="font-semibold">{stageName || 'your studio space'}</strong> to the BookMyStudio network. Our facility curation director will contact you at <strong className="font-semibold">{hostEmail}</strong> within 24 hours to schedule an on-site technical inspection.
                </p>
                <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 text-[11px] text-emerald-700 dark:text-emerald-400">
                  <strong>Frontend Prototype Notice:</strong> This is a design-system onboarding demonstration. No actual database write was made.
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Submit Another Space
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                {/* Step 1: Stage Architecture */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F5F5F5] mb-3">
                    1. Space Architecture &amp; Dimensions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Stage / Studio Name
                      </label>
                      <input
                        type="text"
                        required
                        value={stageName}
                        onChange={(e) => setStageName(e.target.value)}
                        placeholder="e.g. Apex Stage C & Soundstage"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 180 West Street"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Neighborhood &amp; City
                      </label>
                      <input
                        type="text"
                        required
                        value={cityNeighborhood}
                        onChange={(e) => setCityNeighborhood(e.target.value)}
                        placeholder="e.g. Greenpoint, Brooklyn"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Total Square Footage
                      </label>
                      <input
                        type="number"
                        required
                        value={squareFeet}
                        onChange={(e) => setSquareFeet(e.target.value)}
                        placeholder="3200"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Ceiling Height (Clear to Grid)
                      </label>
                      <input
                        type="text"
                        required
                        value={ceilingHeight}
                        onChange={(e) => setCeilingHeight(e.target.value)}
                        placeholder="18 ft"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818]"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Technical Specifications */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#262626]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F5F5F5] mb-3">
                    2. Power, Acoustic &amp; Access Specs
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Camlock Power Capacity
                      </label>
                      <select
                        value={camlockPower}
                        onChange={(e) => setCamlockPower(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818] cursor-pointer"
                      >
                        <option value="600A 3-Phase Camlock">600A 3-Phase 120/208V</option>
                        <option value="1200A 3-Phase Camlock">1200A 3-Phase Heavy Soundstage</option>
                        <option value="400A 3-Phase Camlock">400A 3-Phase Camlock</option>
                        <option value="200A House Power Only">200A Standard Commercial Power</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Vehicular / Drive-In Access
                      </label>
                      <select
                        value={driveInAccess}
                        onChange={(e) => setDriveInAccess(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818] cursor-pointer"
                      >
                        <option value="Yes (14ft Roll-up Gate)">Yes (14ft Roll-up Gate / Direct Ground Floor)</option>
                        <option value="Freight Elevator (10,000 lbs)">Freight Elevator (10,000 lbs)</option>
                        <option value="Standard Freight Elevator">Standard Freight Elevator</option>
                        <option value="Stairs Only">Walk-Up / Stairs Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Acoustic Treatment
                      </label>
                      <select
                        value={soundproofing}
                        onChange={(e) => setSoundproofing(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818] cursor-pointer"
                      >
                        <option value="STC 60 Certified Silent">STC 60+ Certified Soundproof Stage</option>
                        <option value="Treated Dialogue Friendly">Acoustically Treated (Dialogue Friendly)</option>
                        <option value="Untreated Visual Only">Untreated (Muted / MOS Visual Only)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Primary Space Category
                      </label>
                      <select
                        value={stageType}
                        onChange={(e) => setStageType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818] cursor-pointer"
                      >
                        <option value="White Cyc & Soundstage">White Cyclorama &amp; Soundstage</option>
                        <option value="Natural Daylight Loft">Natural Daylight Loft</option>
                        <option value="Filming Location / Warehouse">Filming Location / Industrial Warehouse</option>
                        <option value="Culinary Kitchen Studio">Culinary Kitchen Studio</option>
                        <option value="Podcast & Broadcast Suite">Podcast &amp; Broadcast Suite</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 3: Base Rates & Repaint */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#262626]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F5F5F5] mb-3">
                    3. Commercial Day Rates &amp; Maintenance Fees
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        10-Hour Commercial Day Rate ($)
                      </label>
                      <input
                        type="number"
                        required
                        value={hostRate}
                        onChange={(e) => setHostRate(e.target.value)}
                        placeholder="1400"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Fresh Cyc White Repaint Fee ($)
                      </label>
                      <input
                        type="number"
                        required
                        value={cycRepaintFee}
                        onChange={(e) => setCycRepaintFee(e.target.value)}
                        placeholder="350"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818]"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 4: Host Contact */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#262626]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F5F5F5] mb-3">
                    4. Host &amp; Management Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Facility Manager / Host Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={hostName}
                        onChange={(e) => setHostName(e.target.value)}
                        placeholder="e.g. David Sterling"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Studio Entity / LLC Name
                      </label>
                      <input
                        type="text"
                        required
                        value={hostCompany}
                        onChange={(e) => setHostCompany(e.target.value)}
                        placeholder="e.g. Apex Stages LLC"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Direct Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={hostEmail}
                        onChange={(e) => setHostEmail(e.target.value)}
                        placeholder="david@apexstages.com"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                        Direct Contact Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={hostPhone}
                        onChange={(e) => setHostPhone(e.target.value)}
                        placeholder="(718) 555-0192"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-xs text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:bg-white dark:focus:bg-[#181818]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Submit Studio for Vetting &amp; Curation
                  </button>
                  <p className="mt-2 text-center text-[11px] text-slate-400 dark:text-[#8A8A8A]">
                    No onboarding fees. We verify floor plans and power specs prior to active listing.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
