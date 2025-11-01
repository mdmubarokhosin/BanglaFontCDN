
'use client';

import { useState, useEffect } from 'react';
import type { Font } from '@/types/font';
import Link from 'next/link';
import { ArrowLeft, Copy, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

interface FontDetailPageClientProps {
    font: Font;
}

const GLYPH_SET = "অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎংঃঁ১২৩৪৫৬৭৮৯০";


export default function FontDetailPageClient({ font }: FontDetailPageClientProps) {
  const [previewText, setPreviewText] = useState('আমার সোনার বাংলা');
  const [fontSize, setFontSize] = useState(40);
  const [embedType, setEmbedType] = useState('link');
  const [includePreload, setIncludePreload] = useState(false);
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

  const getEmbedCode = () => {
    const preloadTag = includePreload ? `<link rel="preload" href="${font.cssUrl}" as="style" />\n` : '';
    if (embedType === 'link') {
        return `${preloadTag}<link href='${font.cssUrl}' rel='stylesheet'>`;
    }
    return `@import url('${font.cssUrl}');`;
  }
  
  const getCssCode = () => {
    return `body {\n  font-family: '${font.fontFamily}', sans-serif;\n  font-weight: 400;\n  font-style: normal;\n}`;
  }

  const minifiedCssUrl = font.cssUrl.replace('.css', '.min.css');


  return (
    <div className="min-h-screen bg-background text-foreground">
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
        <div className="bg-card p-6 rounded-lg border shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
                <input
                    type="text"
                    className="w-full md:w-1/2 p-2 border rounded-md bg-muted/50"
                    placeholder="এখানে লিখে প্রিভিউ দেখুন"
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                />
                <div className="flex items-center gap-4 w-full md:w-1/2">
                    <select value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="p-2 border rounded-md bg-muted/50">
                        <option value="20">20px</option>
                        <option value="24">24px</option>
                        <option value="32">32px</option>
                        <option value="40">40px</option>
                        <option value="48">48px</option>
                    </select>
                    <input
                        type="range"
                        min="12"
                        max="128"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <span className="font-semibold text-right w-20">{fontSize}px</span>
                </div>
            </div>

            <div className="space-y-6" style={{ fontFamily: font.fontFamily, fontSize: `${fontSize}px` }}>
                <div><span className="text-sm text-muted-foreground">Light 300</span><p style={{ fontWeight: 300 }}>{previewText}</p></div>
                <div><span className="text-sm text-muted-foreground">Regular 400</span><p style={{ fontWeight: 400 }}>{previewText}</p></div>
                <div><span className="text-sm text-muted-foreground">Semi Bold 600</span><p style={{ fontWeight: 600 }}>{previewText}</p></div>
                <div><span className="text-sm text-muted-foreground">Bold 700</span><p style={{ fontWeight: 700 }}>{previewText}</p></div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Embed</h3>
                    <Tabs value={embedType} onValueChange={setEmbedType}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="link">&lt;link&gt;</TabsTrigger>
                            <TabsTrigger value="import">@import</TabsTrigger>
                        </TabsList>
                        <TabsContent value="link" className="space-y-2">
                             <p className="text-sm text-muted-foreground">নিচের কোডটি কপি করে আপনার HTML ডকুমেন্টের &lt;head&gt; অংশে পেস্ট করুন।</p>
                            {embedType === 'link' && (
                                <div className="flex items-center space-x-2">
                                <Checkbox id="preload" checked={includePreload} onCheckedChange={(checked) => setIncludePreload(!!checked)} />
                                <label
                                    htmlFor="preload"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Preload লিঙ্ক অন্তর্ভুক্ত করুন
                                </label>
                                </div>
                            )}
                        </TabsContent>
                         <TabsContent value="import">
                             <p className="text-sm text-muted-foreground">এই নিয়মটি আপনার CSS ফাইলের শুরুতে যোগ করুন।</p>
                        </TabsContent>
                    </Tabs>

                    <div className="relative mt-2">
                        <pre className="text-sm bg-gray-900 text-white p-4 rounded-md overflow-x-auto"><code>{getEmbedCode()}</code></pre>
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:bg-gray-700" onClick={() => copyToClipboard(getEmbedCode(), 'Embed কোড')}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-2">CSS</h3>
                    <p className="text-sm text-muted-foreground mb-2">ফন্টটি ব্যবহার করার জন্য নিচের CSS কোডটি অনুসরণ করুন।</p>
                     <div className="relative mt-2">
                        <pre className="text-sm bg-gray-900 text-white p-4 rounded-md overflow-x-auto"><code>{getCssCode()}</code></pre>
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:bg-gray-700" onClick={() => copyToClipboard(getCssCode(), 'CSS কোড')}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                 <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>পারফরম্যান্স টিপ</AlertTitle>
                  <AlertDescription>
                    ভালো পারফরম্যান্স এবং দ্রুত লোডিং সময়ের জন্য, আপনি <code>.min.css</code> সংস্করণ ব্যবহার করতে পারেন।
                    <div className="mt-2 space-y-1 text-xs">
                        <p><strong>Standard CSS:</strong> <a href={font.cssUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{font.cssUrl}</a></p>
                        <p><strong>Minified CSS:</strong> <a href={minifiedCssUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{minifiedCssUrl}</a></p>
                    </div>
                  </AlertDescription>
                </Alert>
            </div>
             <div className="space-y-8">
                 <div>
                    <h3 className="text-xl font-bold mb-4">{font.name} ফন্ট সম্পর্কে</h3>
                    <div className="bg-card p-4 rounded-lg border shadow-sm">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <strong className="text-muted-foreground">Family</strong>
                            <span className="col-span-2">{font.name}</span>
                            <strong className="text-muted-foreground">Total Styles</strong>
                            <span className="col-span-2">{font.styles.length}</span>
                             <strong className="text-muted-foreground">Category</strong>
                            <span className="col-span-2">{font.category}</span>
                            <strong className="text-muted-foreground">Designer</strong>
                            <span className="col-span-2">{font.designer}</span>
                            <strong className="text-muted-foreground">License</strong>
                            <span className="col-span-2">This font is licensed under the SIL Open Font License. You can use and embed this font in web pages and documents. This license is available with a FAQ at <a href="https://openfontlicense.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">openfontlicense.org</a>.</span>
                        </div>
                    </div>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold mb-4">গ্লিফস (Glyphs)</h3>
                     <p className="text-sm text-muted-foreground mb-4">এখানে ফন্টের গ্লিফগুলোর একটি অংশ দেখানো হয়েছে। সম্পূর্ণ সেট দেখতে টাইপ টেস্টার ব্যবহার করুন।</p>
                    <div className="bg-card p-4 rounded-lg border shadow-sm" style={{ fontFamily: font.fontFamily }}>
                        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2 text-2xl text-center">
                            {GLYPH_SET.split('').map((char, index) => (
                                <div key={index} className="flex items-center justify-center p-1 rounded-md hover:bg-muted">{char}</div>
                            ))}
                        </div>
                    </div>
                 </div>
             </div>
        </div>
      </main>

       <footer className="bg-card border-t mt-16 py-6">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} বাংলা ফন্ট সিডিএন। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
      </footer>
    </div>
  );
}

    