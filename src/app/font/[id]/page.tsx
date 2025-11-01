
'use client'

import { default as fontData } from '@/data/fonts.json';
import { notFound } from 'next/navigation';
import FontDetailPageClient from '@/components/font-detail-page-client';
import { use } from 'react';

// Define a type for the params object
type FontDetailPageProps = {
  params: { id: string };
};

// Mock async function to fetch font, simulating a server-side operation if needed
async function getFont(id: string) {
  return fontData.fonts.find((f) => f.id === id);
}

export default function FontDetailPage({ params }: FontDetailPageProps) {
  // Use React.use() to unwrap the promise from the params
  const font = use(getFont(params.id));

  if (!font) {
    notFound();
  }

  return <FontDetailPageClient font={font} />;
}

    