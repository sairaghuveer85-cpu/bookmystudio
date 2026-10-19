import React from 'react';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ImageGallery } from '@/components/common/ImageGallery';
import { InquiryForm } from '@/components/common/InquiryForm';
import { LocationCard } from '@/components/locations/LocationCard';
import { StarIcon, CheckCircleIcon, ShieldPolicyIcon } from '@/components/ui/Icons';
import { getLocationBySlug, getSimilarLocations, INITIAL_LOCATIONS } from '@/lib/data';

export function generateStaticParams() {
  return INITIAL_LOCATIONS.map((l) => ({ slug: l.slug }));
}

interface LocationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LocationDetailPageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return { title: 'Location Not Found — BookMyStudio' };

  return {
    title: `${location.name} — BookMyStudio`,
    description: location.description,
  };
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const similarLocations = getSimilarLocations(location.id, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Filming Locations', href: '/locations' },
          { label: location.name },
        ]}
      />

      {/* Header */}
      <div className="mt-2 pb-6 border-b border-slate-100 dark:border-[#303030] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010]">
              {location.categoryLabel}
            </span>
            <span className="text-xs text-slate-400 dark:text-[#8A8A8A]">·</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-[#8A8A8A] uppercase tracking-wider">
              {location.submarket}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-[#F5F5F5] tracking-tight">
            {location.name}
          </h1>

          <div className="mt-2 flex items-center gap-3 text-xs text-slate-600 dark:text-[#8A8A8A] flex-wrap">
            <span>{location.location}</span>
            <span className="text-slate-300 dark:text-[#383838]">·</span>
            <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-[#F5F5F5]">
              <StarIcon className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{location.rating.toFixed(2)}</span>
              <span className="text-slate-400 dark:text-[#8A8A8A] font-normal">({location.reviewCount} scouts)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 text-xs font-semibold">
            <ShieldPolicyIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Direct Commercial Film Insurance</span>
          </div>
        </div>
      </div>

      {/* 2-Column Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <ImageGallery images={location.galleryImages} alt={location.name} />

          {/* Key Location Specifications */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A] mb-4">
              LOCATION SPECIFICATIONS &amp; LOGISTICS
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 dark:text-[#8A8A8A] block">Total Area</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#F5F5F5] block">
                  {location.areaSqFt.toLocaleString()} sq ft
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 dark:text-[#8A8A8A] block">Ceiling Clearance</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#F5F5F5] block">
                  {location.ceilingHeight}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 dark:text-[#8A8A8A] block">Electrical Service</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#F5F5F5] block">
                  {location.powerSupply}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 dark:text-[#8A8A8A] block">Load-in Access</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#F5F5F5] block">
                  {location.vehicleAccess}
                </span>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
              Location Scouting Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B3B3B3] leading-relaxed">
              {location.description}
            </p>
          </div>

          {/* Logistics & Permitting Rules */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#181818] space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-[#F5F5F5] uppercase tracking-wider">
              Permitting &amp; City Film Rules
            </h4>
            <div className="text-xs text-slate-600 dark:text-[#8A8A8A] space-y-1">
              <div>
                <strong className="text-slate-800 dark:text-[#F5F5F5]">Curfew / Sound Restrictions:</strong> {location.curfewRestrictions}
              </div>
              <div>
                <strong className="text-slate-800 dark:text-[#F5F5F5]">Jurisdiction Permits:</strong> {location.permitsRequired}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-[#303030]">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
              On-Site Production Facilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {location.amenities.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-[#B3B3B3] font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4">
          <InquiryForm
            itemTitle={location.name}
            itemType="location"
            dayRate={location.dayRate10h}
          />
        </div>

      </div>

      {/* Similar Locations */}
      {similarLocations.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-100 dark:border-[#303030]">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
              DISCOVER SIMILAR PROPERTIES
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F5F5F5]">
              Alternative Filming Spaces in New York
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {similarLocations.map((similar) => (
              <LocationCard key={similar.id} location={similar} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
