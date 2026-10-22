import React from 'react';
import { CrewDetailView } from '@/components/crew/CrewDetailView';
import { getCrewBySlug, INITIAL_CREW } from '@/lib/data';

export function generateStaticParams() {
  return INITIAL_CREW.map((c) => ({ slug: c.slug }));
}

interface CrewDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CrewDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const member = getCrewBySlug(decodedSlug);
  if (member) {
    return {
      title: `${member.name} (${member.role}) — BookMyStudio`,
      description: member.bio,
    };
  }

  const title = decodedSlug
    .replace(/-[0-9]+$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${title} — Production Crew Profile — BookMyStudio`,
    description: 'Certified production head of department on BookMyStudio.',
  };
}

export default async function CrewDetailPage({ params }: CrewDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const initialMember = getCrewBySlug(decodedSlug) || null;

  return <CrewDetailView slug={decodedSlug} initialMember={initialMember} />;
}
