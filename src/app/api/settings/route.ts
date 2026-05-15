export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { readFile, commitFile } from "@/lib/github";
import type { SiteSettings } from "@/types/settings";

/**
 * সেনসিটিভ ভ্যালু মাস্ক করুন (ক্লায়েন্টে পাঠানোর আগে)
 * API Key ও পাসওয়ার্ড সম্পূর্ণ ভ্যালু দেখাবে না
 */
function maskSensitive(value: string): string {
  if (!value) return "";
  if (value.length <= 8) return "••••••••";
  return value.slice(0, 6) + "••••" + value.slice(-4);
}

/**
 * env var থেকে সেটিংস ফলব্যাক তৈরি করুন
 */
function getEnvOverrides(): Partial<SiteSettings> {
  const overrides: Partial<SiteSettings> = {};

  if (process.env.GITHUB_OWNER) overrides.githubOwner = process.env.GITHUB_OWNER;
  if (process.env.GITHUB_REPO) overrides.githubRepo = process.env.GITHUB_REPO;

  return overrides;
}

/**
 * ডিফল্ট সেটিংস
 */
const defaultSettings: SiteSettings = {
  siteName: "বাংলা ফন্ট সিডিএন",
  siteDescription: "জনপ্রিয় বাংলা ফন্ট খুঁজে নিন এবং ব্যবহার করুন।",
  siteUrl: "https://banglafontcdn.pages.dev",
  contactEmail: "",
  githubRepo: "BanglaFontCDN",
  githubOwner: "mdmubarokhosin",
  adminPassword: "",
  fontsPerPage: 12,
  enableAiPairing: true,
  enableDownloads: true,
  enableLikes: true,
  enableRegistration: false,
  openrouterApiKey: "",
  openrouterModel: "google/gemini-2.5-flash-preview",
  openrouterSiteUrl: "https://banglafontcdn.pages.dev",
  openrouterSiteName: "BanglaFontCDN",
  socialLinks: {},
  seo: {
    ogImage: "/og-image.png",
    defaultKeywords: [],
  },
  updatedAt: new Date().toISOString(),
};

/**
 * settings.json থেকে সেটিংস পড়ুন
 */
async function readSettings(): Promise<SiteSettings> {
  const raw = await readFile("src/data/settings.json");
  if (!raw) return defaultSettings;
  return JSON.parse(raw) as SiteSettings;
}

export async function GET() {
  try {
    const settings = await readSettings();

    // env var ওভাররাইড মার্জ করুন
    const envOverrides = getEnvOverrides();
    const merged: SiteSettings = {
      ...settings,
      ...envOverrides,
      // env var থেকে আসা ভ্যালু অগ্রাধিকার পাবে
      adminPassword: process.env.ADMIN_PASSWORD || settings.adminPassword,
    };

    // সেনসিটিভ ভ্যালু মাস্ক করুন (ক্লায়েন্টে পাঠানোর আগে)
    const safeSettings = {
      ...merged,
      adminPassword: merged.adminPassword ? maskSensitive(merged.adminPassword) : "",
      openrouterApiKey: merged.openrouterApiKey ? maskSensitive(merged.openrouterApiKey) : "",
    };

    // env var সোর্স স্ট্যাটাস যোগ করুন (অ্যাডমিন প্যানেলে দেখানোর জন্য)
    const sourceStatus = {
      githubToken: !!process.env.GITHUB_TOKEN,
      adminPassword: !!process.env.ADMIN_PASSWORD,
      openrouterApiKey: !!process.env.OPENROUTER_API_KEY,
      openrouterModel: !!process.env.OPENROUTER_MODEL,
      settingsJson: true, // settings.json থেকে পড়া হয়েছে
    };

    return NextResponse.json({
      settings: safeSettings,
      envStatus: sourceStatus,
    }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "সেটিংস লোড করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const session = getAdminSession(cookieHeader);

    if (!session.authenticated) {
      return NextResponse.json(
        { error: "অনুমতি দেওয়া হয়নি" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const currentSettings = await readSettings();

    // পাসওয়ার্ড আপডেট: মাস্ক করা ভ্যালু থাকলে আগেরটি রাখুন
    if (body.adminPassword && body.adminPassword.includes("••••")) {
      delete body.adminPassword;
    }

    // OpenRouter API Key আপডেট: মাস্ক করা ভ্যালু থাকলে আগেরটি রাখুন
    if (body.openrouterApiKey && body.openrouterApiKey.includes("••••")) {
      delete body.openrouterApiKey;
    }

    const updatedSettings: SiteSettings = {
      ...currentSettings,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    const jsonContent = JSON.stringify(updatedSettings, null, 2);
    const gitResult = await commitFile(
      "src/data/settings.json",
      jsonContent,
      "Update site settings"
    );

    // সেনসিটিভ ভ্যালু মাস্ক করে রেসপন্স দিন
    const safeSettings = {
      ...updatedSettings,
      adminPassword: updatedSettings.adminPassword ? maskSensitive(updatedSettings.adminPassword) : "",
      openrouterApiKey: updatedSettings.openrouterApiKey ? maskSensitive(updatedSettings.openrouterApiKey) : "",
    };

    return NextResponse.json(
      {
        success: true,
        settings: safeSettings,
        gitSync: gitResult.success,
        gitError: gitResult.error,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "সেটিংস আপডেট করতে সমস্যা হয়েছে",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
