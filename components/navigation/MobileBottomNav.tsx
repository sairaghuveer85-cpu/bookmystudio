'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CompassIcon,
  StagesGridIcon,
  BookmarkIcon,
  ClapperboardIcon,
  UserIcon,
} from '@/components/ui/Icons';
import { useMarketplace } from '@/context/MarketplaceContext';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { bookmarkedIds, selectedCrew } = useMarketplace();

  // Hide on authentication workflows to keep sign-in/registration distraction-free
  const isAuthScreen =
    pathname === '/login' ||
    pathname === '/create-account' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password' ||
    pathname === '/verify-email';

  if (isAuthScreen) {
    return null;
  }

  const navItems = [
    {
      label: 'Discover',
      href: '/',
      icon: CompassIcon,
      isActive: pathname === '/',
    },
    {
      label: 'Explore',
      href: '/studios',
      icon: StagesGridIcon,
      isActive:
        pathname.startsWith('/studios') ||
        pathname.startsWith('/locations') ||
        pathname.startsWith('/equipment') ||
        pathname.startsWith('/search'),
    },
    {
      label: 'Saved',
      href: '/saved',
      icon: BookmarkIcon,
      isActive: pathname.startsWith('/saved'),
      badge: bookmarkedIds.length > 0 ? bookmarkedIds.length : null,
    },
    {
      label: 'Crew',
      href: '/crew',
      icon: ClapperboardIcon,
      isActive: pathname.startsWith('/crew'),
      badge: selectedCrew.length > 0 ? selectedCrew.length : null,
    },
    {
      label: 'Profile',
      href: '/account',
      icon: UserIcon,
      isActive: pathname.startsWith('/account') || pathname.startsWith('/dashboard'),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-[#262626] safe-area-bottom shadow-[0_-4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.45)] lg:hidden select-none transition-colors duration-200"
    >
      <div className="grid grid-cols-5 h-15 max-w-md mx-auto items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center h-full w-full py-1 group transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                active
                  ? 'text-slate-900 dark:text-emerald-400 font-semibold'
                  : 'text-slate-500 dark:text-[#8A8A8A] hover:text-slate-800 dark:hover:text-[#F5F5F5] font-medium'
              }`}
            >
              {/* Active top pill indicator */}
              {active && (
                <span className="absolute top-0 w-8 h-0.5 rounded-full bg-slate-900 dark:bg-emerald-400 transition-all duration-200" />
              )}

              {/* Icon Container with Badge */}
              <div className="relative flex items-center justify-center w-6 h-6">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    active ? 'scale-110 stroke-[2.2]' : 'group-hover:scale-105 stroke-[1.8]'
                  }`}
                />
                {item.badge !== null && item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-emerald-600 text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

