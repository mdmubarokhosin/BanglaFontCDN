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
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  RefreshCw,
  CheckCircle2,
  XCircle,
  FileJson,
  Clock,
  Loader2,
  GitCommit,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface SyncFileResult {
  success: boolean;
  error?: string;
}

interface SyncResult {
  success: boolean;
  message?: string;
  error?: string;
  results?: {
    fonts: SyncFileResult;
    settings: SyncFileResult;
  };
  syncedAt?: string;
  fontsError?: string;
  settingsError?: string;
  details?: string;
}

const filesToSync = [
  {
    key: 'fonts',
    name: 'fonts.json',
    path: 'src/data/fonts.json',
    description: 'সকল ফন্টের তথ্য ও কনফিগারেশন',
  },
  {
    key: 'settings',
    name: 'settings.json',
    path: 'src/data/settings.json',
    description: 'সাইট সেটিংস ও কনফিগারেশন',
  },
];

export default function AdminGithubPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSync = async () => {
    setSyncing(true);
    setSyncResult(null);

    try {
      const response = await fetch('/api/github/sync', {
        method: 'POST',
      });

      const data: SyncResult = await response.json();

      setSyncResult(data);

      if (data.success) {
        toast({
          title: 'সফল',
          description: data.message || 'GitHub এ সফলভাবে সিঙ্ক করা হয়েছে',
        });
        if (data.syncedAt) {
          setSyncedAt(data.syncedAt);
        }
      } else {
        toast({
          title: 'ত্রুটি',
          description: data.error || 'সিঙ্ক করতে সমস্যা হয়েছে',
          variant: 'destructive',
        });
      }
    } catch {
      const errorResult: SyncResult = {
        success: false,
        error: 'সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন',
      };
      setSyncResult(errorResult);
      toast({
        title: 'ত্রুটি',
        description: 'সার্ভারে সমস্যা হয়েছে',
        variant: 'destructive',
      });
    } finally {
      setSyncing(false);
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

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40 flex items-center px-4">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SheetTitle className="sr-only">নেভিগেশন মেনু</SheetTitle>
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
        <h1 className="ml-3 text-lg font-bold text-[#d32f2f]">GitHub সিঙ্ক</h1>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <GitBranch className="h-8 w-8 text-[#d32f2f]" />
              GitHub সিঙ্ক
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              আপনার ডেটা GitHub রিপোজিটরিতে সিঙ্ক করুন
            </p>
          </div>

          {/* Current Sync Status */}
          <Card className="border-0 shadow-lg mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">
                    বর্তমান সিঙ্ক অবস্থা
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    সর্বশেষ GitHub সিঙ্কের তথ্য
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    সিঙ্ক স্ট্যাটাস
                  </span>
                  {syncResult ? (
                    syncResult.success ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        সফল
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30">
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                        ব্যর্থ
                      </Badge>
                    )
                  ) : (
                    <Badge variant="secondary">
                      এখনও সিঙ্ক হয়নি
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    সর্বশেষ সিঙ্ক
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {syncedAt
                      ? new Date(syncedAt).toLocaleString('bn-BD', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '—'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    সিঙ্ক অপারেশন
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {syncing ? 'চলমান...' : syncResult ? 'সম্পন্ন' : 'অপেক্ষমাণ'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Files to Sync */}
          <Card className="border-0 shadow-lg mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <FileJson className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">
                    সিঙ্কের জন্য ফাইল সমূহ
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    নিচের ফাইলগুলো GitHub এ সিঙ্ক হবে
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filesToSync.map((file) => {
                  const fileResult = syncResult?.results?.[file.key as 'fonts' | 'settings'];
                  return (
                    <div
                      key={file.key}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex-shrink-0">
                          <FileJson className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {file.path}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {file.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-3">
                        {syncing ? (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            সিঙ্ক হচ্ছে
                          </Badge>
                        ) : fileResult ? (
                          fileResult.success ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                              সফল
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30">
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              ব্যর্থ
                            </Badge>
                          )
                        ) : (
                          <Badge variant="secondary">পেন্ডিং</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Sync Result Details */}
          {syncResult && syncResult.results && (
            <Card className={`border-0 shadow-lg mb-6 ${syncResult.success ? '' : 'border-l-4 border-l-red-500'}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${syncResult.success ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    <GitCommit className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">
                      সিঙ্ক ফলাফল
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      {syncResult.success
                        ? 'সিঙ্ক অপারেশনের বিস্তারিত ফলাফল'
                        : 'সিঙ্ক অপারেশনে সমস্যা হয়েছে'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filesToSync.map((file) => {
                    const result = syncResult.results?.[file.key as 'fonts' | 'settings'];
                    if (!result) return null;
                    return (
                      <div
                        key={file.key}
                        className={`p-4 rounded-lg border ${
                          result.success
                            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20'
                            : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {result.success ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {file.name}
                            </p>
                            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                              {result.success
                                ? 'সফলভাবে GitHub এ কমিট হয়েছে'
                                : `ত্রুটি: ${result.error || syncResult[`${file.key}Error` as keyof SyncResult] || 'অজানা ত্রুটি'}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {syncedAt && syncResult.success && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>
                      সিঙ্ক সময়:{' '}
                      {new Date(syncedAt).toLocaleString('bn-BD', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Sync Button */}
          <div className="flex justify-center pb-8">
            <Button
              onClick={handleSync}
              className="bg-[#d32f2f] hover:bg-[#b71c1c] text-white h-14 px-10 gap-3 font-semibold text-base"
              disabled={syncing}
            >
              {syncing ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  GitHub এ সিঙ্ক হচ্ছে...
                </>
              ) : (
                <>
                  <RefreshCw className="h-6 w-6" />
                  GitHub এ সিঙ্ক করুন
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
