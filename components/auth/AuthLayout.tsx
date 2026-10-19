'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogoMark, ShieldPolicyIcon } from '@/components/ui/Icons';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuth } from '@/context/AuthContext';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footerPrompt?: {
    text: string;
    linkText: string;
    linkHref: string;
  };
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footerPrompt,
}: AuthLayoutProps) {
  const { isConfigured } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-[#101010] text-slate-900 dark:text-[#F5F5F5] flex flex-col justify-center transition-colors duration-150">
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left / Center: Form Column */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-2xl mx-auto lg:max-w-none lg:w-1/2">
          
          {/* Top Brand Link & Theme Switcher */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md p-1 group"
              aria-label="BookMyStudio Home"
            >
              <LogoMark className="w-7 h-7 transition-transform group-hover:scale-105" />
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-[#F5F5F5] uppercase">
                BOOKMYSTUDIO
              </span>
            </Link>

            <ThemeToggle />
          </div>

          {/* Form Container */}
          <div className="my-8 max-w-md w-full mx-auto animate-slide-up">
            
            {/* Supabase Unconfigured Advisory Banner */}
            {!isConfigured && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-400">
                  <span>Configuration Note: Supabase Auth Keys Pending</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800/90 dark:text-amber-300/90">
                  `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are not set in `.env.local`. Forms and validation are active; add your Supabase credentials to `.env.local` to process live authentication.
                </p>
              </div>
            )}

            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5]">
                {title}
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-[#B3B3B3]">
                {subtitle}
              </p>
            </div>

            {children}

            {footerPrompt && (
              <p className="mt-6 text-center text-xs text-slate-500 dark:text-[#8A8A8A]">
                {footerPrompt.text}{' '}
                <Link
                  href={footerPrompt.linkHref}
                  className="font-bold text-slate-900 dark:text-emerald-400 hover:underline"
                >
                  {footerPrompt.linkText}
                </Link>
              </p>
            )}
          </div>

          {/* Bottom Trust Line */}
          <div className="pt-4 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-[11px] text-slate-400 dark:text-[#8A8A8A]">
            <span>&copy; 2026 BookMyStudio Inc.</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-slate-600 dark:hover:text-[#F5F5F5] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-slate-600 dark:hover:text-[#F5F5F5] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

        </div>

        {/* Right: Editorial Production Showcase (Desktop only) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 dark:bg-[#0c0c0c] border-l border-slate-800 dark:border-[#202020] text-white flex-col justify-between p-16 overflow-hidden">
          
          {/* Ambient Drifting Blob */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-blob" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-3000" />

          {/* Background Studio Visual */}
          <Image
            src="/images/studios/apex-stage-c.svg"
            alt="Apex Cinema Soundstage"
            fill
            className="object-cover opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000 hover:scale-110"
          />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
              COMMERCIAL PRODUCTION NETWORK
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/10 backdrop-blur-md border border-white/20 animate-subtle-pulse">
              ZONE 1 VERIFIED
            </span>
          </div>

          <div className="relative z-10 max-w-lg space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              <ShieldPolicyIcon className="w-3.5 h-3.5" />
              <span>Direct $2,000,000 Production Liability Endorsement</span>
            </div>

            <blockquote className="text-xl sm:text-2xl font-bold leading-snug">
              &ldquo;BookMyStudio allows our production teams to lock soundproof cycloramas and union crew without days of manual back-and-forth.&rdquo;
            </blockquote>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
                VP
              </div>
              <div>
                <p className="text-xs font-bold">Vanguard Pictures NY</p>
                <p className="text-[11px] text-slate-400">Commercial &amp; Narrative Line Production</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>STC 60+ Soundproof Stages</span>
            <span>3-Phase 1200A Camlock</span>
            <span>IATSE Local 52 &amp; 600</span>
          </div>

        </div>

      </div>
    </div>
  );
}
