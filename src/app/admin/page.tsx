'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Type,
  Settings,
  GitBranch,
  Menu,
  LogOut,
  LogIn,
  Heart,
  Download,
  Clock,
  FolderOpen,
} from 'lucide-react';
import type { Font } from '@/types/font';

interface Stats {
  totalFonts: number;
  totalLikes: number;
  totalDownloads: number;
  lastUpdate: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/admin', label: 'ড্যাশবোর্ড', icon: <LayoutDashboard className="h-5 w-5" /> },
  { href: '/admin/fonts', label: 'ফন্ট ব্যবস্থাপনা', icon: <Type className="h-5 w-5" /> },
  { href: '/admin/settings', label: 'সেটিংস', icon: <Settings className="h-5 w-5" /> },
  { href: '/admin/github', label: 'GitHub সিঙ্ক', icon: <GitBranch className="h-5 w-5" /> },
];

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Link href="/admin" onClick={onNavigate}>
          <h2 className="text-xl font-bold text-[#d32f2f] flex items-center gap-2">
            <Type className="h-6 w-6" />
            বাংলা ফন্ট সিডিএন
          </h2>
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          অ্যাডমিন প্যানেল
        </p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#d32f2f] text-white shadow-md shadow-red-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 dark:text-gray-400">
            <LogIn className="h-5 w-5" />
            সাইটে যান
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
          onClick={async () => {
            await fetch('/api/admin/auth', { method: 'DELETE' });
            window.location.href = '/admin/login';
          }}
        >
          <LogOut className="h-5 w-5" />
          লগআউট
        </Button>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalFonts: 0,
    totalLikes: 0,
    totalDownloads: 0,
    lastUpdate: '-',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth');
        const data = await response.json();

        if (!data.authenticated) {
          router.push('/admin/login');
          return;
        }

        setAuthenticated(true);
        await loadStats();
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const loadStats = async () => {
    try {
      const response = await fetch('/api/fonts');
      const data = await response.json();
      const fonts: Font[] = data.fonts || [];

      const totalLikes = fonts.reduce((sum: number, f: Font) => sum + (f.likes || 0), 0);
      const totalDownloads = fonts.reduce((sum: number, f: Font) => sum + (f.downloads || 0), 0);
      const dates = fonts
        .map((f: Font) => new Date(f.dateAdded).getTime())
        .filter((d: number) => !isNaN(d));
      const lastUpdate = dates.length > 0
        ? new Date(Math.max(...dates)).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '-';

      setStats({
        totalFonts: fonts.length,
        totalLikes,
        totalDownloads,
        lastUpdate,
      });
    } catch {
      // stats remain default
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-10 w-10 text-[#d32f2f]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  const statCards = [
    {
      title: 'মোট ফন্ট',
      value: stats.totalFonts,
      icon: <FolderOpen className="h-6 w-6" />,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      title: 'মোট লাইক',
      value: stats.totalLikes.toLocaleString('bn-BD'),
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-pink-500',
      lightBg: 'bg-pink-50 dark:bg-pink-950/30',
    },
    {
      title: 'মোট ডাউনলোড',
      value: stats.totalDownloads.toLocaleString('bn-BD'),
      icon: <Download className="h-6 w-6" />,
      color: 'bg-green-500',
      lightBg: 'bg-green-50 dark:bg-green-950/30',
    },
    {
      title: 'সর্বশেষ আপডেট',
      value: stats.lastUpdate,
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-orange-500',
      lightBg: 'bg-orange-50 dark:bg-orange-950/30',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40 flex items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SheetTitle className="sr-only">নেভিগেশন মেনু</SheetTitle>
            <SidebarContent pathname={pathname} />
          </SheetContent>
        </Sheet>
        <h1 className="ml-3 text-lg font-bold text-[#d32f2f]">এডমিন প্যানেল</h1>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              ড্যাশবোর্ড
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              আপনার বাংলা ফন্ট সিডিএন এর সামগ্রিক পরিসংখ্যান
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {statCards.map((card) => (
              <Card key={card.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </CardTitle>
                  <div className={`${card.color} text-white p-2 rounded-lg`}>
                    {card.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  দ্রুত কাজ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/fonts/new">
                  <Button className="w-full justify-start gap-3 bg-[#d32f2f] hover:bg-[#b71c1c] text-white h-12">
                    <Type className="h-5 w-5" />
                    নতুন ফন্ট যোগ করুন
                  </Button>
                </Link>
                <Link href="/admin/fonts">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <FolderOpen className="h-5 w-5" />
                    সকল ফন্ট দেখুন
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <Settings className="h-5 w-5" />
                    সেটিংস পরিবর্তন করুন
                  </Button>
                </Link>
                <Link href="/admin/github">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <GitBranch className="h-5 w-5" />
                    GitHub এ সিঙ্ক করুন
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  সিস্টেম তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">সিস্টেম</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">বাংলা ফন্ট সিডিএন</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">ফ্রেমওয়ার্ক</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Next.js</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">ভার্সন</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">১.০.০</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">স্ট্যাটাস</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      সচল
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
