'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Logo from '@/components/icons/Logo';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';

export default function IconsPage() {
  const { toast } = useToast();

  const copyToClipboard = (svgCode: string) => {
    navigator.clipboard.writeText(svgCode);
    toast({
      title: 'কপি হয়েছে!',
      description: 'SVG কোডটি আপনার ক্লিপবোর্ডে কপি করা হয়েছে।',
    });
  };

  const logoSvgString = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.17 -0.17 85.65 62.75' width='24' height='24' fill='currentColor'>
  <path stroke='currentColor' stroke-width='.6' d='M8 34.5 6.7 12.9h1.7l1.3 21.6a28.3 28.3 0 0 0 .4 4q.4 2 1.2 3.7a11 11 0 0 0 2.2 3.3 11.3 11.3 0 0 0 8.2 3.5 13.7 13.7 0 0 0 .2 0q5.6 0 8.7-3.7a11.7 11.7 0 0 0 2-3.8q.6-1.7.9-3.8a28.3 28.3 0 0 0 .1-3.3V20.6a22.7 22.7 0 0 0 0-2.4q-.3-2.6-1.3-4.2a6.6 6.6 0 0 0 0-.1 4.5 4.5 0 0 0-3-2.1l-1.7-.3a9.9 9.9 0 0 0-.1 0 7.1 7.1 0 0 0-1.8.3 4.6 4.6 0 0 0-2.8 2q-1.4 2.2-1.4 6.4a25.2 25.2 0 0 0 0 .1v10.9h-1.8v-11a22 22 0 0 1 .2-2.8q.4-3.1 1.8-5a6.2 6.2 0 0 1 4.1-2.4 9.5 9.5 0 0 1 1.6-.2 9.5 9.5 0 0 1 2.4.3 6.2 6.2 0 0 1 3.6 2.5 9 9 0 0 1 1.2 2.5q.4 1.3.6 2.7a22.8 22.8 0 0 1 .1 2.7v14q0 7.8-3.4 12a11.4 11.4 0 0 1-6.9 3.9 17 17 0 0 1-3.1.3 14.2 14.2 0 0 1-4.6-.7 11.8 11.8 0 0 1-5.2-3.5q-3.7-4.2-4.1-12Zm42.4 27.9h-1.5L32.3 45l1.1-1.3L49 60.5h.8l-1 .6-.1-4.9V1h1.6v61.4Zm-.5-60.9H.2L0 0h49.9v1.5ZM74 14.7v31.8h-1.7V14.6h1.8Zm11.3 16.7H61v-1.6h24.3v1.6ZM61.2 1.5h-12V0H61l.1 1.5Zm-12 9.8V.3h1.1v11h-1.1Z'></path>
</svg>`;

  const iconName = "বাংলা লেখা বৃদ্ধি";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline tracking-tight">
              লোগো ও আইকন
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              আমাদের ওয়েবসাইটের কাস্টম SVG আইকন।
            </p>
          </div>

          <Dialog>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <DialogTrigger asChild>
                <Card
                  className="group flex flex-col items-center justify-center p-4 aspect-square text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:text-primary bg-card active:scale-95"
                >
                  <CardContent className="p-0 flex flex-col items-center justify-center gap-3">
                    <Logo className="w-16 h-16 transition-transform duration-300 group-hover:scale-110" />
                    <p className="text-sm text-muted-foreground group-hover:text-primary truncate">{iconName}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
            </div>

            <DialogContent className="sm:max-w-2xl">
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="bg-muted rounded-lg p-8">
                        <Logo className="h-24 w-24 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold font-headline">{iconName}</h2>
                    
                    <div className="w-full space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">SVG Code</h3>
                        <div className="relative">
                            <Textarea
                                className="min-h-[150px] bg-gray-900 text-white font-mono text-xs pr-12"
                                readOnly
                                value={logoSvgString}
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 text-white hover:bg-gray-700"
                                onClick={() => copyToClipboard(logoSvgString)}
                                >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
          </Dialog>
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
