
'use client';

import { useState, useEffect } from 'react';
import type { Font } from '@/types/font';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link';
import { useFavorites } from '@/hooks/use-favorites';
import { useFirestore, useDoc } from '@/firebase';
import { doc, runTransaction } from 'firebase/firestore';

interface FontCardProps {
  font: Font;
  previewText: string;
  fontSize: number;
}

export default function FontCard({ font: initialFont, previewText, fontSize }: FontCardProps) {
  const firestore = useFirestore();
  const fontRef = doc(firestore, 'fonts', initialFont.id);
  const { data: font } = useDoc<Font>(fontRef, initialFont);
  
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.includes(font.id);
  
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

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    toggleFavorite(font.id);

    try {
      await runTransaction(firestore, async (transaction) => {
        const fontDoc = await transaction.get(fontRef);
        if (!fontDoc.exists()) {
          throw "Document does not exist!";
        }

        const newLikes = fontDoc.data().likes + (isFavorited ? -1 : 1);
        transaction.update(fontRef, { likes: newLikes });
      });

      toast({
        title: isFavorited ? 'পছন্দ থেকে সরানো হয়েছে' : 'পছন্দের তালিকায় যোগ হয়েছে',
        description: `${font.name} ফন্টটি আপনার পছন্দের তালিকা থেকে ${isFavorited ? 'সরানো হয়েছে' : 'যোগ হয়েছে'}।`,
      });

    } catch (error) {
      console.error("Transaction failed: ", error);
      // Revert the local state if transaction fails
      toggleFavorite(font.id);
      toast({
        variant: "destructive",
        title: "একটি সমস্যা হয়েছে!",
        description: "পুনরায় চেষ্টা করুন।",
      });
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    try {
      await runTransaction(firestore, async (transaction) => {
        const fontDoc = await transaction.get(fontRef);
        if (!fontDoc.exists()) {
          throw "Document does not exist!";
        }
        const newDownloads = fontDoc.data().downloads + 1;
        transaction.update(fontRef, { downloads: newDownloads });
      });

      const a = document.createElement('a');
      a.href = font.fileUrl;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({
        title: "ডাউনলোড শুরু হয়েছে!",
        description: `${font.name} ফন্টটি ডাউনলোড হচ্ছে।`,
      });
    } catch (error) {
        console.error("Transaction failed: ", error);
        toast({
            variant: "destructive",
            title: "ডাউনলোড ব্যর্থ হয়েছে",
            description: "পুনরায় চেষ্টা করুন।",
        });
    }
  };
  
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
