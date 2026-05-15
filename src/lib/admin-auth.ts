/**
 * অ্যাডমিন অথেনটিকেশন হেল্পার
 * Edge Runtime কম্প্যাটিবল
 *
 * পাসওয়ার্ড সোর্স (অগ্রাধিকার ক্রম):
 *   ১. process.env.ADMIN_PASSWORD (Cloudflare Pages Secret)
 *   ২. settings.json (অ্যাডমিন প্যানেল থেকে সেট)
 *   ৩. hardcoded default
 */

import { readFile } from "@/lib/github";

const DEFAULT_ADMIN_PASSWORD = "banglafont2024";
const ADMIN_SESSION_COOKIE = "admin_session";

/**
 * অ্যাডমিন পাসওয়ার্ড পান (অগ্রাধিকার ক্রমে)
 */
async function getAdminPassword(): Promise<string> {
  // ১. Environment Variable (সর্বোচ্চ অগ্রাধিকার)
  if (process.env.ADMIN_PASSWORD) {
    return process.env.ADMIN_PASSWORD;
  }

  // ২. settings.json
  try {
    const raw = await readFile("src/data/settings.json");
    if (raw) {
      const settings = JSON.parse(raw);
      if (settings.adminPassword) {
        return settings.adminPassword;
      }
    }
  } catch {
    // settings.json পড়তে সমস্যা হলে ফলব্যাকে যান
  }

  // ৩. Hardcoded default
  return DEFAULT_ADMIN_PASSWORD;
}

/**
 * পাসওয়ার্ড ভেরিফাই করুন
 */
async function verifyAdmin(password: string): Promise<boolean> {
  const adminPassword = await getAdminPassword();
  return password === adminPassword;
}

/**
 * কুকি থেকে অ্যাডমিন সেশন চেক করুন
 */
function getAdminSession(cookieHeader: string | null): {
  authenticated: boolean;
} {
  if (!cookieHeader) {
    return { authenticated: false };
  }

  const cookies = cookieHeader.split(";").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  const sessionValue = cookies[ADMIN_SESSION_COOKIE];
  return {
    authenticated: sessionValue === "active",
  };
}

export { verifyAdmin, getAdminSession, ADMIN_SESSION_COOKIE };
