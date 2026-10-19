import React from 'react';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ImageGallery } from '@/components/common/ImageGallery';
import { InquiryForm } from '@/components/common/InquiryForm';
import { EquipmentCard } from '@/components/equipment/EquipmentCard';
import { StarIcon, CheckCircleIcon, ShieldPolicyIcon } from '@/components/ui/Icons';
import { getEquipmentBySlug, getSimilarEquipment, INITIAL_EQUIPMENT } from '@/lib/data';

export function generateStaticParams() {
  return INITIAL_EQUIPMENT.map((e) => ({ slug: e.slug }));
}

interface EquipmentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EquipmentDetailPageProps) {
  const { slug } = await params;
  const eq = getEquipmentBySlug(slug);
  if (!eq) return { title: 'Equipment Not Found — BookMyStudio' };

  return {
    title: `${eq.name} — BookMyStudio`,
    description: eq.description,
  };
}

export default async function EquipmentDetailPage({ params }: EquipmentDetailPageProps) {
  const { slug } = await params;
  const eq = getEquipmentBySlug(slug);

  if (!eq) {
    notFound();
  }

  const similarEquipment = getSimilarEquipment(eq.id, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Equipment & Grip', href: '/equipment' },
          { label: eq.name },
        ]}
      />

      {/* Header */}
      <div className="mt-2 pb-6 border-b border-slate-100 dark:border-[#303030] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010]">
              {eq.brand}
            </span>
            <span className="text-xs text-slate-400 dark:text-[#8A8A8A]">·</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-[#8A8A8A] uppercase tracking-wider">
              {eq.categoryLabel}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-[#F5F5F5] tracking-tight">
            {eq.name}
          </h1>

          <div className="mt-2 flex items-center gap-3 text-xs text-slate-600 dark:text-[#8A8A8A] flex-wrap">
            <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-[#F5F5F5]">
              <StarIcon className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{eq.rating.toFixed(1)}</span>
            </div>
            <span className="text-slate-300 dark:text-[#383838]">·</span>
            <span>Replacement Value: ${eq.replacementValue.toLocaleString()}</span>
            <span className="text-slate-300 dark:text-[#383838]">·</span>
            <span className="text-slate-500 dark:text-[#8A8A8A]">Weekly Rate: ${eq.weeklyRate.toLocaleString()} (3-day week)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 text-xs font-semibold">
            <ShieldPolicyIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Equipment Floater Insurance Ready</span>
          </div>
        </div>
      </div>

      {/* 2-Column Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <ImageGallery images={eq.galleryImages} alt={eq.name} />

          {/* Key Specs Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A] mb-2">
              TECHNICAL SPECIFICATIONS &amp; CAPABILITIES
            </h3>
            <div className="space-y-2">
              {eq.keySpecs.map((spec) => (
                <div key={spec} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-[#B3B3B3] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-[#10B981] mt-1.5 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
              Package Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B3B3B3] leading-relaxed">
              {eq.description}
            </p>
          </div>

          {/* Included Accessories */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-[#303030]">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
              Included Package Flight Case Contents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {eq.includedAccessories.map((acc) => (
                <div key={acc} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-[#B3B3B3] font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{acc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Requirements */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#181818] space-y-1 text-xs">
            <div className="font-bold text-slate-900 dark:text-[#F5F5F5] uppercase tracking-wider text-[10px]">
              Power &amp; Mounting Standards
            </div>
            <div className="text-slate-600 dark:text-[#8A8A8A]">
              <strong>Power:</strong> {eq.powerRequirement}
            </div>
            {eq.mountType && (
              <div className="text-slate-600 dark:text-[#8A8A8A]">
                <strong>Mount:</strong> {eq.mountType}
              </div>
            )}
          </div>

        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4">
          <InquiryForm
            itemTitle={eq.name}
            itemType="equipment"
            dayRate={eq.dayRate}
          />
        </div>

      </div>

      {/* Similar Equipment */}
      {similarEquipment.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-100 dark:border-[#303030]">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
              RELATED PRODUCTION INVENTORY
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F5F5F5]">
              Compatible Cinema Gear &amp; Lighting Packages
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {similarEquipment.map((similar) => (
              <EquipmentCard key={similar.id} equipment={similar} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 px-4 py-3 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-t border-slate-200 dark:border-[#262626] safe-area-bottom shadow-lg">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-[#8A8A8A] tracking-wider">
              Daily Gear Rental
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900 dark:text-[#F5F5F5]">
                ${eq.dayRate.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-[#8A8A8A]">/day</span>
            </div>
          </div>
          <a
            href="#inquiry-form"
            className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-emerald-600 text-white text-xs font-bold shadow-sm active:scale-95 transition-all text-center cursor-pointer"
          >
            Reserve Equipment
          </a>
        </div>
      </div>
    </div>
  );
}
