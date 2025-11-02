
import { notFound } from 'next/navigation';
import FontDetailPageClient from '@/components/font-detail-page-client';
import type { Font } from '@/types/font';
import fontData from '@/data/fonts.json';

type FontDetailPageProps = {
  params: { id: string };
};

async function getFont(id: string): Promise<Font | null> {
  const font = fontData.fonts.find((f) => f.id === id);
  return font || null;
}

export default async function FontDetailPage({ params }: FontDetailPageProps) {
  const font = await getFont(params.id);

  if (!font) {
    notFound();
  }

  return <FontDetailPageClient font={font} />;
}
