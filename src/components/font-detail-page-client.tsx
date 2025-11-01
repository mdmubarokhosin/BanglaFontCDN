
'use client';

import { useState, useEffect } from 'react';
import type { Font } from '@/types/font';
import FontCard from '@/components/font-card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"
import { Copy } from 'lucide-react';

interface FontDetailPageClientProps {
    font: Font;
    otherFonts: Font[];
}

export default function FontDetailPageClient({ font, otherFonts }: FontDetailPageClientProps) {
  const [previewText, setPreviewText] = useState('আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।');
  const [fontSize, setFontSize] = useState(36);
  const { toast } = useToast();

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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} কপি হয়েছে!`,
      description: `কোডটি আপনার ক্লিপবোর্ডে কপি করা হয়েছে।`,
    });
  };

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
                className="w-full h-64 p-4 text-center rounded-md bg-muted/50 border text-4xl"
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
            
            <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-bold mb-4">ব্যবহারের নিয়ম</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">CSS @import</label>
                        <div className="flex items-center gap-2 mt-1">
                            <pre className="text-sm bg-muted/50 p-3 rounded-md flex-grow overflow-x-auto"><code>{font.importUrl}</code></pre>
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(font.importUrl, '@import URL')}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">HTML &lt;link&gt;</label>
                        <div className="flex items-center gap-2 mt-1">
                             <pre className="text-sm bg-muted/50 p-3 rounded-md flex-grow overflow-x-auto"><code>{font.linkUrl}</code></pre>
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(font.linkUrl, '<link> ট্যাগ')}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="lg:col-span-1">
             <div className="sticky top-24">
                <FontCard font={font} />
             </div>
          </div>
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">অন্যান্য ফন্ট</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {otherFonts.map((f) => (
                    <FontCard key={f.id} font={f} />
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
