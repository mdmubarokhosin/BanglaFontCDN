'use client';

import { useState } from 'react';
import { default as fontData } from '@/data/fonts.json';
import type { Font } from '@/types/font';
import FontToolbar from '@/components/font-toolbar';
import FontGrid from '@/components/font-grid';

export default function Home() {
  const [fonts, setFonts] = useState<Font[]>(fontData.fonts);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [previewText, setPreviewText] = useState('আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।');

  const filteredFonts = fonts.filter((font) =>
    font.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex flex-col items-center text-center">
          <h1 className="text-4xl font-headline font-bold text-primary">বাংলা ফন্ট সিডিএন</h1>
          <p className="text-muted-foreground mt-2">জনপ্রিয় বাংলা ফন্ট খুঁজে নিন এবং আপনার প্রকল্পে ব্যবহার করুন।</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <FontToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          fontSize={fontSize}
          setFontSize={setFontSize}
          previewText={previewText}
          setPreviewText={setPreviewText}
        />
        <FontGrid fonts={filteredFonts} fontSize={fontSize} previewText={previewText} />
      </main>

      <footer className="bg-card border-t mt-8 py-6">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} বাংলা ফন্ট সিডিএন। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
      </footer>
    </div>
  );
}
