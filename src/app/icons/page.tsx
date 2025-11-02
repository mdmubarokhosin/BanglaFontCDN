'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Logo from '@/components/icons/Logo';
import LogoDecrease from '@/components/icons/LogoDecrease';
import BanglaKeyboard from '@/components/icons/BanglaKeyboard';
import BanglaFirstPlaceMedal from '@/components/icons/BanglaFirstPlaceMedal';
import BanglaSecondPlaceMedal from '@/components/icons/BanglaSecondPlaceMedal';
import BanglaThirdPlaceMedal from '@/components/icons/BanglaThirdPlaceMedal';
import BanglaTranslate from '@/components/icons/BanglaTranslate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Copy, X } from 'lucide-react';

const icons = [
  {
    name: "বাংলা লেখা বৃদ্ধি",
    component: Logo,
    svgString: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.17 -0.17 85.65 62.75' fill='currentColor' width='24' height='24'>
  <path stroke='currentColor' stroke-width='.6' d='M8 34.5 6.7 12.9h1.7l1.3 21.6a28.3 28.3 0 0 0 .4 4q.4 2 1.2 3.7a11 11 0 0 0 2.2 3.3 11.3 11.3 0 0 0 8.2 3.5 13.7 13.7 0 0 0 .2 0q5.6 0 8.7-3.7a11.7 11.7 0 0 0 2-3.8q.6-1.7.9-3.8a28.3 28.3 0 0 0 .1-3.3V20.6a22.7 22.7 0 0 0 0-2.4q-.3-2.6-1.3-4.2a6.6 6.6 0 0 0 0-.1 4.5 4.5 0 0 0-3-2.1l-1.7-.3a9.9 9.9 0 0 0-.1 0 7.1 7.1 0 0 0-1.8.3 4.6 4.6 0 0 0-2.8 2q-1.4 2.2-1.4 6.4a25.2 25.2 0 0 0 0 .1v10.9h-1.8v-11a22 22 0 0 1 .2-2.8q.4-3.1 1.8-5a6.2 6.2 0 0 1 4.1-2.4 9.5 9.5 0 0 1 1.6-.2 9.5 9.5 0 0 1 2.4.3 6.2 6.2 0 0 1 3.6 2.5 9 9 0 0 1 1.2 2.5q.4 1.3.6 2.7a22.8 22.8 0 0 1 .1 2.7v14q0 7.8-3.4 12a11.4 11.4 0 0 1-6.9 3.9 17 17 0 0 1-3.1.3 14.2 14.2 0 0 1-4.6-.7 11.8 11.8 0 0 1-5.2-3.5q-3.7-4.2-4.1-12Zm42.4 27.9h-1.5L32.3 45l1.1-1.3L49 60.5h.8l-1 .6-.1-4.9V1h1.6v61.4Zm-.5-60.9H.2L0 0h49.9v1.5ZM74 14.7v31.8h-1.7V14.6h1.8Zm11.3 16.7H61v-1.6h24.3v1.6ZM61.2 1.5h-12V0H61l.1 1.5Zm-12 9.8V.3h1.1v11h-1.1Z'></path>
</svg>`
  },
  {
    name: "বাংলা লেখা হ্রাস",
    component: LogoDecrease,
    svgString: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.17 -0.17 81.65 62.75' fill='currentColor' width='24' height='24'>
  <path stroke='currentColor' stroke-width='.6' d='M8 34.5 6.7 12.9h1.7l1.3 21.6a28.3 28.3 0 0 0 .4 4q.4 2 1.2 3.7a11 11 0 0 0 2.2 3.3 11.3 11.3 0 0 0 8.2 3.5 13.7 13.7 0 0 0 .2 0q5.6 0 8.7-3.7a11.7 11.7 0 0 0 2-3.8q.6-1.7.9-3.8a28.3 28.3 0 0 0 .1-3.3V20.6a22.7 22.7 0 0 0 0-2.4q-.3-2.6-1.3-4.2a6.6 6.6 0 0 0 0-.1 4.5 4.5 0 0 0-3-2.1l-1.7-.3a9.9 9.9 0 0 0-.1 0 7.1 7.1 0 0 0-1.8.3 4.6 4.6 0 0 0-2.8 2q-1.4 2.2-1.4 6.4a25.2 25.2 0 0 0 0 .1v10.9h-1.8v-11a22 22 0 0 1 .2-2.8q.4-3.1 1.8-5a6.2 6.2 0 0 1 4.1-2.4 9.5 9.5 0 0 1 1.6-.2 9.5 9.5 0 0 1 2.4.3 6.2 6.2 0 0 1 3.6 2.5 9 9 0 0 1 1.2 2.5q.4 1.3.6 2.7a22.8 22.8 0 0 1 .1 2.7v14q0 7.8-3.4 12a11.4 11.4 0 0 1-6.9 3.9 17 17 0 0 1-3.1.3 14.2 14.2 0 0 1-4.6-.7 11.8 11.8 0 0 1-5.2-3.5q-3.7-4.2-4.1-12Zm42.4 27.9h-1.5L32.3 45l1.1-1.3L49 60.5h.8l-1 .6-.1-4.9V1h1.6v61.4Zm-.5-60.9H.2L0 0h49.9v1.5Zm31.4 34.9H63.5v-1.7h17.8v1.6ZM61.2 1.5h-12V0H61l.1 1.5Zm-12 9.8V.3h1.1v11h-1.1Z'></path>
</svg>`
  },
  {
    name: "বাংলা কীবোর্ড আইকন",
    component: BanglaKeyboard,
    svgString: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='5.06 5 37.88 38' width='24' height='24'>
  <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'>
  <path d='M13.17 18.57H7.64c-1.15 0-2.08.93-2.08 2.08v19.77c0 1.15.93 2.08 2.08 2.08h32.72c1.15 0 2.08-.93 2.08-2.08V20.65c0-1.15-.93-2.08-2.08-2.08h-5.28'></path>
  <rect width='20.04' height='3.33' x='14.1' y='35.76' rx='.42' ry='.42'></rect>
  <rect width='3.37' height='3.37' x='10.73' y='29.78' rx='.42' ry='.42'></rect>
  <rect width='3.37' height='3.37' x='16.59' y='29.78' rx='.42' ry='.42'></rect>
  <path d='M25.8 30.36v2.37c0 .23-.18.42-.42.42h-2.52a.42.42 0 0 1-.42-.42h0v-2.37'></path>
  <rect width='3.37' height='3.37' x='28.29' y='29.78' rx='.42' ry='.42'></rect>
  <rect width='3.37' height='3.37' x='34.14' y='29.78' rx='.42' ry='.42'></rect>
  <rect width='3.37' height='3.37' x='10.73' y='23.8' rx='.42' ry='.42'></rect>
  <path d='M18.28 27.16H17a.42.42 0 0 1-.42-.42v-.87m15.08 0v.87c0 .23-.2.42-.42.42h-1.27'></path>
  <rect width='3.37' height='3.37' x='34.14' y='23.8' rx='.42' ry='.42'></rect>
  <path d='m34.25 23.88-10.13 7.77L14 23.88a2.1 2.1 0 0 1-.82-1.67V7.18c0-.93.75-1.68 1.68-1.68H33.4c.93 0 1.69.75 1.69 1.68h0v15.03c0 .65-.3 1.27-.83 1.67Z'></path>
  <path d='M25.1 9.99v13c-1.43-3.34-7.25-6.8-7.25-6.8s3.47-3.45 7.26-3.45'></path>
  <path d='M16.09 9.99h11.6c1.23 0 1.96.94 1.96 1.85m2.26-1.85c-1.42 0-2.26.76-2.26 1.85v11.15'></path>
  </g>
</svg>`
  },
  {
    name: "বাংলা প্রথম স্থান পদক আইকন",
    component: BanglaFirstPlaceMedal,
    svgString: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='3.33 -0.47 25.05 32.65' width='24' height='24'>
  <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='.9' d='M6.5 21.3 3.8 29l4.9-1.7 2.8 4.4 2.8-7.8-2.6-2.3zm18.7 0-5.1.3-2.7 2.3 2.8 7.8 2.8-4.4 4.9 1.7zM24 19.6l.3-4.6 3-3.5-3-3.5-.3-4.6-4.7-.4L16 0l-3.5 3-4.7.4L7.4 8l-3 3.5 3 3.5.3 4.6 4.7.3 3.5 3 3.4-3 4.7-.3zm-8.2-1.8a6.4 6.4 0 1 1 0-12.8 6.4 6.4 0 0 1 0 12.8z'></path>
  <text x='15.8' y='15' text-anchor='middle' font-size='12' font-weight='bold' font-family='serif' fill='currentColor'>১</text>
</svg>`
  },
  {
    name: "বাংলা দ্বিতীয় স্থান পদক আইকন",
    component: BanglaSecondPlaceMedal,
    svgString: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='3.33 -0.47 25.05 32.65' width='24' height='24'>
  <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='.9' d='M6.5 21.3 3.8 29l4.9-1.7 2.8 4.4 2.8-7.8-2.6-2.3zm18.7 0-5.1.3-2.7 2.3 2.8 7.8 2.8-4.4 4.9 1.7zM24 19.6l.3-4.6 3-3.5-3-3.5-.3-4.6-4.7-.4L16 0l-3.5 3-4.7.4L7.4 8l-3 3.5 3 3.5.3 4.6 4.7.3 3.5 3 3.4-3 4.7-.3zm-8.2-1.8a6.4 6.4 0 1 1 0-12.8 6.4 6.4 0 0 1 0 12.8z'></path>
  <text x='15.8' y='15' text-anchor='middle' font-size='12' font-weight='bold' font-family='serif' fill='currentColor'>২</text>
</svg>`
  },
  {
    name: "বাংলা তৃতীয় স্থান পদক আইকন",
    component: BanglaThirdPlaceMedal,
    svgString: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='3.33 -0.47 25.05 32.65' width='24' height='24'>
  <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='.9' d='M6.5 21.3 3.8 29l4.9-1.7 2.8 4.4 2.8-7.8-2.6-2.3zm18.7 0-5.1.3-2.7 2.3 2.8 7.8 2.8-4.4 4.9 1.7zM24 19.6l.3-4.6 3-3.5-3-3.5-.3-4.6-4.7-.4L16 0l-3.5 3-4.7.4L7.4 8l-3 3.5 3 3.5.3 4.6 4.7.3 3.5 3 3.4-3 4.7-.3zm-8.2-1.8a6.4 6.4 0 1 1 0-12.8 6.4 6.4 0 0 1 0 12.8z'></path>
  <text x='15.8' y='15' text-anchor='middle' font-size='12' font-weight='bold' font-family='serif' fill='currentColor'>৩</text>
</svg>`
  },
  {
    name: "বাংলা অনুবাদ আইকন",
    component: BanglaTranslate,
    svgString: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='1.6 1.6 20.8 20.8' width='24' height='24'>
  <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='.75' d='M16.92 22a5.08 5.08 0 1 1 0-10.16 5.08 5.08 0 0 1 0 10.16ZM5.02 2h3.92c2.07 0 3.07 1 3.02 3.02v3.92c.05 2.07-.95 3.07-3.02 3.02H5.02C3 12 2 11 2 8.93V5.01C2 3 3 2 5.02 2ZM2 15a7 7 0 0 0 7 7l-1.05-1.75M22 9a7 7 0 0 0-7-7l1.05 1.75'></path>
  <text x='7' y='9.5' fill='currentColor' font-family='serif' font-size='8' text-anchor='middle' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='.15'>অ</text>
  <text x='17' y='19.5' fill='currentColor' font-family='sans-serif' font-size='8' text-anchor='middle' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='.15'>A</text>
</svg>`
  }
];


export default function IconsPage() {
  const { toast } = useToast();
  const [selectedIcon, setSelectedIcon] = useState<(typeof icons)[0] | null>(null);

  const copyToClipboard = (svgCode: string) => {
    navigator.clipboard.writeText(svgCode);
    toast({
      title: 'কপি হয়েছে!',
      description: 'SVG কোডটি আপনার ক্লিপবোর্ডে কপি করা হয়েছে।',
    });
  };

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

          <Dialog open={!!selectedIcon} onOpenChange={(isOpen) => !isOpen && setSelectedIcon(null)}>
            <DialogTrigger asChild>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {icons.map((icon, index) => (
                    <Card
                      key={index}
                      onClick={() => setSelectedIcon(icon)}
                      className="group flex flex-col items-center justify-center p-4 aspect-square text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:text-primary bg-card active:scale-95"
                    >
                      <CardContent className="p-0 flex flex-col items-center justify-center gap-3">
                        <icon.component className="w-16 h-16 transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-sm text-muted-foreground group-hover:text-primary truncate">{icon.name}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </DialogTrigger>
            
            {selectedIcon && (
              <DialogContent className="sm:max-w-2xl p-0">
                  <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="sr-only">{selectedIcon.name}</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center px-6 pb-6 space-y-4 text-center">
                      <div className="bg-muted rounded-lg p-8">
                          <selectedIcon.component className="h-24 w-24 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold font-headline">{selectedIcon.name}</h2>
                      
                      <div className="w-full space-y-2 text-left">
                          <h3 className="text-sm font-medium text-muted-foreground text-center">SVG Code</h3>
                          <div className="relative">
                              <Textarea
                                  className="min-h-[150px] bg-gray-900 text-white font-mono text-xs pr-12"
                                  readOnly
                                  value={selectedIcon.svgString}
                              />
                              <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-2 right-2 text-white hover:bg-gray-700"
                                  onClick={() => copyToClipboard(selectedIcon.svgString)}
                                  >
                                  <Copy className="h-4 w-4" />
                              </Button>
                          </div>
                      </div>
                  </div>
              </DialogContent>
            )}
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
