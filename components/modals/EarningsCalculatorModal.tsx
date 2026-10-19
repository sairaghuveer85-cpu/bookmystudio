'use client';

import React, { useState, useEffect } from 'react';

interface EarningsCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyEstimate: (monthlyPayout: number, days: number, dayRate: number) => void;
}

export function EarningsCalculatorModal({
  isOpen,
  onClose,
  onApplyEstimate,
}: EarningsCalculatorModalProps) {
  const [dayRate, setDayRate] = useState(1400);
  const [daysPerMonth, setDaysPerMonth] = useState(12);
  const [includeGripAddon, setIncludeGripAddon] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const gripAddonMonthly = includeGripAddon ? 2000 : 0;
  const grossMonthly = (dayRate * daysPerMonth) + gripAddonMonthly;
  const hostCommission = grossMonthly * 0.045; // 4.5% commission
  const netEstimatedPayout = Math.round(grossMonthly - hostCommission);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-overlay-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#181818] text-slate-900 dark:text-[#F5F5F5] rounded-3xl border border-slate-200 dark:border-[#303030] shadow-2xl p-6 sm:p-8 overflow-hidden animate-modal-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calculator-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-[#262626] text-slate-500 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer"
          aria-label="Close calculator"
        >
          ✕
        </button>

        <div className="space-y-6">
          
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              STUDIO HOST ESTIMATOR
            </span>
            <h3 id="calculator-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-[#F5F5F5] mt-1">
              Calculate Your Studio&apos;s Monthly Revenue
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#8A8A8A] mt-1">
              Adjust your 10-hour day rate and expected commercial booking volume to estimate monthly host revenue.
            </p>
          </div>

          {/* Slider 1: 10hr Day Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="dayRateSlider" className="font-semibold text-slate-700 dark:text-[#B3B3B3]">
                Studio 10hr Day Rate
              </label>
              <span className="font-extrabold text-slate-900 dark:text-[#F5F5F5] text-base">
                ${dayRate.toLocaleString()} <span className="text-xs font-normal text-slate-500 dark:text-[#8A8A8A]">/ day</span>
              </span>
            </div>
            <input
              id="dayRateSlider"
              type="range"
              min="500"
              max="4000"
              step="50"
              value={dayRate}
              onChange={(e) => setDayRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#303030] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-[#8A8A8A] font-mono">
              <span>$500</span>
              <span>$2,000</span>
              <span>$4,000</span>
            </div>
          </div>

          {/* Slider 2: Booking Days Per Month */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="daysSlider" className="font-semibold text-slate-700 dark:text-[#B3B3B3]">
                Booked Production Days / Month
              </label>
              <span className="font-extrabold text-slate-900 dark:text-[#F5F5F5] text-base">
                {daysPerMonth} <span className="text-xs font-normal text-slate-500 dark:text-[#8A8A8A]">days</span>
              </span>
            </div>
            <input
              id="daysSlider"
              type="range"
              min="1"
              max="24"
              step="1"
              value={daysPerMonth}
              onChange={(e) => setDaysPerMonth(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#303030] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-[#8A8A8A] font-mono">
              <span>1 day</span>
              <span>12 days (avg)</span>
              <span>24 days</span>
            </div>
          </div>

          {/* Toggle: Grip & Lighting Package */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030]">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-[#F5F5F5]">In-House Lighting &amp; Grip Add-on</div>
              <div className="text-[11px] text-slate-500 dark:text-[#8A8A8A]">Include pre-rigged lighting or C-stands packages (+$2,000/mo)</div>
            </div>
            <input
              type="checkbox"
              checked={includeGripAddon}
              onChange={(e) => setIncludeGripAddon(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Calculation Payout Result Card */}
          <div className="p-4 rounded-2xl bg-slate-900 dark:bg-[#202020] text-white border border-slate-800 dark:border-[#303030]">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Estimated Net Host Payout
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                ${netEstimatedPayout.toLocaleString()}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400 space-y-1 border-t border-slate-800 dark:border-[#303030] pt-2">
              <div className="flex justify-between">
                <span>Gross Stage Revenue ({daysPerMonth} days × ${dayRate})</span>
                <span className="text-slate-200">${(dayRate * daysPerMonth).toLocaleString()}</span>
              </div>
              {includeGripAddon && (
                <div className="flex justify-between">
                  <span>Grip &amp; Lighting Revenue</span>
                  <span className="text-slate-200">+$2,000</span>
                </div>
              )}
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Platform commission (4.5% on confirmed wraps)</span>
                <span>-${Math.round(hostCommission).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onApplyEstimate(netEstimatedPayout, daysPerMonth, dayRate);
                onClose();
              }}
              className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-sm text-center"
            >
              Apply to Host Banner
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-xl border border-slate-200 dark:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#262626] text-slate-700 dark:text-[#B3B3B3] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

