
import { doc, getDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { notFound } from 'next/navigation';
import FontDetailPageClient from '@/components/font-detail-page-client';
import type { Font } from '@/types/font';

type FontDetailPageProps = {
  params: { id: string };
};

// This function is temporary. We should get this from a server component context
const { firestore } = initializeFirebase();

async function getFont(id: string): Promise<Font | null> {
  const docRef = doc(firestore, 'fonts', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Font;
  } else {
    // If not found in Firestore, fallback to JSON
    const { default: fontData } = await import('@/data/fonts.json');
    const font = fontData.fonts.find((f) => f.id === id);
    return font || null;
  }
}

export default async function FontDetailPage({ params }: FontDetailPageProps) {
  const font = await getFont(params.id);

  if (!font) {
    notFound();
  }

  return <FontDetailPageClient font={font} />;
}
