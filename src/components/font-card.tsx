'use client';

import { useState } from 'react';
import type { Font } from '@/types/font';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link';
import { useFavorites } from '@/hooks/use-favorites';

interface FontCardProps {
  font: Font;
  previewText: string;
  fontSize: number;
}

export default function FontCard({ font: initialFont, previewText, fontSize }: FontCardProps) {
  const [font, setFont] = useState<Font>(initialFont);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.includes(font.id);
  
  const { toast } = useToast();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    toggleFavorite(font.id);
    const newLikes = isFavorited ? font.likes - 1 : font.likes + 1;
    setFont(prevFont => ({
        ...prevFont,
        likes: newLikes
    }));

    toast({
        title: isFavorited ? 'পছন্দ থেকে সরানো হয়েছে' : 'পছন্দের তালিকায় যোগ হয়েছে',
        description: `${font.name} ফন্টটি আপনার পছন্দের তালিকা থেকে ${isFavorited ? 'সরানো হয়েছে' : 'যোগ হয়েছে'}।`,
    });
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    setFont(prevFont => ({ ...prevFont, downloads: prevFont.downloads + 1 }));

    const a = document.createElement('a');
    a.href = font.fileUrl;
    a.download = `${font.id}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
        title: "ডাউনলোড শুরু হয়েছে!",
        description: `${font.name} ফন্টটি ডাউনলোড হচ্ছে।`,
    });
  };

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
        ${previewText}
      </body>
    </html>
  `;
  
  return (
    <Link href={`/font/${font.id}`} className="block">
      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full active:scale-[0.98] active:shadow-md">
        <CardHeader className="flex-row justify-between items-center p-4 border-b">
          <div>
            <CardTitle className="font-headline text-lg">{font.name}</CardTitle>
            <CardDescription className="text-xs">ডিজাইনার: {font.designer}</CardDescription>
          </div>
          <div className="flex items-center gap-3 text-sm">
             <button onClick={handleLike} className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-all p-1 -m-1 active:scale-90">
                <Heart className={`h-4 w-4 ${isFavorited ? 'text-red-500 fill-current' : ''}`} />
                <span className="text-xs font-mono">{(font.likes).toLocaleString('bn-BD')}</span>
            </button>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Download className="h-4 w-4" />
              <span className="text-xs font-mono">{font.downloads.toLocaleString('bn-BD')}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center p-0 min-h-[150px]">
          <iframe
              srcDoc={iframeContent}
              style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  minHeight: '150px',
                  backgroundColor: 'transparent',
              }}
              title={`Preview for ${font.name}`}
              sandbox="allow-scripts allow-same-origin"
          />
        </CardContent>
      </Card>
    </Link>
  );
}
