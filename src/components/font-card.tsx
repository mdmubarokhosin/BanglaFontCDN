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
}

export default function FontCard({ font }: FontCardProps) {
  const [likes, setLikes] = useState(font.likes);
  const [downloads, setDownloads] = useState(font.downloads);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const [previewText, setPreviewText] = useState('আমার সোনার বাংলা');

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
    toast({
      title: "ডাউনলোড শুরু হয়েছে!",
      description: `${font.name} ফন্টটি ডাউনলোড হচ্ছে।`,
    })
  };

  return (
    <Link href={`/font/${font.id}`} className="block h-full">
      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full p-6 bg-card rounded-lg border shadow-sm">
        <CardHeader className="p-0">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-xl">{font.name}</CardTitle>
              <CardDescription>ডিজাইনার: {font.designer}</CardDescription>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
              <span>{likes.toLocaleString('bn-BD')}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow min-h-[120px] flex items-center justify-center p-0 my-4">
          <p
            className="text-center w-full break-words"
            style={{ fontFamily: font.fontFamily, fontSize: `40px` }}
          >
            {previewText}
          </p>
        </CardContent>
        <CardFooter className="flex-col items-center gap-4 p-0 mt-auto">
           <Button onClick={handleDownload} className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            <Download className="mr-2 h-4 w-4" />
            ডাউনলোড ({downloads.toLocaleString('bn-BD')})
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
