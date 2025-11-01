
'use client';

import { useState, useEffect } from 'react';
import type { Font } from '@/types/font';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link';

interface FontCardProps {
  font: Font;
  previewText: string;
  fontSize: number;
}

export default function FontCard({ font, previewText, fontSize }: FontCardProps) {
  const [likes, setLikes] = useState(font.likes);
  const [downloads, setDownloads] = useState(font.downloads);
  const [isLiked, setIsLiked] = useState(false);
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
    // Here you would typically also make an API call to update the like count on your server
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
    toast({
      title: "ডাউনলোড শুরু হয়েছে!",
      description: `${font.name} ফন্টটি ডাউনলোড হচ্ছে।`,
    })
    // Here you would typically also make an API call to update the download count on your server
  };

  return (
    <Link href={`/font/${font.id}`} className="block">
      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
        <CardHeader className="flex-row justify-between items-center p-4 border-b">
          <div>
            <CardTitle className="font-headline text-lg">{font.name}</CardTitle>
            <CardDescription className="text-xs">ডিজাইনার: {font.designer}</CardDescription>
          </div>
          <div className="flex items-center gap-3 text-sm">
             <button onClick={handleLike} className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors p-1 -m-1">
                <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                <span className="text-xs font-mono">{likes.toLocaleString('bn-BD')}</span>
            </button>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Download className="h-4 w-4" />
              <span className="text-xs font-mono">{downloads.toLocaleString('bn-BD')}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center p-6 min-h-[150px]">
          <p
            className="text-center w-full break-words"
            style={{ fontFamily: font.fontFamily, fontSize: `${fontSize}px` }}
          >
            {previewText}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

    