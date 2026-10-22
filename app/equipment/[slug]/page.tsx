import React from 'react';
import { EquipmentDetailView } from '@/components/equipment/EquipmentDetailView';
import { getEquipmentBySlug, INITIAL_EQUIPMENT } from '@/lib/data';

export function generateStaticParams() {
  return INITIAL_EQUIPMENT.map((e) => ({ slug: e.slug }));
}

interface EquipmentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EquipmentDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const eq = getEquipmentBySlug(decodedSlug);
  if (eq) {
    return {
      title: `${eq.name} — BookMyStudio`,
      description: eq.description,
    };
  }

  const title = decodedSlug
    .replace(/-[0-9]+$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${title} — Cinema Equipment Details — BookMyStudio`,
    description: 'Certified cinema camera and production grip package on BookMyStudio.',
  };
}

export default async function EquipmentDetailPage({ params }: EquipmentDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const initialEquipment = getEquipmentBySlug(decodedSlug) || null;

  return <EquipmentDetailView slug={decodedSlug} initialEquipment={initialEquipment} />;
}
