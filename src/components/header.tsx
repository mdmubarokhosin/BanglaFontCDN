
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Home,
  Info,
  Star,
  BookText,
  Package,
} from 'lucide-react';
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

  const navLinks = [
    { href: '/', icon: Home, label: 'হোম' },
    { href: '/about', icon: Info, label: 'আমাদের সম্পর্কে' },
    { href: '/documentation', icon: BookText, label: 'ডকুমেন্টেশন' },
    { href: '/icons', icon: Package, label: 'আইকন' },
    { href: '/favorites', icon: Star, label: 'পছন্দের ফন্ট' },
  ];

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
            <SheetContent side="left" className="w-[280px] p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle>
                    <Link href="/" onClick={() => setIsDrawerOpen(false)} className="text-2xl font-headline font-bold text-primary">
                        বাংলা ফন্ট সিডিএন
                    </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 p-2">
                <div className="flex flex-col gap-1">
                  {navLinks.map(link => (
                     <Button variant="ghost" asChild key={link.href} className="justify-start">
                        <Link
                            href={link.href}
                            onClick={() => setIsDrawerOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/80 transition-all hover:text-foreground"
                        >
                            <link.icon className="h-5 w-5" />
                            <span>{link.label}</span>
                        </Link>
                    </Button>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="text-center flex-grow md:flex-grow-0">
          <Link href="/" className="text-2xl md:text-3xl font-headline font-bold text-primary">
            বাংলা ফন্ট সিডিএন
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1">
           {navLinks.map(link => (
              <Button variant="ghost" asChild key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </Button>
           ))}
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
