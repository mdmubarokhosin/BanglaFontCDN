'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Sparkles, Bot, Palette, Link as LinkIcon } from 'lucide-react';
import fontData from '@/data/fonts.json';
import type { Font } from '@/types/font';
import { suggestFontPairing, type FontPairingOutput } from '@/ai/flows/fontPairingFlow';
import { Skeleton } from '@/components/ui/skeleton';

export default function FontPairingPage() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const [pairingResult, setPairingResult] = useState<FontPairingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [englishFontFamily, setEnglishFontFamily] = useState<string>('');

  useEffect(() => {
    setFonts(fontData.fonts);
    if (fontData.fonts.length > 0) {
        setSelectedFont(fontData.fonts[0]);
    }
  }, []);

  useEffect(() => {
    if (pairingResult?.googleFontLink) {
      const link = document.createElement('link');
      link.href = pairingResult.googleFontLink.replace("@import url('", "").replace("');", "");
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      const family = pairingResult.englishFontName;
      setEnglishFontFamily(`'${family}', sans-serif`);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [pairingResult]);
  
  useEffect(() => {
    if (selectedFont?.cssUrl) {
      const link = document.createElement('link');
      link.href = selectedFont.cssUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [selectedFont]);

  const handleSuggestPairing = async () => {
    if (!selectedFont) {
      setError('অনুগ্রহ করে একটি বাংলা ফন্ট নির্বাচন করুন।');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPairingResult(null);

    try {
      const result = await suggestFontPairing({
        bengaliFontName: selectedFont.name,
        category: selectedFont.category,
        designer: selectedFont.designer,
      });
      setPairingResult(result);
    } catch (e) {
      console.error(e);
      setError('পেয়ারিং পরামর্শ আনতে একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline tracking-tight flex items-center justify-center gap-3">
              <Sparkles className="w-10 h-10" />
              AI ফন্ট পেয়ারিং
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              আপনার বাংলা ফন্টের জন্য সেরা ইংরেজি ফন্ট জুটি খুঁজে নিন।
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>ফন্ট নির্বাচন করুন</CardTitle>
              <CardDescription>একটি বাংলা ফন্ট নির্বাচন করুন এবং AI এর সাহায্যে মানানসই ইংরেজি ফন্ট খুঁজে নিন।</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center gap-4">
              <Select
                value={selectedFont?.id || ''}
                onValueChange={(id) => {
                  const font = fonts.find(f => f.id === id);
                  setSelectedFont(font || null);
                }}
              >
                <SelectTrigger className="w-full sm:w-[300px]">
                  <SelectValue placeholder="একটি বাংলা ফন্ট নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map(font => (
                    <SelectItem key={font.id} value={font.id}>
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSuggestPairing} disabled={isLoading || !selectedFont} className="w-full sm:w-auto">
                {isLoading ? 'লোড হচ্ছে...' : 'পরামর্শ নিন'}
                {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
              </Button>
            </CardContent>
          </Card>

          {error && (
             <Alert variant="destructive" className="mb-8">
              <AlertTitle>ত্রুটি</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <div className="border rounded-lg p-8 space-y-6">
                        <Skeleton className="h-8 w-3/4 mx-auto" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                </CardContent>
            </Card>
          )}

          {pairingResult && selectedFont && (
            <Card className="animate-in fade-in-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bot className="w-6 h-6 text-primary" />
                    AI প্রস্তাবিত জুটি
                </CardTitle>
                <CardDescription>
                  <span style={{fontFamily: selectedFont.fontFamily}} className="font-bold">{selectedFont.name}</span>
                  {' '} এবং {' '}
                  <span style={{fontFamily: englishFontFamily}} className="font-bold">{pairingResult.englishFontName}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Palette className="w-5 h-5 text-accent"/> পেয়ারিং এর কারণ</h3>
                    <p className="text-muted-foreground">{pairingResult.reason}</p>
                </div>
                 <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><LinkIcon className="w-5 h-5 text-accent"/> ব্যবহার করুন</h3>
                    <p className="text-muted-foreground mb-2 text-sm">এই ইংরেজি ফন্টটি ব্যবহার করতে নিচের কোডটি আপনার CSS ফাইলে যুক্ত করুন:</p>
                    <pre className="text-sm bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
                        <code>{pairingResult.googleFontLink}</code>
                    </pre>
                </div>
                <div className="border rounded-lg p-8 text-center space-y-6 bg-muted/20">
                    <h3 className="text-2xl font-bold" style={{fontFamily: selectedFont.fontFamily}}>
                        নমুনা শিরোনাম (বাংলা)
                    </h3>
                    <p className="text-lg" style={{fontFamily: englishFontFamily}}>
                        Sample Paragraph (English) - The quick brown fox jumps over the lazy dog.
                    </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
