'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, CheckCircleIcon } from '@/components/ui/Icons';

const PRIMARY_STUDIO_IMAGE =
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop';
const FALLBACK_STUDIO_IMAGE = '/images/studios/apex-stage-c.svg';

export function LandingHero() {
  const [imgSrc, setImgSrc] = useState(PRIMARY_STUDIO_IMAGE);

  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 bg-[#09090B] border-b border-zinc-800/80 transition-colors duration-150 overflow-hidden">
      {/* Subtle ambient lighting backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 w-[500px] h-[350px] bg-amber-500/5 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================
             LEFT COLUMN: Value Proposition & Direct CTAs
             ======================================================== */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow: Non-duplicate brand category label */}
            <div className="inline-flex">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>YOUR PRODUCTION STARTS HERE</span>
              </div>
            </div>

            {/* Headline: Responsive, balanced rhythm, zero clipping */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12] max-w-xl pb-1">
              Every Production.
              <span className="block text-zinc-400 font-bold mt-1 sm:mt-2">
                One Connected Place.
              </span>
            </h1>

            {/* Supporting Copy: Focused on real marketplace discovery */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed max-w-xl font-normal">
              Find studios, filming locations, creative professionals, and production equipment in one place. Discover the right resources for your next shoot.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/search"
                className="group px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:shadow-amber-500/10 active:scale-[0.99]"
              >
                <span>Plan Your Production</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/studios"
                className="px-6 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-[#121216] hover:bg-[#18181E] text-zinc-200 text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-[0.99]"
              >
                <span>Explore Studios</span>
              </Link>
            </div>

            {/* Concise Benefits: Supported by the current product */}
            <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium text-zinc-300">Multiple production categories</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium text-zinc-300">Location-aware discovery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium text-zinc-300">Booking &amp; inquiry workflows</span>
              </div>
            </div>

          </div>

          {/* ========================================================
             RIGHT COLUMN: Authentic Cinematic Production Studio Image
             ======================================================== */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[5/4] w-full overflow-hidden bg-zinc-950">
                <Image
                  src={imgSrc}
                  alt="Professional production studio soundstage with cinema lighting and stage grid"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 550px"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  onError={() => setImgSrc(FALLBACK_STUDIO_IMAGE)}
                />
                
                {/* Subtle dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/20 pointer-events-none" />

                {/* Studio Identification Plaque */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto px-3 py-1.5 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800 text-[11px] font-mono text-zinc-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Production Studios &amp; Soundstages</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
