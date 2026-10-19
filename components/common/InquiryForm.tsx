'use client';

import React, { useState } from 'react';
import { CheckCircleIcon } from '@/components/ui/Icons';

interface InquiryFormProps {
  itemTitle: string;
  itemType: 'studio' | 'location' | 'crew' | 'equipment';
  dayRate: number;
}

export function InquiryForm({ itemTitle, itemType, dayRate }: InquiryFormProps) {
  const [shootDate, setShootDate] = useState('2026-11-18');
  const [shiftHours, setShiftHours] = useState('10');
  const [productionName, setProductionName] = useState('');
  const [producerEmail, setProducerEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const calculateTotal = () => {
    if (shiftHours === '5') return Math.round(dayRate * 0.6);
    if (shiftHours === '12') return Math.round(dayRate * 1.25);
    return dayRate;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-[#181818] rounded-2xl border border-slate-200/90 dark:border-[#303030] shadow-sm p-5 sm:p-6 sticky top-24">
      {submitted ? (
        <div className="py-6 text-center space-y-3 animate-in fade-in duration-200">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800/40">
            <CheckCircleIcon className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5]">
            Hold Inquiry Dispatched
          </h4>
          <p className="text-xs text-slate-500 dark:text-[#8A8A8A] leading-relaxed">
            Your production hold request for <span className="font-semibold text-slate-800 dark:text-[#F5F5F5]">{itemTitle}</span> has been logged under inquiry reference:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-[#202020] rounded-xl font-mono text-[11px] text-slate-700 dark:text-[#B3B3B3] font-bold border border-slate-100 dark:border-[#303030]">
            #BMS-{itemType.toUpperCase()}-HOLD-9182
          </div>
          <div className="pt-2 text-[10px] bg-amber-50/60 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200/60 dark:border-amber-800/40 text-amber-800 dark:text-amber-400">
            Notice: This is a frontend demonstration. No charge has been made and real calendar availability requires verified production dispatch.
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-2 text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] hover:text-black dark:hover:text-white underline cursor-pointer"
          >
            Submit Another Date Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
              PRODUCTION RESERVATION &amp; QUOTE
            </span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 dark:text-[#F5F5F5]">
                ${dayRate.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 dark:text-[#8A8A8A] font-medium">/ 10h Standard Day</span>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-[#303030]">
            <div>
              <label htmlFor="shootDateInput" className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                Target Shoot Date
              </label>
              <input
                id="shootDateInput"
                type="date"
                required
                value={shootDate}
                onChange={(e) => setShootDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#202020] text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981]"
              />
            </div>

            <div>
              <label htmlFor="shiftSelect" className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                Shift Length
              </label>
              <select
                id="shiftSelect"
                value={shiftHours}
                onChange={(e) => setShiftHours(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#202020] text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981]"
              >
                <option value="10">10h Full Production Day (100% Rate)</option>
                <option value="5">5h Half Day (60% Rate)</option>
                <option value="12">12h Commercial Overnight (125% Rate)</option>
              </select>
            </div>

            <div>
              <label htmlFor="prodNameInput" className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                Production / Project Title
              </label>
              <input
                id="prodNameInput"
                type="text"
                required
                placeholder="e.g. Commercial Brand Campaign"
                value={productionName}
                onChange={(e) => setProductionName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#202020] text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981]"
              />
            </div>

            <div>
              <label htmlFor="emailInput" className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                Producer Call Sheet Email
              </label>
              <input
                id="emailInput"
                type="email"
                required
                placeholder="producer@agency.com"
                value={producerEmail}
                onChange={(e) => setProducerEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#202020] text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981]"
              />
            </div>
          </div>

          {/* Subtotal preview */}
          <div className="p-3 bg-slate-50 dark:bg-[#202020] rounded-xl space-y-1 text-xs border border-slate-100 dark:border-[#303030]">
            <div className="flex justify-between text-slate-500 dark:text-[#8A8A8A]">
              <span>Estimated Shift Rate</span>
              <span className="font-semibold text-slate-800 dark:text-[#F5F5F5]">${calculateTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-[#8A8A8A]">
              <span>$2M Direct Policy Endorsement</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">Included ($0)</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-[#303030] flex justify-between font-extrabold text-slate-900 dark:text-[#F5F5F5]">
              <span>Quote Total</span>
              <span className="text-sm font-black">${calculateTotal().toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-black dark:bg-[#F5F5F5] hover:bg-slate-800 dark:hover:bg-white text-white dark:text-[#101010] text-xs font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            Request Date Hold &amp; Quote
          </button>

          <p className="text-[10px] text-slate-400 dark:text-[#8A8A8A] text-center leading-tight">
            Automated COI certificate &amp; facility load-in instructions delivered within 2 hours of hold verification.
          </p>
        </form>
      )}
    </div>
  );
}

