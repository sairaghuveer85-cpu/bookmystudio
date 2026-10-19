import React from 'react';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ImageGallery } from '@/components/common/ImageGallery';
import { InquiryForm } from '@/components/common/InquiryForm';
import { StudioCard } from '@/components/studios/StudioCard';
import { StarIcon, CheckCircleIcon, ShieldPolicyIcon } from '@/components/ui/Icons';
import { getStudioBySlug, getSimilarStudios, INITIAL_STUDIOS } from '@/lib/data';

export function generateStaticParams() {
  return INITIAL_STUDIOS.map((s) => ({ slug: s.slug }));
}

interface StudioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StudioDetailPageProps) {
  const { slug } = await params;
  const studio = getStudioBySlug(slug);
  if (!studio) return { title: 'Studio Not Found — BookMyStudio' };

  return {
    title: `${studio.name} — BookMyStudio`,
    description: studio.description,
  };
}

export default async function StudioDetailPage({ params }: StudioDetailPageProps) {
  const { slug } = await params;
  const studio = getStudioBySlug(slug);

  if (!studio) {
    notFound();
  }

  const similarStudios = getSimilarStudios(studio.id, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Studios', href: '/studios' },
          { label: studio.name },
        ]}
      />

      {/* Main Studio Title & Top Specs Bar */}
      <div className="mt-2 pb-6 border-b border-slate-100 dark:border-[#303030] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010]">
              {studio.badgeTopLeft}
            </span>
            {studio.badgeTopSecondary && (
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-[#262626] text-slate-700 dark:text-[#F5F5F5]">
                {studio.badgeTopSecondary}
              </span>
            )}
            <span className="text-xs text-slate-400 dark:text-[#8A8A8A]">·</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-[#8A8A8A] uppercase tracking-wider">
              {studio.categoryLabel}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-[#F5F5F5] tracking-tight">
            {studio.name}
          </h1>

          <div className="mt-2 flex items-center gap-3 text-xs text-slate-600 dark:text-[#8A8A8A] flex-wrap">
            <span>{studio.location}</span>
            <span className="text-slate-300 dark:text-[#383838]">·</span>
            <span>{studio.submarket}</span>
            <span className="text-slate-300 dark:text-[#383838]">·</span>
            <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-[#F5F5F5]">
              <StarIcon className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{studio.rating.toFixed(2)}</span>
              <span className="text-slate-400 dark:text-[#8A8A8A] font-normal">({studio.reviewCount} wraps)</span>
            </div>
          </div>
        </div>

        {/* Top Badges / Policy Guarantee */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 text-xs font-semibold">
            <ShieldPolicyIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>$2M Direct Insurance Endorsement</span>
          </div>
        </div>
      </div>

      {/* 2-Column Content Layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left Column (8 cols): Gallery & Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Photo Gallery */}
          <ImageGallery images={studio.galleryImages} alt={studio.name} />

          {/* Key Specifications Grid */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A] mb-4">
              STAGE SPECIFICATIONS &amp; CAPACITIES
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 dark:text-[#8A8A8A] block">Total Floor Area</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#F5F5F5] block">
                  {studio.specs.sqFt.toLocaleString()} sq ft
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 dark:text-[#8A8A8A] block">Ceiling / Truss Height</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#F5F5F5] block">
                  {studio.specs.gridHeight}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 dark:text-[#8A8A8A] block">Power Distribution</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#F5F5F5] block">
                  {studio.specs.power}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 dark:text-[#8A8A8A] block">Loading &amp; Access</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#F5F5F5] block">
                  {studio.specs.access}
                </span>
              </div>
            </div>
          </div>

          {/* Facility Overview & Description */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
              Facility Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B3B3B3] leading-relaxed">
              {studio.description}
            </p>
          </div>

          {/* Amenities & Set Capabilities */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-[#303030]">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
              Included Facilities &amp; Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {studio.amenities.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-[#B3B3B3] font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Package Highlight */}
          <div className="p-4 rounded-xl bg-slate-900 dark:bg-[#202020] text-white border border-transparent dark:border-[#303030] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              INCLUDED STAGE GEAR PACKAGE
            </span>
            <p className="text-xs text-slate-200 dark:text-[#B3B3B3]">
              {studio.equipmentHighlight}
            </p>
          </div>

        </div>

        {/* Right Column (4 cols): Sticky Reservation & Quote Form */}
        <div className="lg:col-span-4">
          <InquiryForm
            itemTitle={studio.name}
            itemType="studio"
            dayRate={studio.dayRate10h}
          />
        </div>

      </div>

      {/* Similar Studios Section */}
      {similarStudios.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-100 dark:border-[#303030]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
                EXPLORE ALTERNATIVES
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F5F5F5]">
                Similar Certified Production Stages
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {similarStudios.map((similar) => (
              <StudioCard key={similar.id} studio={similar} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 px-4 py-3 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-t border-slate-200 dark:border-[#262626] safe-area-bottom shadow-lg">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-[#8A8A8A] tracking-wider">
              10h Standard Day
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900 dark:text-[#F5F5F5]">
                ${studio.dayRate10h.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-[#8A8A8A]">/day</span>
            </div>
          </div>
          <a
            href="#inquiry-form"
            className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-emerald-600 text-white text-xs font-bold shadow-sm active:scale-95 transition-all text-center cursor-pointer"
          >
            Request Date Hold
          </a>
        </div>
      </div>
    </div>
  );
}
