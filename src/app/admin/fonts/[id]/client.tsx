'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  ArrowLeft,
  Save,
} from 'lucide-react';
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

export default function AdminEditFontClient({ fontId }: { fontId: string }) {
  const router = useRouter();
  const pathname = `/admin/fonts/${fontId}`;
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fontLoading, setFontLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    designer: '',
    category: '',
    styles: '',
    cssUrl: '',
    fontFamily: '',
    fileUrl: '#',
    importUrl: '',
    linkUrl: '',
    description: '',
    license: '',
    licenseUrl: '',
    tags: '',
    version: '',
    isActive: true,
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
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!authenticated) return;

    const loadFont = async () => {
      try {
        const response = await fetch(`/api/fonts/${fontId}`);
        const data = await response.json();

        if (!data.font) {
          setNotFound(true);
          return;
        }

        const font: Font = data.font;
        setFormData({
          id: font.id || '',
          name: font.name || '',
          designer: font.designer || '',
          category: font.category || '',
          styles: (font.styles || []).join(', '),
          cssUrl: font.cssUrl || '',
          fontFamily: font.fontFamily || '',
          fileUrl: font.fileUrl || '#',
          importUrl: font.importUrl || '',
          linkUrl: font.linkUrl || '',
          description: font.description || '',
          license: font.license || '',
          licenseUrl: font.licenseUrl || '',
          tags: (font.tags || []).join(', '),
          version: font.version || '',
          isActive: font.isActive !== false,
        });
      } catch {
        setNotFound(true);
      } finally {
        setFontLoading(false);
      }
    };
    loadFont();
  }, [authenticated, fontId]);

  const handleCssUrlChange = (cssUrl: string) => {
    let importUrl = '';
    let linkUrl = '';
    if (cssUrl.trim()) {
      importUrl = `@import url('${cssUrl.trim()}');`;
      linkUrl = `<link href='${cssUrl.trim()}' rel='stylesheet'>`;
    }
    setFormData((prev) => ({
      ...prev,
      cssUrl,
      importUrl,
      linkUrl,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const body = {
        ...formData,
        styles: formData.styles
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const response = await fetch(`/api/fonts/${fontId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/fonts');
      } else {
        setError(data.error || 'ফন্ট আপডেট করতে সমস্যা হয়েছে');
      }
    } catch {
      setError('সার্ভারে সমস্যা হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading || fontLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-[#d32f2f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ফন্ট খুঁজে পাওয়া যায়নি
          </h2>
          <Link href="/admin/fonts">
            <Button variant="outline">ফন্ট তালিকায় ফিরে যান</Button>
          </Link>
        </div>
      </div>
    );
  }

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
        <h1 className="ml-3 text-lg font-bold text-[#d32f2f]">ফন্ট সম্পাদনা</h1>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/admin/fonts"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              ফন্ট তালিকায় ফিরে যান
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              ফন্ট সম্পাদনা: {formData.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              ফন্ট আইডি: {fontId}
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  মূল তথ্য
                </CardTitle>
                <CardDescription>ফন্টের প্রাথমিক তথ্য সম্পাদনা করুন</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">আইডি</Label>
                    <Input
                      id="id"
                      value={formData.id}
                      disabled
                      className="bg-gray-100 dark:bg-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">ফন্টের নাম *</Label>
                    <Input
                      id="name"
                      placeholder="ফন্টের বাংলা নাম"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="designer">ডিজাইনার</Label>
                    <Input
                      id="designer"
                      placeholder="ডিজাইনারের নাম"
                      value={formData.designer}
                      onChange={(e) => updateField('designer', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">বিভাগ</Label>
                    <Input
                      id="category"
                      placeholder="যেমন: ইউনিকোড, সানস-সেরিফ"
                      value={formData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="styles">স্টাইল (কমা দিয়ে আলাদা করুন)</Label>
                    <Input
                      id="styles"
                      placeholder="নিয়মিত, বোল্ড, ইটালিক"
                      value={formData.styles}
                      onChange={(e) => updateField('styles', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="version">ভার্সন</Label>
                    <Input
                      id="version"
                      placeholder="1.0.0"
                      value={formData.version}
                      onChange={(e) => updateField('version', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  CDN লিঙ্ক
                </CardTitle>
                <CardDescription>ফন্টের CSS URL এবং অন্যান্য লিঙ্ক</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cssUrl">CSS URL *</Label>
                  <Input
                    id="cssUrl"
                    placeholder="https://example.com/fonts/font.css"
                    value={formData.cssUrl}
                    onChange={(e) => handleCssUrlChange(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Input
                    id="fontFamily"
                    placeholder="'Font Name', sans-serif"
                    value={formData.fontFamily}
                    onChange={(e) => updateField('fontFamily', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileUrl">ফাইল URL</Label>
                  <Input
                    id="fileUrl"
                    placeholder="ডাউনলোড লিঙ্ক"
                    value={formData.fileUrl}
                    onChange={(e) => updateField('fileUrl', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Import URL (স্বয়ংক্রিয়ভাবে তৈরি হয়েছে)</Label>
                  <Textarea
                    value={formData.importUrl}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-900 text-sm"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Link URL (স্বয়ংক্রিয়ভাবে তৈরি হয়েছে)</Label>
                  <Textarea
                    value={formData.linkUrl}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-900 text-sm"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  অতিরিক্ত তথ্য
                </CardTitle>
                <CardDescription>বিবরণ, লাইসেন্স এবং ট্যাগ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">বিবরণ</Label>
                  <Textarea
                    id="description"
                    placeholder="ফন্ট সম্পর্কে বিস্তারিত..."
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="license">লাইসেন্স</Label>
                    <Input
                      id="license"
                      placeholder="OFL, MIT, ইত্যাদি"
                      value={formData.license}
                      onChange={(e) => updateField('license', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseUrl">লাইসেন্স URL</Label>
                    <Input
                      id="licenseUrl"
                      placeholder="https://..."
                      value={formData.licenseUrl}
                      onChange={(e) => updateField('licenseUrl', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">ট্যাগ (কমা দিয়ে আলাদা করুন)</Label>
                  <Input
                    id="tags"
                    placeholder="বাংলা, ইউনিকোড, সেরিফ"
                    value={formData.tags}
                    onChange={(e) => updateField('tags', e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => updateField('isActive', checked)}
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    ফন্ট সক্রিয় রাখুন
                  </Label>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                className="bg-[#d32f2f] hover:bg-[#b71c1c] text-white h-12 px-8"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    আপডেট হচ্ছে...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-5 w-5" />
                    আপডেট সংরক্ষণ করুন
                  </span>
                )}
              </Button>
              <Link href="/admin/fonts">
                <Button type="button" variant="outline" className="h-12 px-8">
                  বাতিল
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
