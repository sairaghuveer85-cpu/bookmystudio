'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, CheckCircleIcon } from '@/components/ui/Icons';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';

export function AccountMenu() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { bookmarkedIds, selectedCrew } = useMarketplace();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Producer';
  const email = user?.email || '';
  const isEmailVerified = Boolean(user?.email_confirmed_at);
  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'P';

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Account Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545] bg-white dark:bg-[#181818] hover:bg-slate-50 dark:hover:bg-[#202020] transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
          {initials}
        </div>
        <div className="hidden sm:flex flex-col leading-tight max-w-[120px]">
          <span className="text-xs font-semibold text-slate-900 dark:text-[#F5F5F5] truncate">{fullName}</span>
          <span className="text-[10px] text-slate-500 dark:text-[#8A8A8A] font-medium truncate">
            {isEmailVerified ? 'Verified Producer' : 'Pending Verification'}
          </span>
        </div>
        <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400 dark:text-[#8A8A8A] ml-0.5" />
      </button>

      {/* Account Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#181818] rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200/90 dark:border-[#303030] p-3 z-50 animate-dropdown-in">
          {/* User Info Header */}
          <div className="px-2.5 py-2 border-b border-slate-100 dark:border-[#262626] mb-2">
            <p className="text-xs font-bold text-slate-900 dark:text-[#F5F5F5] truncate">{fullName}</p>
            <p className="text-[11px] text-slate-500 dark:text-[#8A8A8A] truncate">{email}</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              {isEmailVerified ? (
                <>
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">Verified Account</span>
                </>
              ) : (
                <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                  Email Verification Pending
                </span>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 text-xs">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-700 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020] font-medium transition-colors"
            >
              <span>Production Dashboard</span>
            </Link>

            <Link
              href="/saved"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-700 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020] font-medium transition-colors"
            >
              <span>Saved Listings</span>
              {bookmarkedIds.length > 0 && (
                <span className="text-[10px] bg-slate-200 dark:bg-[#262626] font-bold px-1.5 py-0.5 rounded-full text-slate-700 dark:text-[#F5F5F5]">
                  {bookmarkedIds.length}
                </span>
              )}
            </Link>

            <Link
              href="/crew-list"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-700 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020] font-medium transition-colors"
            >
              <span>Call Sheet Roster</span>
              {selectedCrew.length > 0 && (
                <span className="text-[10px] bg-slate-200 dark:bg-[#262626] font-bold px-1.5 py-0.5 rounded-full text-slate-700 dark:text-[#F5F5F5]">
                  {selectedCrew.length}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-700 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020] font-medium transition-colors"
            >
              <span>Account Profile</span>
            </Link>

            <Link
              href="/account/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-700 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020] font-medium transition-colors"
            >
              <span>Account Settings</span>
            </Link>

            <Link
              href="/list-your-studio"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-700 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020] font-medium transition-colors"
            >
              <span>List Your Studio Space</span>
            </Link>
          </div>

          {/* Sign Out Action */}
          <div className="pt-2 mt-2 border-t border-slate-100 dark:border-[#262626]">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
