'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Sparkles, Bot, Palette, Link as LinkIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Font {
  id: string;
  name: string;
  designer: string;
  category: string;
  fontFamily: string;
  cssUrl: string;
}

interface FontPairingResult {
  englishFontName: string;
  reason: string;
  googleFontLink: string;
}

export default function FontPairingPage() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const [pairingResult, setPairingResult] = useState<FontPairingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [englishFontFamily, setEnglishFontFamily] = useState<string>('');
  const [apiConfigured, setApiConfigured] = useState(true);

  useEffect(() => {
    // ফন্ট ডেটা API থেকে লোড করুন
    const loadFonts = async () => {
      try {
        const response = await fetch('/api/fonts');
        const data = await response.json();
        if (data.fonts && data.fonts.length > 0) {
          setFonts(data.fonts);
          setSelectedFont(data.fonts[0]);
        }
      } catch {
        setError('ফন্ট লোড করতে সমস্যা হয়েছে।');
      }
    };
    loadFonts();
  }, []);

  useEffect(() => {
    if (pairingResult?.googleFontLink) {
      const href = pairingResult.googleFontLink
        .replace("@import url('", "")
        .replace("');", "")
        .replace("@import url(", "")
        .replace(");", "");

      const link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      const family = pairingResult.englishFontName;
      setEnglishFontFamily(`'${family}', sans-serif`);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
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
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
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
      const response = await fetch('/api/ai/font-pairing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bengaliFontName: selectedFont.name,
          category: selectedFont.category,
          designer: selectedFont.designer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'পেয়ারিং পরামর্শ আনতে একটি ত্রুটি ঘটেছে।');
      }

      if (data.success && data.data) {
        setPairingResult(data.data);
      } else {
        throw new Error('AI মডেল থেকে সঠিক রেসপন্স আসেনি।');
      }
    } catch (e: any) {
      const msg = e.message || 'পেয়ারিং পরামর্শ আনতে ত্রুটি হয়েছে।';
      if (msg.includes('API key') || msg.includes('সেট করা হয়নি')) {
        setApiConfigured(false);
        setError('OpenRouter API Key সেট করা হয়নি। অ্যাডমিন প্যানেল থেকে Settings > OpenRouter AI সেটিংস এ গিয়ে API Key সেট করুন।');
      } else if (msg.includes('503') || msg.includes('সাড়া দিতে পারছে')) {
        setError('AI মডেলটি সাড়া দিতে পারছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।');
      } else {
        setError(msg);
      }
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
            <p className="mt-2 text-sm text-muted-foreground">
              Powered by <span className="font-semibold text-indigo-600 dark:text-indigo-400">OpenRouter</span> AI
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
