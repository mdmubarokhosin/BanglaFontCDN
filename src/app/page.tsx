'use client';

import { useState } from 'react';
import { default as fontData } from '@/data/fonts.json';
import type { Font } from '@/types/font';
import FontToolbar from '@/components/font-toolbar';
import FontGrid from '@/components/font-grid';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const [fonts] = useState<Font[]>(fontData.fonts);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [previewText, setPreviewText] = useState('আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const allCategories = ['all', ...Array.from(new Set(fonts.map(f => f.category)))];

  const filteredFonts = fonts
    .filter((font) =>
      font.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((font) => 
      selectedCategory === 'all' ? true : font.category === selectedCategory
    );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className='text-center flex-grow'>
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-primary">বাংলা ফন্ট সিডিএন</h1>
            <p className="text-muted-foreground text-xs md:text-sm mt-1">জনপ্রিয় বাংলা ফন্ট খুঁজে নিন এবং আপনার প্রকল্পে ব্যবহার করুন।</p>
          </div>
          <ThemeToggle />
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
          categories={allCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
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
