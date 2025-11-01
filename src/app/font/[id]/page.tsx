
import { default as fontData } from '@/data/fonts.json';
import { notFound } from 'next/navigation';
import FontDetailPageClient from '@/components/font-detail-page-client';

export default function FontDetailPage({ params }: { params: { id: string } }) {
  const font = fontData.fonts.find((f) => f.id === params.id);

  if (!font) {
    notFound();
  }

  const otherFonts = fontData.fonts.filter(f => f.id !== font.id).slice(0, 3);

  return <FontDetailPageClient font={font} otherFonts={otherFonts} />;
}
