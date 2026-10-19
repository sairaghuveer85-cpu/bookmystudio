'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LogoMark,
  GearCrateIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ShieldPolicyIcon,
} from '@/components/ui/Icons';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { AccountMenu } from '@/components/layout/AccountMenu';
import { PolicyModal } from '@/components/modals/PolicyModal';

const NAV_ITEMS = [
  { href: '/studios', label: 'Studios' },
  { href: '/locations', label: 'Locations' },
  { href: '/crew', label: 'Crew' },
  { href: '/equipment', label: 'Equipment' },
  { href: '/about', label: 'About' },
] as const;

export function Header() {
  const pathname = usePathname();
  const { selectedCrew, bookmarkedIds } = useMarketplace();
  const { user, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    height: number;
    top: number;
    opacity: number;
  }>({ left: 0, width: 0, height: 0, top: 0, opacity: 0 });

  const moreMenuRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const activeNavIndex = NAV_ITEMS.findIndex((item) => pathname.startsWith(item.href));

  const targetIndex = hoveredNavIndex !== null ? hoveredNavIndex : activeNavIndex;

  useEffect(() => {
    const updateIndicator = () => {
      if (targetIndex === -1 || !navItemRefs.current[targetIndex] || !navContainerRef.current) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const targetEl = navItemRefs.current[targetIndex];
      if (!targetEl) return;
      setIndicatorStyle({
        left: targetEl.offsetLeft,
        width: targetEl.offsetWidth,
        height: targetEl.offsetHeight,
        top: targetEl.offsetTop,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [targetIndex, pathname]);

  // Close "More" dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMoreMenuOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#101010]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-[#262626] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* ========================================================
               LEFT: Brand Logo & Wordmark
               ======================================================== */}
            <div className="flex items-center shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md p-1 group"
                aria-label="BookMyStudio Home"
              >
                <LogoMark className="w-7 h-7 transition-transform duration-200 group-hover:scale-105" />
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-[#F5F5F5] uppercase select-none">
                  BOOKMYSTUDIO
                </span>
              </Link>
            </div>

            {/* ========================================================
               CENTER: Primary Discovery Navigation (Sliding Pill Indicator)
               ======================================================== */}
            <nav
              className="hidden lg:flex items-center gap-1.5"
              aria-label="Primary Marketplace Navigation"
            >
              <div
                ref={navContainerRef}
                onMouseLeave={() => setHoveredNavIndex(null)}
                className="relative flex items-center p-1 rounded-full bg-slate-100/70 dark:bg-[#181818] border border-slate-200/70 dark:border-[#282828]"
              >
                {/* Hardware-accelerated sliding background indicator */}
                <div
                  className="absolute rounded-full bg-white dark:bg-[#252525] border border-slate-200/80 dark:border-[#383838] shadow-xs pointer-events-none transition-all duration-260 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    left: 0,
                    transform: `translateX(${indicatorStyle.left}px)`,
                    width: `${indicatorStyle.width}px`,
                    height: `${indicatorStyle.height}px`,
                    top: `${indicatorStyle.top}px`,
                    opacity: indicatorStyle.opacity,
                  }}
                />

                {NAV_ITEMS.map((item, idx) => {
                  const isCurrent = activeNavIndex === idx;
                  const isHovered = hoveredNavIndex === idx;
                  return (
                    <Link
                      key={item.href}
                      ref={(el) => {
                        navItemRefs.current[idx] = el;
                      }}
                      href={item.href}
                      onMouseEnter={() => setHoveredNavIndex(idx)}
                      className={`relative z-10 px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors duration-150 ${
                        isCurrent || isHovered
                          ? 'text-slate-900 dark:text-[#F5F5F5]'
                          : 'text-slate-600 dark:text-[#A0A0A0] hover:text-slate-900 dark:hover:text-[#F5F5F5]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Secondary More Menu for Instant COI & Host Services */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  type="button"
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    moreMenuOpen || isActive('/list-your-studio')
                      ? 'bg-slate-100 dark:bg-[#202020] text-slate-900 dark:text-[#F5F5F5]'
                      : 'text-slate-600 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] hover:bg-slate-50 dark:hover:bg-[#181818]'
                  }`}
                  aria-expanded={moreMenuOpen}
                  aria-haspopup="true"
                >
                  <span>More</span>
                  <ChevronDownIcon
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      moreMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* More Dropdown Menu */}
                {moreMenuOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-[#181818] rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200/90 dark:border-[#303030] p-2 z-50 animate-dropdown-in">
                    <button
                      type="button"
                      onClick={() => {
                        setMoreMenuOpen(false);
                        setIsPolicyOpen(true);
                      }}
                      className="w-full flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#202020] text-left transition-colors cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldPolicyIcon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-[#F5F5F5]">Instant COI Policy</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400">
                            $2M
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-[#8A8A8A] leading-snug mt-0.5">
                          Direct production liability certificates
                        </p>
                      </div>
                    </button>

                    <Link
                      href="/list-your-studio"
                      onClick={() => setMoreMenuOpen(false)}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#202020] text-left transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#262626] text-slate-700 dark:text-[#B3B3B3] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        +
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-[#F5F5F5]">List Your Studio</span>
                        <p className="text-[11px] text-slate-500 dark:text-[#8A8A8A] leading-snug mt-0.5">
                          Monetize stages &amp; lofts up to $18.5k/mo
                        </p>
                      </div>
                    </Link>

                    <div className="my-1 border-t border-slate-100 dark:border-[#262626]" />

                    <Link
                      href="/contact"
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-2.5 py-1.5 text-xs text-slate-600 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] rounded-lg transition-colors"
                    >
                      Production Support Desk
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* ========================================================
               RIGHT: Theme Toggle, Saved Items, Gear Crate & Auth Controls
               ======================================================== */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              
              {/* Theme Toggle (Desktop & Tablet) */}
              <ThemeToggle className="hidden sm:inline-flex" />

              {/* Saved Items Bookmark Link */}
              <Link
                href="/saved"
                className={`relative p-2 rounded-lg transition-all active:scale-90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isActive('/saved')
                    ? 'text-slate-900 dark:text-[#F5F5F5] bg-slate-100 dark:bg-[#202020]'
                    : 'text-slate-600 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#181818]'
                }`}
                aria-label={`Saved listings with ${bookmarkedIds.length} items`}
                title="Saved Listings"
              >
                <BookmarkIcon className="w-5 h-5" filled={bookmarkedIds.length > 0} />
                {bookmarkedIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold rounded-full bg-slate-900 dark:bg-emerald-600 text-white ring-2 ring-white dark:ring-[#101010] animate-scale-in">
                    {bookmarkedIds.length}
                  </span>
                )}
              </Link>

              {/* Gear Crate / Crew Roster Link */}
              <Link
                href="/crew-list"
                className={`relative p-2 rounded-lg transition-all active:scale-90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isActive('/crew-list')
                    ? 'text-slate-900 dark:text-[#F5F5F5] bg-slate-100 dark:bg-[#202020]'
                    : 'text-slate-600 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#181818]'
                }`}
                aria-label={`Gear crate with ${selectedCrew.length} crew members`}
                title="Crew Roster & Gear Crate"
              >
                <GearCrateIcon className="w-5 h-5" />
                <span
                  className={`absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold rounded-full transition-all ${
                    selectedCrew.length > 0
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white ring-2 ring-white dark:ring-[#101010] scale-100'
                      : 'bg-slate-200 dark:bg-[#262626] text-slate-600 dark:text-[#8A8A8A] scale-90'
                  }`}
                >
                  {selectedCrew.length}
                </span>
              </Link>

              {/* Auth-Aware Controls */}
              {user ? (
                <AccountMenu />
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-[#B3B3B3] hover:text-slate-900 dark:hover:text-[#F5F5F5] rounded-full hover:bg-slate-100 dark:hover:bg-[#181818] transition-colors whitespace-nowrap"
                  >
                    Log In
                  </Link>

                  <Link
                    href="/create-account"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-full transition-all duration-200 shadow-xs hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#181818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ========================================================
         MOBILE NAVIGATION SLIDE-OVER DRAWER (Refined & Accessible)
         ======================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-overlay-in transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container */}
          <div
            ref={drawerRef}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#141414] border-l border-slate-200 dark:border-[#262626] p-6 shadow-2xl overflow-y-auto animate-drawer-in flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#262626]">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 group"
                >
                  <LogoMark className="w-6 h-6" />
                  <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-[#F5F5F5] uppercase">
                    BOOKMYSTUDIO
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-[#8A8A8A] dark:hover:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020] cursor-pointer"
                  aria-label="Close Navigation"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Primary Navigation Links */}
              <div className="space-y-1">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8A8A8A] px-3 mb-1">
                  Marketplace Discovery
                </span>
                <Link
                  href="/studios"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-semibold rounded-xl ${
                    isActive('/studios')
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                      : 'text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020]'
                  }`}
                >
                  Production Studios
                </Link>
                <Link
                  href="/locations"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-semibold rounded-xl ${
                    isActive('/locations')
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                      : 'text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020]'
                  }`}
                >
                  Filming Locations
                </Link>
                <Link
                  href="/crew"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-semibold rounded-xl ${
                    isActive('/crew')
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                      : 'text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020]'
                  }`}
                >
                  Production Crew
                </Link>
                <Link
                  href="/equipment"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-semibold rounded-xl ${
                    isActive('/equipment')
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                      : 'text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020]'
                  }`}
                >
                  Equipment &amp; Grip Packages
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-semibold rounded-xl ${
                    isActive('/about')
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                      : 'text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020]'
                  }`}
                >
                  About BookMyStudio
                </Link>
              </div>

              {/* Production Tools & Guarantees */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-[#262626]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8A8A8A] px-3 mb-1">
                  Production Tools &amp; Host
                </span>
                <Link
                  href="/saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-xl ${
                    isActive('/saved')
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                      : 'text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020]'
                  }`}
                >
                  <span>Saved Listings</span>
                  <span className="text-xs bg-slate-200 dark:bg-[#262626] text-slate-800 dark:text-[#F5F5F5] px-2 py-0.5 rounded-full">
                    {bookmarkedIds.length}
                  </span>
                </Link>
                <Link
                  href="/crew-list"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-xl ${
                    isActive('/crew-list')
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                      : 'text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020]'
                  }`}
                >
                  <span>Call Sheet Gear Crate</span>
                  <span className="text-xs bg-slate-200 dark:bg-[#262626] text-slate-800 dark:text-[#F5F5F5] px-2 py-0.5 rounded-full">
                    {selectedCrew.length}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsPolicyOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020] rounded-xl cursor-pointer text-left"
                >
                  <span>Instant COI Guarantee</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400">
                    $2M DIRECT
                  </span>
                </button>
                <Link
                  href="/list-your-studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-800 dark:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#202020] rounded-xl"
                >
                  List Your Studio Space
                </Link>
              </div>

              {/* Theme Switcher in Mobile Drawer */}
              <div className="pt-2 border-t border-slate-100 dark:border-[#262626]">
                <ThemeToggle showLabel />
              </div>
            </div>

            {/* Bottom Auth Actions */}
            <div className="pt-6 border-t border-slate-100 dark:border-[#262626] space-y-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-600 rounded-xl"
                  >
                    Production Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      setMobileMenuOpen(false);
                      await signOut();
                    }}
                    className="w-full text-center py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 text-xs font-semibold text-slate-800 dark:text-[#F5F5F5] bg-slate-100 dark:bg-[#202020] hover:bg-slate-200 dark:hover:bg-[#262626] rounded-xl"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/create-account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 rounded-xl shadow-xs"
                  >
                    Get Started / Create Account
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Global Instant COI Modal */}
      <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
    </>
  );
}
