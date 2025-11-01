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
  fontSize: number;
  previewText: string;
}

export default function FontCard({ font, fontSize, previewText }: FontCardProps) {
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
    <Link href={`/font/${font.id}`} className="block">
      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full p-6">
        <CardHeader className="p-0">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-xl">{font.name}</CardTitle>
              <CardDescription>ডিজাইনার: {font.designer}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow min-h-[120px] flex items-center justify-center p-0 my-4">
          <p
            className="text-center w-full break-words"
            style={{ fontFamily: font.fontFamily, fontSize: `40px` }}
          >
            {previewText.split(' ')[0] || 'আমার'} সোনার বাংলা
          </p>
        </CardContent>
        <CardFooter className="flex-col items-center gap-4 p-0 mt-auto">
          <div className="flex justify-between w-full items-center text-sm text-muted-foreground mb-4">
            <span>{font.category} ও ANSI | {font.styles.length} স্টাইল</span>
            <div className="flex gap-4">
              <button onClick={handleLike} className="flex items-center gap-1.5">
                  <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                  <span>{likes.toLocaleString('bn-BD')}</span>
              </button>
              <div className="flex items-center gap-1.5">
                  <Download className="h-4 w-4" />
                  <span>{downloads.toLocaleString('bn-BD')}</span>
              </div>
            </div>
          </div>
          <Button onClick={handleDownload} className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            <Download className="mr-2 h-4 w-4" />
            ডাউনলোড
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
