
import { default as fontData } from '@/data/fonts.json';
import { notFound } from 'next/navigation';
import FontDetailPageClient from '@/components/font-detail-page-client';

type FontDetailPageProps = {
  params: { id: string };
};

async function getFont(id: string) {
  return fontData.fonts.find((f) => f.id === id);
}

export default async function FontDetailPage({ params }: FontDetailPageProps) {
  const font = await getFont(params.id);

  if (!font) {
    notFound();
  }

  return <FontDetailPageClient font={font} />;
}
