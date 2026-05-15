'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
  Save,
  Globe,
  Github,
  Sliders,
  Share2,
  Search,
  Loader2,
  Key,
  Bot,
  Info,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { SiteSettings } from '@/types/settings';
import { POPULAR_OPENROUTER_MODELS } from '@/lib/openrouter';

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

const defaultSettings: SiteSettings = {
  siteName: '',
  siteDescription: '',
  siteUrl: '',
  contactEmail: '',
  githubRepo: '',
  githubOwner: '',
  adminPassword: '',
  fontsPerPage: 12,
  enableAiPairing: true,
  enableDownloads: true,
  enableLikes: true,
  enableRegistration: false,
  openrouterApiKey: '',
  openrouterModel: 'google/gemini-2.5-flash-preview',
  openrouterSiteUrl: 'https://banglafontcdn.pages.dev',
  openrouterSiteName: 'BanglaFontCDN',
  socialLinks: {
    facebook: '',
    twitter: '',
    github: '',
    youtube: '',
  },
  seo: {
    ogImage: '',
    defaultKeywords: [],
  },
  updatedAt: '',
};

interface EnvStatus {
  githubToken: boolean;
  adminPassword: boolean;
  openrouterApiKey: boolean;
  openrouterModel: boolean;
  settingsJson: boolean;
}

