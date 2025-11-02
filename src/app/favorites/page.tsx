
'use client';

import { useState, useEffect } from 'react';
import { default as fontData } from '@/data/fonts.json';
import type { Font } from '@/types/font';
import FontGrid from '@/components/font-grid';
import Header from '@/components/header';
import { useFavorites } from '@/hooks/use-favorites';
import { Star } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [favoriteFonts, setFavoriteFonts] = useState<Font[]>([]);
  const [previewText, setPreviewText] = useState('আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।');
  const [fontSize, setFontSize] = useState(24);

  useEffect(() => {
    const filtered = fontData.fonts.filter(font => favorites.includes(font.id));
    setFavoriteFonts(filtered);
  }, [favorites]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary flex items-center justify-center gap-3">
              <Star className="w-8 h-8"/>
              পছন্দের ফন্টসমূহ
            </h1>
            <p className="text-muted-foreground text-sm mt-2">আপনার পছন্দের তালিকায় থাকা ফন্টগুলো এখানে দেখুন।</p>
        </div>

        {favoriteFonts.length > 0 ? (
          <FontGrid fonts={favoriteFonts} fontSize={fontSize} previewText={previewText} />
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <h2 className="text-2xl font-headline">আপনার পছন্দের তালিকা এখন খালি।</h2>
            <p>হার্ট ❤️ আইকনে ক্লিক করে ফন্ট পছন্দের তালিকায় যোগ করুন।</p>
          </div>
        )}
      </main>

      <footer className="bg-card border-t mt-8 py-6">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} বাংলা ফন্ট সিডিএন। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
      </footer>
    </div>
  );
}
