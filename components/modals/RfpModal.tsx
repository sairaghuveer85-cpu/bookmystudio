'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircleIcon } from '@/components/ui/Icons';

interface RfpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RfpModal({ isOpen, onClose }: RfpModalProps) {
  const [productionName, setProductionName] = useState('');
  const [powerNeeded, setPowerNeeded] = useState('600A 3-Phase Camlock');
  const [needPermits, setNeedPermits] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-overlay-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#181818] text-slate-900 dark:text-[#F5F5F5] rounded-3xl border border-slate-200 dark:border-[#303030] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto animate-modal-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rfp-title"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] text-slate-500 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer"
          aria-label="Close RFP modal"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800/40">
              <CheckCircleIcon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-[#F5F5F5]">
              Stage RFP Submitted
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#8A8A8A] max-w-sm mx-auto">
              Our Facility Coordination team has received your production parameters. A dedicated stage engineer will contact your production coordinator within 2 hours.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] text-xs font-bold hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-5"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
                FACILITY COORDINATION DESK
              </span>
              <h3 id="rfp-title" className="text-xl font-extrabold text-slate-900 dark:text-[#F5F5F5] mt-0.5">
                Submit Production Stage RFP
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#8A8A8A] mt-1">
                For commercial shoots requiring multi-day pre-rigging, generator tie-ins, heavy truss load calculations, or DOB street permits.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                  Production or Agency Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anonymous Content / Nike Campaign"
                  value={productionName}
                  onChange={(e) => setProductionName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#202020] text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#8A8A8A] text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] mb-1">
                  Estimated Power Distribution Requirement
                </label>
                <select
                  value={powerNeeded}
                  onChange={(e) => setPowerNeeded(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#303030] text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-[#10B981] focus:outline-none bg-white dark:bg-[#202020] text-slate-900 dark:text-[#F5F5F5]"
                >
                  <option>300A 3-Phase Camlock</option>
                  <option>600A 3-Phase Camlock</option>
                  <option>1200A Twin-Pack Generator Tap</option>
                  <option>Standard 100A Wall Circuit Only</option>
                </select>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-[#F5F5F5]">NYC DOB / City Street Filming Permits</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#8A8A8A]">Need curb parking posting &amp; generator permits</div>
                </div>
                <input
                  type="checkbox"
                  checked={needPermits}
                  onChange={(e) => setNeedPermits(e.target.checked)}
                  className="w-4 h-4 rounded text-slate-900 dark:text-emerald-500 focus:ring-slate-900 dark:focus:ring-emerald-500 accent-slate-900 dark:accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-black dark:bg-[#F5F5F5] hover:bg-slate-800 dark:hover:bg-white text-white dark:text-[#101010] font-bold text-xs transition-colors cursor-pointer"
              >
                Submit Stage RFP
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="py-3 px-4 rounded-xl border border-slate-200 dark:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#262626] text-slate-600 dark:text-[#B3B3B3] text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
