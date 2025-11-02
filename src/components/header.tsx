
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Info, Star, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="md:hidden">
          <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-4">
              <SheetHeader className="border-b pb-4 mb-4">
                <SheetTitle>
                    <Link href="/" onClick={() => setIsDrawerOpen(false)} className="text-2xl font-headline font-bold text-primary">
                        বাংলা ফন্ট সিডিএন
                    </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/80 transition-all hover:bg-muted hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  <span>হোম</span>
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/80 transition-all hover:bg-muted hover:text-foreground"
                >
                  <Info className="h-5 w-5" />
                  <span>আমাদের সম্পর্কে</span>
                </Link>
                <Link
                  href="/documentation"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/80 transition-all hover:bg-muted hover:text-foreground"
                >
                  <BookText className="h-5 w-5" />
                  <span>ডকুমেন্টেশন</span>
                </Link>
                <Link
                  href="/favorites"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/80 transition-all hover:bg-muted hover:text-foreground"
                >
                  <Star className="h-5 w-5" />
                  <span>পছন্দের ফন্ট</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="text-center flex-grow md:flex-grow-0">
          <Link href="/" className="text-2xl md:text-3xl font-headline font-bold text-primary">
            বাংলা ফন্ট সিডিএন
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
           <Button variant="ghost" asChild>
              <Link href="/">হোম</Link>
           </Button>
            <Button variant="ghost" asChild>
              <Link href="/about">আমাদের সম্পর্কে</Link>
           </Button>
            <Button variant="ghost" asChild>
                <Link href="/documentation">ডকুমেন্টেশন</Link>
            </Button>
             <Button variant="ghost" asChild>
                <Link href="/favorites">পছন্দের ফন্ট</Link>
            </Button>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
