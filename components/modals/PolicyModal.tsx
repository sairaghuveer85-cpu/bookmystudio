'use client';

import React, { useEffect } from 'react';
import { ShieldPolicyIcon, CheckCircleIcon } from '@/components/ui/Icons';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PolicyModal({ isOpen, onClose }: PolicyModalProps) {
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
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#181818] text-slate-900 dark:text-[#F5F5F5] rounded-3xl border border-slate-200 dark:border-[#303030] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto animate-modal-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] text-slate-500 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer"
          aria-label="Close insurance policy modal"
        >
          ✕
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-800/40">
              <ShieldPolicyIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                PRODUCTION ASSURANCE PROGRAM
              </span>
              <h3 id="policy-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-[#F5F5F5]">
                $2,000,000 Direct Production Liability &amp; COI Endorsement
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-[#8A8A8A] leading-relaxed">
            Every studio booked through BookMyStudio is backed by our standardized commercial production coverage. This replaces the traditional 48-hour manual certificate review with instant verified endorsements.
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] flex items-start gap-3">
              <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-[#F5F5F5]">Instant Automated COI Issuance</h4>
                <p className="text-[11px] text-slate-500 dark:text-[#8A8A8A] mt-0.5">
                  Named facility owner and stage manager are automatically endorsed as additional insured with waiver of subrogation within 60 seconds of checkout.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] flex items-start gap-3">
              <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-[#F5F5F5]">$2,000,000 Host Property Protection</h4>
                <p className="text-[11px] text-slate-500 dark:text-[#8A8A8A] mt-0.5">
                  Covers physical cyclorama coves, flooring, electrical Camlock panels, and structural overhead rigging trusses against set accidental damage.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] flex items-start gap-3">
              <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-[#F5F5F5]">Union &amp; Commercial Signatory Ready</h4>
                <p className="text-[11px] text-slate-500 dark:text-[#8A8A8A] mt-0.5">
                  Compliant with IATSE Local 52/600 and AICP standard commercial production guidelines.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-black dark:bg-[#F5F5F5] hover:bg-slate-800 dark:hover:bg-white text-white dark:text-[#101010] text-xs font-bold transition-colors cursor-pointer"
            >
              Close Policy Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

