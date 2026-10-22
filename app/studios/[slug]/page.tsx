import React from 'react';
import { StudioDetailView } from '@/components/studios/StudioDetailView';
import { getStudioBySlug, INITIAL_STUDIOS } from '@/lib/data';

export function generateStaticParams() {
  return INITIAL_STUDIOS.map((s) => ({ slug: s.slug }));
}

interface StudioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StudioDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const studio = getStudioBySlug(decodedSlug);
  if (studio) {
    return {
      title: `${studio.name} — BookMyStudio`,
      description: studio.description,
    };
  }

  const title = decodedSlug
    .replace(/-[0-9]+$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${title} — Studio Details — BookMyStudio`,
    description: 'Certified production soundstage and film studio on BookMyStudio.',
  };
}

export default async function StudioDetailPage({ params }: StudioDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const initialStudio = getStudioBySlug(decodedSlug) || null;

  return <StudioDetailView slug={decodedSlug} initialStudio={initialStudio} />;
}
