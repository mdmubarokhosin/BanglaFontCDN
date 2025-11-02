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
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/header';

interface FontDetailPageClientProps {
    font: Font;
}

const GLYPH_SET = "অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎংঃঁ১২৩৪৫৬৭৮৯০";

const styleNameToWeight: { [key: string]: number } = {
  'পাতলা': 100,
  'Thin': 100,
  'এক্সট্রা লাইট': 200,
  'Extra Light': 200,
  'হালকা': 300,
  'Light': 300,
  'নিয়মিত': 400,
  'Regular': 400,
  'মিডিয়াম': 500,
  'Medium': 500,
  'সেমিবোল্ড': 600,
  'Semi Bold': 600,
  'বোল্ড': 700,
  'Bold': 700,
  'এক্সট্রাবোল্ড': 800,
  'Extra Bold': 800,
  'ব্ল্যাক': 900,
  'Black': 900,
};


export default function FontDetailPageClient({ font }: FontDetailPageClientProps) {
  const [previewText, setPreviewText] = useState('আমার সোনার বাংলা');
  const [fontSize, setFontSize] = useState(48);
  const [embedType, setEmbedType] = useState('link');
  const [includePreload, setIncludePreload] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Inject the font stylesheet into the main document's head for the glyphs and styles section
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
        return font.linkUrl ? `${preloadTag}${font.linkUrl}` : 'ব্যবহারের কোড উপলব্ধ নয়।';
    }
    return font.importUrl || 'ব্যবহারের কোড উপলব্ধ নয়।';
  }
  
  const getCssCode = () => {
    return `body {\n  font-family: ${font.fontFamily};\n  /* Add other styles like font-weight, font-style */\n}`;
  }

  const minifiedCssUrl = font.cssUrl.includes('.min.css') ? font.cssUrl : font.cssUrl.replace('.css', '.min.css');

  const iframeContent = `
    <html>
      <head>
        <link rel="stylesheet" href="${font.cssUrl}" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@100..900&display=swap');
          body {
            font-family: ${font.fontFamily}, 'Noto Serif Bengali', serif;
            font-size: ${fontSize}px;
            text-align: center;
            margin: 0;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: hsl(var(--foreground));
            background-color: transparent;
            word-break: break-word;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        ${previewText || 'আমার সোনার বাংলা'}
      </body>
    </html>
  `;


  return (
    <div className="min-h-screen bg-background text-foreground">
       <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" asChild>
                <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className='hidden sm:inline'>সব ফন্ট</span>
                </Link>
            </Button>
            <h1 className="text-2xl sm:text-4xl font-headline font-bold text-primary text-center">{font.name}</h1>
            <div className="w-16"></div>
        </div>


        <div className="bg-card p-6 md:p-8 rounded-xl border shadow-lg mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Input
                    type="text"
                    className="w-full text-base p-3 border rounded-lg bg-muted/30 focus:ring-primary lg:col-span-2 h-12"
                    placeholder="এখানে লিখে প্রিভিউ দেখুন"
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    aria-label="Preview Text Input"
                />
                <div className="flex items-center gap-4 w-full">
                    <Slider
                        value={[fontSize]}
                        onValueChange={(value) => setFontSize(value[0])}
                        min={12}
                        max={128}
                        step={1}
                        className="w-full"
                        aria-label="Font Size Slider"
                    />
                    <span className="font-semibold text-lg text-right w-24 tabular-nums">{fontSize}px</span>
                </div>
            </div>

            <div className="text-center w-full break-words bg-muted/20 p-0 rounded-lg overflow-hidden">
              <iframe
                srcDoc={iframeContent}
                style={{
                    width: '100%',
                    border: 'none',
                    minHeight: '200px',
                    backgroundColor: 'transparent',
                }}
                title={`Preview for ${font.name}`}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
        </div>
        
        <div className="border-b mb-8">
            <h2 className="text-2xl font-bold mb-4">স্টাইলসমূহ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8" style={{ fontFamily: font.fontFamily }}>
              {font.styles.map((style) => {
                const weight = styleNameToWeight[style] || 400;
                return (
                  <div key={style} className="bg-card border rounded-lg p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-3">
                        <h4 className="font-semibold" style={{ fontFamily: font.fontFamily }}>{style}</h4>
                        <span className="text-sm text-muted-foreground">{weight}</span>
                      </div>
                      <p className="text-2xl break-words" style={{ fontFamily: font.fontFamily, fontWeight: weight, fontSize: '24px' }}>
                        আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-8">
                <div>
                    <h3 className="text-2xl font-bold mb-4">কীভাবে ব্যবহার করবেন</h3>
                    <Tabs value={embedType} onValueChange={setEmbedType} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="link">&lt;link&gt;</TabsTrigger>
                            <TabsTrigger value="import">@import</TabsTrigger>
                        </TabsList>
                        <TabsContent value="link" className="mt-4 space-y-2">
                             <p className="text-sm text-muted-foreground">নিচের কোডটি কপি করে আপনার HTML ডকুমেন্টের &lt;head&gt; অংশে পেস্ট করুন।</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Checkbox id="preload" checked={includePreload} onCheckedChange={(checked) => setIncludePreload(!!checked)} />
                              <label htmlFor="preload" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  Preload লিঙ্ক অন্তর্ভুক্ত করুন (পারফরম্যান্সের জন্য ভালো)
                              </label>
                            </div>
                        </TabsContent>
                         <TabsContent value="import" className="mt-4">
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
                    <h3 className="text-xl font-bold mb-2">CSS Rules</h3>
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
                    দ্রুত লোডিংয়ের জন্য, <code>.min.css</code> সংস্করণ ব্যবহার করুন।
                    <div className="mt-2 space-y-1 text-xs">
                        <p><strong>Standard:</strong> <a href={font.cssUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{font.cssUrl}</a></p>
                        <p><strong>Minified:</strong> <a href={minifiedCssUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{minifiedCssUrl}</a></p>
                    </div>
                  </AlertDescription>
                </Alert>
            </div>
             <div className="lg:col-span-2 space-y-8">
                 <div>
                    <h3 className="text-2xl font-bold mb-4">{font.name} ফন্ট সম্পর্কে</h3>
                    <div className="bg-card p-4 rounded-lg border">
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><strong className="text-muted-foreground">ডিজাইনার</strong> <span className="text-right">{font.designer}</span></div>
                            <div className="flex justify-between"><strong className="text-muted-foreground">বিভাগ</strong> <span className="text-right">{font.category}</span></div>
                            <div className="flex justify-between"><strong className="text-muted-foreground">স্টাইল</strong> <span className="text-right">{font.styles.length}</span></div>
                            <div className="pt-2">
                              <strong className="text-muted-foreground">লাইসেন্স</strong>
                              <p className="text-xs mt-1">
                                {font.id === 'ekushey-azad'
                                  ? 'This font is licensed under the GNU General Public License with a font exception clause. You can use and embed this font in web pages and documents. Learn more at gnu.org/licenses/gpl and font exception clause.'
                                  : `This font is licensed under the SIL Open Font License. You can use it freely in your products & projects. More info at openfontlicense.org`}
                              </p>
                            </div>
                        </div>
                    </div>
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold mb-4">গ্লিফস (Glyphs)</h3>
                     <p className="text-sm text-muted-foreground mb-4">ফন্টের অন্তর্ভুক্ত কিছু অক্ষর।</p>
                    <div className="bg-card p-4 rounded-lg border" style={{ fontFamily: font.fontFamily }}>
                        <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 text-3xl text-center">
                            {GLYPH_SET.split('').map((char, index) => (
                                <div key={index} className="flex items-center justify-center p-1 rounded-md aspect-square hover:bg-muted">{char}</div>
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
