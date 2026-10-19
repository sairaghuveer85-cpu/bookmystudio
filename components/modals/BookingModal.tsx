'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StudioSpace } from '@/lib/types';
import { StarIcon, CheckCircleIcon } from '@/components/ui/Icons';

interface BookingModalProps {
  studio: StudioSpace | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ studio, isOpen, onClose }: BookingModalProps) {
  const [selectedShift, setSelectedShift] = useState<'10h' | '5h' | '12h'>('10h');
  const [addCamlock, setAddCamlock] = useState(false);
  const [addPreRig, setAddPreRig] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    setIsSubmitted(false);
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

  if (!isOpen || !studio) return null;

  const baseShiftPrice =
    selectedShift === '10h'
      ? studio.dayRate10h
      : selectedShift === '5h'
      ? Math.round(studio.dayRate10h * 0.6)
      : Math.round(studio.dayRate10h * 1.25);

  const addOnTotal = (addCamlock ? 350 : 0) + (addPreRig ? 500 : 0);
  const subtotal = baseShiftPrice + addOnTotal;
  const holdReferenceId = `#BMS-HOLD-${studio.id.replace('studio-', '').toUpperCase()}-8492`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-overlay-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#181818] text-slate-900 dark:text-[#F5F5F5] rounded-3xl border border-slate-200 dark:border-[#303030] shadow-2xl p-6 sm:p-7 overflow-hidden max-h-[90vh] overflow-y-auto animate-modal-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] text-slate-500 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer"
          aria-label="Close booking modal"
        >
          ✕
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800/40">
              <CheckCircleIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-[#F5F5F5]">
              Production Date Hold Requested
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#8A8A8A] max-w-sm mx-auto leading-relaxed">
              Your shoot shift inquiry for <span className="font-semibold text-slate-800 dark:text-[#F5F5F5]">{studio.name}</span> has been dispatched to the on-site Facility Stage Manager.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-[#202020] rounded-xl text-xs font-mono text-slate-600 dark:text-[#B3B3B3] max-w-xs mx-auto border border-slate-200 dark:border-[#303030]">
              Hold Reference: {holdReferenceId}
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010] text-xs font-bold hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer"
            >
              Return to Studio Directory
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Header: Studio Summary */}
            <div className="flex gap-4 items-center pr-8">
              <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-[#262626] shrink-0 border border-slate-200 dark:border-[#303030]">
                <Image
                  src={studio.imageUrl}
                  alt={studio.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
                  {studio.categoryLabel}
                </span>
                <h3 id="booking-title" className="text-sm sm:text-base font-bold text-slate-900 dark:text-[#F5F5F5] line-clamp-1">
                  {studio.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#8A8A8A] mt-0.5">
                  <span>{studio.location}</span>
                  <span>·</span>
                  <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-[#F5F5F5]">
                    <StarIcon className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{studio.rating.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shift Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-[#B3B3B3] uppercase tracking-wider mb-2">
                Select Shoot Shift
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedShift('10h')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedShift === '10h'
                      ? 'border-slate-900 dark:border-[#10B981] bg-slate-900 dark:bg-[#10B981]/15 text-white dark:text-[#10B981] shadow-xs'
                      : 'border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#202020] hover:bg-white dark:hover:bg-[#262626] text-slate-700 dark:text-[#B3B3B3]'
                  }`}
                >
                  <div className="text-xs font-bold">10h Full Day</div>
                  <div className={`text-[10px] mt-0.5 ${selectedShift === '10h' ? 'text-slate-300 dark:text-[#10B981]/80' : 'text-slate-500 dark:text-[#8A8A8A]'}`}>
                    ${studio.dayRate10h.toLocaleString()}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedShift('5h')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedShift === '5h'
                      ? 'border-slate-900 dark:border-[#10B981] bg-slate-900 dark:bg-[#10B981]/15 text-white dark:text-[#10B981] shadow-xs'
                      : 'border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#202020] hover:bg-white dark:hover:bg-[#262626] text-slate-700 dark:text-[#B3B3B3]'
                  }`}
                >
                  <div className="text-xs font-bold">5h Half Day</div>
                  <div className={`text-[10px] mt-0.5 ${selectedShift === '5h' ? 'text-slate-300 dark:text-[#10B981]/80' : 'text-slate-500 dark:text-[#8A8A8A]'}`}>
                    ${Math.round(studio.dayRate10h * 0.6).toLocaleString()}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedShift('12h')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedShift === '12h'
                      ? 'border-slate-900 dark:border-[#10B981] bg-slate-900 dark:bg-[#10B981]/15 text-white dark:text-[#10B981] shadow-xs'
                      : 'border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#202020] hover:bg-white dark:hover:bg-[#262626] text-slate-700 dark:text-[#B3B3B3]'
                  }`}
                >
                  <div className="text-xs font-bold">12h Overnight</div>
                  <div className={`text-[10px] mt-0.5 ${selectedShift === '12h' ? 'text-slate-300 dark:text-[#10B981]/80' : 'text-slate-500 dark:text-[#8A8A8A]'}`}>
                    ${Math.round(studio.dayRate10h * 1.25).toLocaleString()}
                  </div>
                </button>
              </div>
            </div>

            {/* Optional Facility Add-ons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-[#B3B3B3] uppercase tracking-wider mb-2">
                Facility &amp; Power Add-ons
              </label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50/50 dark:bg-[#202020]/50 hover:bg-slate-50 dark:hover:bg-[#202020] cursor-pointer">
                  <div className="text-xs">
                    <span className="font-semibold text-slate-800 dark:text-[#F5F5F5]">3-Phase 400A Camlock Subpanel Drop</span>
                    <span className="block text-[11px] text-slate-500 dark:text-[#8A8A8A]">Direct heavy lighting power tie-in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-[#B3B3B3]">+$350</span>
                    <input
                      type="checkbox"
                      checked={addCamlock}
                      onChange={(e) => setAddCamlock(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-900 dark:text-emerald-500 focus:ring-slate-900 dark:focus:ring-emerald-500 accent-slate-900 dark:accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50/50 dark:bg-[#202020]/50 hover:bg-slate-50 dark:hover:bg-[#202020] cursor-pointer">
                  <div className="text-xs">
                    <span className="font-semibold text-slate-800 dark:text-[#F5F5F5]">Facility Pre-Rigging Technician</span>
                    <span className="block text-[11px] text-slate-500 dark:text-[#8A8A8A]">2-hour early call for overhead truss pre-hang</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-[#B3B3B3]">+$500</span>
                    <input
                      type="checkbox"
                      checked={addPreRig}
                      onChange={(e) => setAddPreRig(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-900 dark:text-emerald-500 focus:ring-slate-900 dark:focus:ring-emerald-500 accent-slate-900 dark:accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Price Quote Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-[#8A8A8A]">
                <span>Shift Facility Fee ({selectedShift})</span>
                <span className="font-medium text-slate-900 dark:text-[#F5F5F5]">${baseShiftPrice.toLocaleString()}</span>
              </div>
              {addOnTotal > 0 && (
                <div className="flex justify-between text-slate-600 dark:text-[#8A8A8A]">
                  <span>Selected Power &amp; Rigging Add-ons</span>
                  <span className="font-medium text-slate-900 dark:text-[#F5F5F5]">+${addOnTotal}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-[#8A8A8A]">
                <span>Direct Production Liability Insurance</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Included ($0)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-[#303030] flex justify-between items-baseline text-sm font-extrabold text-slate-900 dark:text-[#F5F5F5]">
                <span>Estimated Shift Subtotal</span>
                <span className="text-base font-black">${subtotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
                className="flex-1 py-3 rounded-xl bg-black dark:bg-[#F5F5F5] hover:bg-slate-800 dark:hover:bg-white text-white dark:text-[#101010] font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
              >
                Request Production Date Hold
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="py-3 px-4 rounded-xl border border-slate-200 dark:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#262626] text-slate-600 dark:text-[#B3B3B3] text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
