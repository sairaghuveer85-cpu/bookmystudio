'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { ProductionCrewMember } from '@/lib/types';
import { StarIcon } from '@/components/ui/Icons';

interface CrewCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCrew: ProductionCrewMember[];
  onRemoveCrewMember: (id: string) => void;
  onClearCrew: () => void;
}

export function CrewCartDrawer({
  isOpen,
  onClose,
  selectedCrew,
  onRemoveCrewMember,
  onClearCrew,
}: CrewCartDrawerProps) {
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

  const totalCrewDaily = selectedCrew.reduce((acc, m) => acc + m.dayRate10h, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-overlay-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md h-full bg-white dark:bg-[#181818] text-slate-900 dark:text-[#F5F5F5] shadow-2xl flex flex-col justify-between overflow-hidden border-l border-slate-200 dark:border-[#303030] animate-drawer-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-[#303030] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
              CALL SHEET GEAR CRATE
            </span>
            <h3 id="cart-title" className="text-base font-extrabold text-slate-900 dark:text-[#F5F5F5]">
              Selected Heads of Department ({selectedCrew.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] text-slate-600 dark:text-[#B3B3B3] flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer"
            aria-label="Close crew crate"
          >
            ✕
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {selectedCrew.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-[#262626] flex items-center justify-center text-slate-400 dark:text-[#8A8A8A]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-[#F5F5F5]">Your Crew Crate is Empty</p>
              <p className="text-xs text-slate-500 dark:text-[#8A8A8A] max-w-xs mx-auto">
                Explore the Call Sheet Roster below to add verified Gaffers, DPs, Sound Mixers, and Stylists to your shoot.
              </p>
            </div>
          ) : (
            selectedCrew.map((member) => (
              <div
                key={member.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50/50 dark:bg-[#202020]/50 flex gap-3.5 items-center justify-between"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-200 dark:bg-[#262626] shrink-0">
                  <Image
                    src={member.imageUrl}
                    alt={member.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A] block">
                    {member.role}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-[#F5F5F5] truncate">
                      {member.name}
                    </span>
                    <div className="flex items-center text-[10px] font-semibold text-slate-800 dark:text-[#F5F5F5]">
                      <StarIcon className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                      <span>{member.rating}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-[#F5F5F5] block mt-0.5">
                    ${member.dayRate10h} <span className="text-[10px] font-normal text-slate-500 dark:text-[#8A8A8A]">/ 10h Day</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveCrewMember(member.id)}
                  className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold p-1.5 cursor-pointer"
                  title="Remove from roster"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {selectedCrew.length > 0 && (
          <div className="p-5 border-t border-slate-100 dark:border-[#303030] bg-slate-50 dark:bg-[#202020] space-y-3">
            <div className="flex items-baseline justify-between text-xs text-slate-600 dark:text-[#8A8A8A]">
              <span>Total Crew Rate (10h Shift)</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-[#F5F5F5]">
                ${totalCrewDaily.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  alert(`Call sheet dispatch request sent for ${selectedCrew.length} heads of department!`);
                  onClearCrew();
                  onClose();
                }}
                className="flex-1 py-3 rounded-xl bg-black dark:bg-[#F5F5F5] hover:bg-slate-800 dark:hover:bg-white text-white dark:text-[#101010] text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Dispatch Call Sheet Roster
              </button>
              <button
                type="button"
                onClick={onClearCrew}
                className="py-3 px-3 rounded-xl border border-slate-200 dark:border-[#303030] hover:bg-white dark:hover:bg-[#262626] text-slate-600 dark:text-[#B3B3B3] text-xs font-semibold cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

