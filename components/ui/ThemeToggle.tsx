'use client';

import React, { useSyncExternalStore } from 'react';
import { SunIcon, MoonIcon } from '@/components/ui/Icons';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const emptySubscribe = () => () => {};

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { toggleTheme, isDark } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const nextThemeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const currentThemeTitle = isDark ? 'Dark theme active' : 'Light theme active';

  // Render neutral placeholder before mount to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        className={`p-2 rounded-lg border border-slate-200 dark:border-[#303030] text-slate-500 dark:text-[#B3B3B3] bg-transparent opacity-80 cursor-pointer ${className}`}
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-4 h-4" />
      </button>
    );
  }

  if (showLabel) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 active:scale-[0.99] border border-slate-200 dark:border-[#303030] bg-slate-50 hover:bg-slate-100 dark:bg-[#181818] dark:hover:bg-[#202020] text-slate-800 dark:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer ${className}`}
        aria-label={nextThemeLabel}
        title={nextThemeLabel}
      >
        <span className="flex items-center gap-2">
          <span className="relative w-4 h-4 flex items-center justify-center shrink-0">
            <SunIcon
              className={`w-4 h-4 text-amber-500 absolute transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isDark
                  ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
                  : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <MoonIcon
              className={`w-4 h-4 text-emerald-400 absolute transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isDark
                  ? 'opacity-100 rotate-0 scale-100'
                  : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
              }`}
            />
          </span>
          <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </span>
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-[#8A8A8A]">
          {isDark ? 'ON' : 'OFF'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg transition-all duration-150 active:scale-90 border border-slate-200 hover:border-slate-300 dark:border-[#303030] dark:hover:border-[#454545] bg-white hover:bg-slate-100 dark:bg-[#181818] dark:hover:bg-[#202020] text-slate-700 dark:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer ${className}`}
      aria-label={nextThemeLabel}
      title={`${currentThemeTitle} — Click to switch`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <SunIcon
          className={`w-4 h-4 text-amber-500 absolute transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDark
              ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <MoonIcon
          className={`w-4 h-4 text-emerald-400 absolute transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`}
        />
      </div>
    </button>
  );
}

