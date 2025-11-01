'use client';

import { default as fontData } from '@/data/fonts.json';
import { notFound } from 'next/navigation';
import FontCard from '@/components/font-card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function FontDetailPage({ params }: { params: { id: string } }) {
  const font = fontData.fonts.find((f) => f.id === params.id);
  const [previewText, setPreviewText] = useState('আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।');
  const [fontSize, setFontSize] = useState(36);

  useEffect(() => {
    if (font?.cssUrl) {
      const existingLink = document.querySelector(`link[href="${font.cssUrl}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.href = font.cssUrl;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
    }
  }, [font]);

  if (!font) {
    notFound();
  }

  const otherFonts = fontData.fonts.filter(f => f.id !== font.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">সব ফন্ট</span>
          </Link>
          <h1 className="text-2xl font-headline font-bold text-primary">{font.name}</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card p-6 rounded-lg border shadow-sm mb-8">
              <textarea
                className="w-full h-64 p-4 text-center rounded-md bg-muted/50 border"
                style={{ fontFamily: font.fontFamily, fontSize: `${fontSize}px` }}
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
              />
              <div className="mt-4 flex items-center gap-4">
                  <label htmlFor="fontSize" className="text-sm font-medium">ফন্টের আকার:</label>
                  <input
                      id="fontSize"
                      type="range"
                      min="12"
                      max="128"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full"
                  />
                  <span className="font-semibold">{fontSize}px</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
             <div className="sticky top-24">
                <FontCard font={font} fontSize={24} previewText={previewText.substring(0, 20)} />
             </div>
          </div>
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">অন্যান্য ফন্ট</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {otherFonts.map((f) => (
                    <FontCard key={f.id} font={f} fontSize={24} previewText="আমার সোনার বাংলা" />
                ))}
            </div>
        </div>
      </main>

      <footer className="bg-card border-t mt-8 py-6">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} বাংলা ফন্ট সিডিএন। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
      </footer>
    </div>
  );
}
