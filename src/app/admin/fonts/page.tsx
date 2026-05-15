'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  LayoutDashboard,
  Type,
  Settings,
  GitBranch,
  Menu,
  LogOut,
  LogIn,
  Plus,
  Pencil,
  Trash2,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Font } from '@/types/font';

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

export default function AdminFontsPage() {
  const router = useRouter();
  const pathname = '/admin/fonts';
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fonts, setFonts] = useState<Font[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
        await loadFonts();
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const loadFonts = async () => {
    try {
      const response = await fetch('/api/fonts');
      const data = await response.json();
      setFonts(data.fonts || []);
    } catch {
      // error loading fonts
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/fonts/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        setFonts((prev) => prev.filter((f) => f.id !== id));
      }
    } catch {
      // error deleting
    } finally {
      setDeletingId(null);
    }
  };

  const filteredFonts = fonts.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.designer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-[#d32f2f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

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
        <h1 className="ml-3 text-lg font-bold text-[#d32f2f]">ফন্ট ব্যবস্থাপনা</h1>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                ফন্ট ব্যবস্থাপনা
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                মোট {fonts.length}টি ফন্ট
              </p>
            </div>
            <Link href="/admin/fonts/new">
              <Button className="bg-[#d32f2f] hover:bg-[#b71c1c] text-white h-11 gap-2">
                <Plus className="h-5 w-5" />
                নতুন ফন্ট যোগ করুন
              </Button>
            </Link>
          </div>

          <Card className="border-0 shadow-lg mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="ফন্ট খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-gray-900 dark:text-white">সকল ফন্ট</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        নাম
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        ডিজাইনার
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        বিভাগ
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        স্টাইল
                      </th>
                      <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        সক্রিয়
                      </th>
                      <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        ক্রিয়া
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredFonts.map((font) => (
                      <tr
                        key={font.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {font.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {font.id}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {font.designer}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary">{font.category}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {font.styles.length}টি
                        </td>
                        <td className="px-6 py-4 text-center">
                          {font.isActive !== false ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">
                              হ্যাঁ
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                              না
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Link href={`/admin/fonts/${font.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                                  disabled={deletingId === font.id}
                                >
                                  {deletingId === font.id ? (
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>ফন্ট মুছে ফেলুন</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    আপনি কি নিশ্চিত যে আপনি &quot;{font.name}&quot; ফন্টটি মুছে ফেলতে চান?
                                    এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>বাতিল</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(font.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                  >
                                    মুছে ফেলুন
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredFonts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                          <Type className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                          <p className="text-lg font-medium">কোনো ফন্ট পাওয়া যায়নি</p>
                          <p className="text-sm mt-1">অনুসন্ধান পরিবর্তন করে আবার চেষ্টা করুন</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                {filteredFonts.map((font) => (
                  <div key={font.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {font.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {font.designer} · {font.category}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {font.styles.length}টি স্টাইল
                          </Badge>
                          {font.isActive !== false ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 text-xs">
                              সক্রিয়
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">নিষ্ক্রিয়</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Link href={`/admin/fonts/${font.id}`}>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>ফন্ট মুছে ফেলুন</AlertDialogTitle>
                              <AlertDialogDescription>
                                আপনি কি নিশ্চিত যে আপনি &quot;{font.name}&quot; ফন্টটি মুছে ফেলতে চান?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>বাতিল</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(font.id)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                মুছে ফেলুন
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredFonts.length === 0 && (
                  <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                    <Type className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    <p className="text-lg font-medium">কোনো ফন্ট পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
