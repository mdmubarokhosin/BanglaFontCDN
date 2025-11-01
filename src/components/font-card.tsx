'use client';

import { useState, useEffect } from 'react';
import type { Font } from '@/types/font';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Download, Copy, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link';

interface FontCardProps {
  font: Font;
  fontSize: number;
  previewText: string;
}

export default function FontCard({ font, fontSize, previewText }: FontCardProps) {
  const [likes, setLikes] = useState(font.likes);
  const [downloads, setDownloads] = useState(font.downloads);
  const [isLiked, setIsLiked] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [importCopied, setImportCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!font.cssUrl) return;

    const existingLink = document.querySelector(`link[href="${font.cssUrl}"]`);
    if (existingLink) return;

    const link = document.createElement('link');
    link.href = font.cssUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
  }, [font.cssUrl]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDownloads(downloads + 1);
    const a = document.createElement('a');
    a.href = font.fileUrl;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const copyToClipboard = (e: React.MouseEvent, text: string, type: 'link' | 'import') => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'link') {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } else {
        setImportCopied(true);
        setTimeout(() => setImportCopied(false), 2000);
      }
      toast({
        title: "সফল!",
        description: "লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে।",
      })
    });
  };

  return (
    <Link href={`/font/${font.id}`} className="block">
        <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-2xl">{font.name}</CardTitle>
                        <CardDescription>ডিজাইনার: {font.designer}</CardDescription>
                    </div>
                    <Badge variant="secondary">{font.category}</Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-grow min-h-[100px] flex items-center justify-center bg-muted/50 p-6">
                <p
                className="text-center w-full break-words"
                style={{ fontFamily: font.fontFamily, fontSize: `${fontSize}px` }}
                >
                {previewText || 'আমার সোনার বাংলা'}
                </p>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4 p-4 mt-auto">
                <div className="flex justify-between w-full">
                    <div className="flex gap-4">
                        <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center gap-2">
                            <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                            <span>{likes.toLocaleString('bn-BD')}</span>
                        </Button>
                        <div onClick={handleDownload} className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-accent h-9 px-3">
                            <Download className="h-4 w-4" />
                            <span>{downloads.toLocaleString('bn-BD')}</span>
                        </div>
                    </div>
                    <div onClick={handleDownload} className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-accent h-9 px-3">
                        ডাউনলোড
                    </div>
                </div>
                <Tabs defaultValue="link" className="w-full" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="link">{'<link>'}</TabsTrigger>
                        <TabsTrigger value="import">@import</TabsTrigger>
                    </TabsList>
                    <TabsContent value="link">
                        <div className="relative mt-2">
                        <input readOnly value={font.linkUrl} className="bg-muted border rounded-md p-2 pr-10 w-full text-xs" />
                        <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={(e) => copyToClipboard(e, font.linkUrl, 'link')}>
                            {linkCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="import">
                        <div className="relative mt-2">
                            <input readOnly value={font.importUrl} className="bg-muted border rounded-md p-2 pr-10 w-full text-xs" />
                            <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={(e) => copyToClipboard(e, font.importUrl, 'import')}>
                                {importCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardFooter>
        </Card>
    </Link>
  );
}
