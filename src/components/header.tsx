
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Home,
  Info,
  Star,
  Package,
  BookOpenCheck,
  Feather,
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
import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', icon: Home, label: 'হোম' },
    { href: '/about', icon: Info, label: 'আমাদের সম্পর্কে' },
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
            <SheetContent side="left" className="w-auto bg-card p-4">
              <SheetHeader className="mb-4">
                <SheetTitle>
                    <Link href="/" onClick={() => setIsDrawerOpen(false)} className="text-xl font-headline font-bold text-primary flex items-center justify-center gap-2">
                        <span>বাংলা ফন্ট সিডিএন</span>
                    </Link>
                </SheetTitle>
              </SheetHeader>
              <nav>
                <div className="flex flex-col gap-2">
                  {navLinks.map(link => {
                     const isActive = pathname === link.href;
                     return (
                        <div key={link.href} className="[&:not(:first-child)]:mt-2">
                            <Link
                                href={link.href}
                                onClick={() => setIsDrawerOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-4 py-3 text-foreground transition-all hover:bg-accent/50 hover:text-accent-foreground hover:scale-[1.02] shadow-sm border border-transparent active:scale-[0.98]",
                                    isActive ? "bg-primary/10 text-primary border-primary/20 shadow-lg" : "bg-muted/30"
                                )}
                            >
                                <link.icon className="h-5 w-5" />
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        </div>
                     )
                  })}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="text-center flex-grow md:flex-grow-0">
          <Link href="/" className="text-2xl md:text-3xl font-headline font-bold text-primary flex items-center gap-2 justify-center">
             <Logo className="h-8 w-8 hidden md:block" />
            <span>বাংলা ফন্ট সিডিএন</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1">
           {navLinks.map(link => (
              <Button variant="ghost" asChild key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </Button>
           ))}
        </div>

        <div className='flex items-center'>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