function EnvBadge({ label, active, info }: { label: string; active: boolean; info?: string }) {
  return (
    <div className={`flex items-center justify-between px-4 py-2.5 rounded-lg border ${
      active
        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{label}</span>
      <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
        active
          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-gray-400'}`} />
        {active ? (info ? `সেট (${info})` : 'সেট') : 'সেট নেই'}
      </span>
    </div>
  );
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [envStatus, setEnvStatus] = useState<EnvStatus | null>(null);

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
        await loadSettings();
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      if (data.settings) {
        setSettings({
          ...defaultSettings,
          ...data.settings,
          socialLinks: {
            facebook: '',
            twitter: '',
            github: '',
            youtube: '',
            ...data.settings.socialLinks,
          },
          seo: {
            ogImage: '',
            defaultKeywords: [],
            ...data.settings.seo,
          },
        });
      }
      // env var স্ট্যাটাস সেভ করুন
      if (data.envStatus) {
        setEnvStatus(data.envStatus);
      }
    } catch {
      toast({
        title: 'ত্রুটি',
        description: 'সেটিংস লোড করতে সমস্যা হয়েছে',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...settings,
        socialLinks: {
          facebook: settings.socialLinks.facebook || undefined,
          twitter: settings.socialLinks.twitter || undefined,
          github: settings.socialLinks.github || undefined,
          youtube: settings.socialLinks.youtube || undefined,
        },
        seo: {
          ...settings.seo,
          defaultKeywords: settings.seo.defaultKeywords.filter((k) => k.trim() !== ''),
        },
      };

      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'সফল',
          description: 'সেটিংস সফলভাবে সংরক্ষণ হয়েছে',
        });
        if (data.settings) {
          setSettings({
            ...defaultSettings,
            ...data.settings,
            socialLinks: {
              facebook: '',
              twitter: '',
              github: '',
              youtube: '',
              ...data.settings.socialLinks,
            },
            seo: {
              ogImage: '',
              defaultKeywords: [],
              ...data.settings.seo,
            },
          });
        }
      } else {
        toast({
          title: 'ত্রুটি',
          description: data.error || 'সেটিংস সংরক্ষণ করতে সমস্যা হয়েছে',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'ত্রুটি',
        description: 'সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateSocial = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value },
    }));
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
        <h1 className="ml-3 text-lg font-bold text-[#d32f2f]">সেটিংস</h1>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              সেটিংস
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              আপনার সাইটের সেটিংস পরিবর্তন করুন
            </p>
          </div>

          {/* Environment Variables স্ট্যাটাস */}
          {envStatus && (
            <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">
                      Environment Variables স্ট্যাটাস
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      Cloudflare Pages Dashboard > Settings > Environment Variables
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <EnvBadge label="GITHUB_TOKEN" active={envStatus.githubToken} />
                  <EnvBadge label="ADMIN_PASSWORD" active={envStatus.adminPassword} />
                  <EnvBadge label="OPENROUTER_API_KEY" active={envStatus.openrouterApiKey} />
                  <EnvBadge label="OPENROUTER_MODEL" active={envStatus.openrouterModel} />
                  <EnvBadge label="settings.json" active={envStatus.settingsJson} info="GitHub" />
                </div>
                <div className="mt-4 p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    <strong>অগ্রাধিকার ক্রম:</strong> Environment Variable (Cloudflare Secret) > settings.json (অ্যাডমিন প্যানেল) > কোড ডিফল্ট। Secret ভ্যারিয়েবলগুলো Cloudflare Dashboard থেকে Encrypt করে সেট করুন।
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* সাইট তথ্য */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">
                      সাইট তথ্য
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      সাইটের মৌলিক তথ্য কনফিগার করুন
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName" className="text-gray-700 dark:text-gray-300">
                      সাইটের নাম
                    </Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => updateField('siteName', e.target.value)}
                      placeholder="বাংলা ফন্ট সিডিএন"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-gray-700 dark:text-gray-300">
                      যোগাযোগ ইমেইল
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                      placeholder="email@example.com"
                      className="h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription" className="text-gray-700 dark:text-gray-300">
                    সাইটের বিবরণ
                  </Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => updateField('siteDescription', e.target.value)}
                    placeholder="সাইটের বিবরণ লিখুন..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl" className="text-gray-700 dark:text-gray-300">
                    সাইটের URL
                  </Label>
                  <Input
                    id="siteUrl"
                    value={settings.siteUrl}
                    onChange={(e) => updateField('siteUrl', e.target.value)}
                    placeholder="https://example.com"
                    className="h-11"
                  />
                </div>
              </CardContent>
            </Card>

            {/* GitHub তথ্য */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">
                      GitHub তথ্য
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      GitHub রিপোজিটরির তথ্য কনফিগার করুন
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubOwner" className="text-gray-700 dark:text-gray-300">
                      GitHub মালিক
                    </Label>
                    <Input
                      id="githubOwner"
                      value={settings.githubOwner}
                      onChange={(e) => updateField('githubOwner', e.target.value)}
                      placeholder="username"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="githubRepo" className="text-gray-700 dark:text-gray-300">
                      GitHub রিপোজিটরি
                    </Label>
                    <Input
                      id="githubRepo"
                      value={settings.githubRepo}
                      onChange={(e) => updateField('githubRepo', e.target.value)}
                      placeholder="repository-name"
                      className="h-11"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ফিচার সেটিংস */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <Sliders className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">
                      ফিচার সেটিংস
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      সাইটের ফিচার চালু বা বন্ধ করুন
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fontsPerPage" className="text-gray-700 dark:text-gray-300">
                    প্রতি পাতায় ফন্ট সংখ্যা
                  </Label>
                  <Input
                    id="fontsPerPage"
                    type="number"
                    min={1}
                    max={100}
                    value={settings.fontsPerPage}
                    onChange={(e) =>
                      updateField('fontsPerPage', parseInt(e.target.value) || 12)
                    }
                    className="h-11 w-full max-w-xs"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        AI ফন্ট পেয়ারিং
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        AI দিয়ে ফন্ট পেয়ারিং সুবিধা
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableAiPairing}
                      onCheckedChange={(checked) => updateField('enableAiPairing', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ডাউনলোড
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ফন্ট ডাউনলোড সুবিধা
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableDownloads}
                      onCheckedChange={(checked) => updateField('enableDownloads', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        লাইক
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ফন্টে লাইক সুবিধা
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableLikes}
                      onCheckedChange={(checked) => updateField('enableLikes', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        রেজিস্ট্রেশন
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ব্যবহারকারী রেজিস্ট্রেশন সুবিধা
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableRegistration}
                      onCheckedChange={(checked) => updateField('enableRegistration', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* OpenRouter AI সেটিংস */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">
                      OpenRouter AI সেটিংস
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      AI ফন্ট পেয়ারিং-এর জন্য OpenRouter API কনফিগার করুন
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
                  <Info className="h-5 w-5 text-indigo-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">
                    OpenRouter থেকে ফ্রি API Key নিন:{" "}
                    <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-indigo-900 dark:hover:text-indigo-100">
                      openrouter.ai/keys
                    </a>
                    {" "}— ফ্রি মডেল ব্যবহার করলে কোনো খরচ নেই।
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="openrouterApiKey" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    OpenRouter API Key
                  </Label>
                  <Input
                    id="openrouterApiKey"
                    type="password"
                    value={settings.openrouterApiKey}
                    onChange={(e) => updateField('openrouterApiKey', e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="h-11"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    আপনার OpenRouter API Key এখানে পেস্ট করুন
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="openrouterModel" className="text-gray-700 dark:text-gray-300">
                    AI মডেল নির্বাচন
                  </Label>
                  <select
                    id="openrouterModel"
                    value={settings.openrouterModel}
                    onChange={(e) => updateField('openrouterModel', e.target.value)}
                    className="h-11 w-full max-w-md rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#d32f2f] focus:border-transparent"
                  >
                    {POPULAR_OPENROUTER_MODELS.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.id})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ফ্রি মডেল চিহ্নিত হয়েছে — পেইড মডেলে ক্রেডিট প্রয়োজন
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openrouterSiteUrl" className="text-gray-700 dark:text-gray-300">
                      সাইট URL (ঐচ্ছিক)
                    </Label>
                    <Input
                      id="openrouterSiteUrl"
                      value={settings.openrouterSiteUrl}
                      onChange={(e) => updateField('openrouterSiteUrl', e.target.value)}
                      placeholder="https://banglafontcdn.pages.dev"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="openrouterSiteName" className="text-gray-700 dark:text-gray-300">
                      সাইট নাম (ঐচ্ছিক)
                    </Label>
                    <Input
                      id="openrouterSiteName"
                      value={settings.openrouterSiteName}
                      onChange={(e) => updateField('openrouterSiteName', e.target.value)}
                      placeholder="BanglaFontCDN"
                      className="h-11"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* সোশ্যাল লিঙ্ক */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                    <Share2 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">
                      সোশ্যাল লিঙ্ক
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      সোশ্যাল মিডিয়া লিঙ্ক কনফিগার করুন
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="text-gray-700 dark:text-gray-300">
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      value={settings.socialLinks.facebook || ''}
                      onChange={(e) => updateSocial('facebook', e.target.value)}
                      placeholder="https://facebook.com/..."
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="text-gray-700 dark:text-gray-300">
                      Twitter / X
                    </Label>
                    <Input
                      id="twitter"
                      value={settings.socialLinks.twitter || ''}
                      onChange={(e) => updateSocial('twitter', e.target.value)}
                      placeholder="https://twitter.com/..."
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialGithub" className="text-gray-700 dark:text-gray-300">
                      GitHub
                    </Label>
                    <Input
                      id="socialGithub"
                      value={settings.socialLinks.github || ''}
                      onChange={(e) => updateSocial('github', e.target.value)}
                      placeholder="https://github.com/..."
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="text-gray-700 dark:text-gray-300">
                      YouTube
                    </Label>
                    <Input
                      id="youtube"
                      value={settings.socialLinks.youtube || ''}
                      onChange={(e) => updateSocial('youtube', e.target.value)}
                      placeholder="https://youtube.com/..."
                      className="h-11"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">
                      SEO
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      সার্চ ইঞ্জিন অপটিমাইজেশন সেটিংস
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ogImage" className="text-gray-700 dark:text-gray-300">
                    OG ইমেজ
                  </Label>
                  <Input
                    id="ogImage"
                    value={settings.seo.ogImage}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, ogImage: e.target.value },
                      }))
                    }
                    placeholder="/og-image.png"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultKeywords" className="text-gray-700 dark:text-gray-300">
                    ডিফল্ট কীওয়ার্ড
                  </Label>
                  <Textarea
                    id="defaultKeywords"
                    value={settings.seo.defaultKeywords.join(', ')}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        seo: {
                          ...prev.seo,
                          defaultKeywords: e.target.value
                            .split(',')
                            .map((k) => k.trim())
                            .filter((k) => k !== ''),
                        },
                      }))
                    }
                    placeholder="বাংলা ফন্ট, বাংলাদেশ, ফ্রি ফন্ট"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    কমা দিয়ে আলাদা করুন
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end pb-8">
              <Button
                type="submit"
                className="bg-[#d32f2f] hover:bg-[#b71c1c] text-white h-12 px-8 gap-2 font-semibold"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    সংরক্ষণ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    সেটিংস সংরক্ষণ করুন
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
