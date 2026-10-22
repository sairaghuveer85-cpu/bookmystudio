import React from 'react';
import { LocationDetailView } from '@/components/locations/LocationDetailView';
import { getLocationBySlug, INITIAL_LOCATIONS } from '@/lib/data';

export function generateStaticParams() {
  return INITIAL_LOCATIONS.map((l) => ({ slug: l.slug }));
}

interface LocationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LocationDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const location = getLocationBySlug(decodedSlug);
  if (location) {
    return {
      title: `${location.name} — BookMyStudio`,
      description: location.description,
    };
  }

  const title = decodedSlug
    .replace(/-[0-9]+$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${title} — Filming Location Details — BookMyStudio`,
    description: 'Commercial filming location and production warehouse on BookMyStudio.',
  };
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const initialLocation = getLocationBySlug(decodedSlug) || null;

  return <LocationDetailView slug={decodedSlug} initialLocation={initialLocation} />;
}
