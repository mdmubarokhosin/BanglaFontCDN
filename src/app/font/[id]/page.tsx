
import { notFound } from 'next/navigation';
import FontDetailPageClient from '@/components/font-detail-page-client';
import type { Font } from '@/types/font';
import fontData from '@/data/fonts.json';
import { Metadata } from 'next';

type FontDetailPageProps = {
  params: { id: string };
};

async function getFont(id: string): Promise<Font | null> {
  const font = fontData.fonts.find((f) => f.id === id);
  return font || null;
}

export async function generateMetadata({ params }: FontDetailPageProps): Promise<Metadata> {
  const font = await getFont(params.id);

  if (!font) {
    return {
      title: 'Font Not Found'
    }
  }

  return {
    title: `${font.name} - বাংলা ফন্ট সিডিএন`,
    description: `Details for ${font.name} font. Designed by ${font.designer}.`,
    other: {
       'stylesheet': font.cssUrl,
    }
  }
}

export default async function FontDetailPage({ params }: FontDetailPageProps) {
  const font = await getFont(params.id);

  if (!font) {
    notFound();
  }

  return (
      <FontDetailPageClient font={font} />
  );
}
