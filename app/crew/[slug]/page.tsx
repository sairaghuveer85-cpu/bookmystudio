import React from 'react';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ImageGallery } from '@/components/common/ImageGallery';
import { InquiryForm } from '@/components/common/InquiryForm';
import { CrewCard } from '@/components/crew/CrewCard';
import { StarIcon, CheckCircleIcon, ShieldPolicyIcon } from '@/components/ui/Icons';
import { getCrewBySlug, getSimilarCrew, INITIAL_CREW } from '@/lib/data';

export function generateStaticParams() {
  return INITIAL_CREW.map((c) => ({ slug: c.slug }));
}

interface CrewDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CrewDetailPageProps) {
  const { slug } = await params;
  const member = getCrewBySlug(slug);
  if (!member) return { title: 'Crew Profile Not Found — BookMyStudio' };

  return {
    title: `${member.name} (${member.role}) — BookMyStudio`,
    description: member.bio,
  };
}

export default async function CrewDetailPage({ params }: CrewDetailPageProps) {
  const { slug } = await params;
  const member = getCrewBySlug(slug);

  if (!member) {
    notFound();
  }

  const similarCrew = getSimilarCrew(member.id, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Production Crew', href: '/crew' },
          { label: member.name },
        ]}
      />

      {/* Header */}
      <div className="mt-2 pb-6 border-b border-slate-100 dark:border-[#303030] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-black dark:bg-[#F5F5F5] text-white dark:text-[#101010]">
              {member.role}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
              {member.unionAffiliation}
            </span>
            <span className="text-xs text-slate-400 dark:text-[#8A8A8A]">·</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-[#8A8A8A] uppercase tracking-wider">
              {member.location}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-[#F5F5F5] tracking-tight">
            {member.name}
          </h1>

          <div className="mt-2 flex items-center gap-3 text-xs text-slate-600 dark:text-[#8A8A8A] flex-wrap">
            <span className="font-semibold text-slate-800 dark:text-[#F5F5F5]">{member.credits}</span>
            <span className="text-slate-300 dark:text-[#383838]">·</span>
            <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-[#F5F5F5]">
              <StarIcon className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{member.rating.toFixed(2)}</span>
              <span className="text-slate-400 dark:text-[#8A8A8A] font-normal">({member.reviewCount} confirmed wraps)</span>
            </div>
            <span className="text-slate-300 dark:text-[#383838]">·</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Next Available: {member.nextAvailable}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-[#F5F5F5] text-xs font-semibold">
            <ShieldPolicyIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Standard Kit Included &amp; Insured</span>
          </div>
        </div>
      </div>

      {/* 2-Column Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          <ImageGallery images={member.galleryImages} alt={member.name} />

          {/* Biography */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
              Professional Biography
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B3B3B3] leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-[#303030]">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F5F5F5]">
              Core Technical Competencies &amp; Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {member.skills.map((skill) => (
                <div key={skill} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-[#B3B3B3] font-medium">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Standard Working Kit Spec */}
          <div className="p-5 rounded-2xl bg-slate-900 dark:bg-[#202020] text-white border border-transparent dark:border-[#303030] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              INCLUDED STANDARD WORKING PACKAGE
            </span>
            <h4 className="text-sm font-bold text-white">
              {member.workingKit}
            </h4>
            <p className="text-xs text-slate-300 dark:text-[#B3B3B3] leading-relaxed">
              Standard expendables cart, backup power, calibrated monitoring tools, and union-standard kit maintenance included in daily rate without separate gear rental surcharge.
            </p>
          </div>

        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4">
          <InquiryForm
            itemTitle={`${member.name} (${member.role})`}
            itemType="crew"
            dayRate={member.dayRate10h}
          />
        </div>

      </div>

      {/* Similar Crew Members */}
      {similarCrew.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-100 dark:border-[#303030]">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8A8A8A]">
              CALL SHEET TALENT
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F5F5F5]">
              Alternative Heads of Department in New York
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {similarCrew.map((similar) => (
              <CrewCard key={similar.id} member={similar} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
