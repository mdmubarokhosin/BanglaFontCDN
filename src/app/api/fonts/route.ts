export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { readFile, commitFile } from "@/lib/github";
import type { Font } from "@/types/font";

async function readFonts(): Promise<Font[]> {
  const raw = await readFile("src/data/fonts.json");
  if (!raw) return [];
  const data = JSON.parse(raw);
  return data.fonts || [];
}

export async function GET() {
  try {
    const fonts = await readFonts();
    return NextResponse.json({ fonts, total: fonts.length }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "ফন্ট ডেটা লোড করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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
    const {
      id,
      name,
      designer,
      category,
      styles,
      likes,
      downloads,
      fileUrl,
      importUrl,
      linkUrl,
      cssUrl,
      fontFamily,
      dateAdded,
      description,
      license,
      licenseUrl,
      tags,
      version,
      isActive,
    } = body;

    if (!id || !name || !cssUrl) {
      return NextResponse.json(
        { error: "আইডি, নাম এবং CSS URL প্রয়োজন" },
        { status: 400 }
      );
    }

    const fonts = await readFonts();

    const existingIndex = fonts.findIndex((f) => f.id === id);
    if (existingIndex !== -1) {
      return NextResponse.json(
        { error: "এই আইডি দিয়ে একটি ফন্ট ইতিমধ্যে বিদ্যমান" },
        { status: 409 }
      );
    }

    const newFont: Font = {
      id,
      name,
      designer: designer || "",
      category: category || "",
      styles: styles || [],
      likes: likes || 0,
      downloads: downloads || 0,
      fileUrl: fileUrl || "#",
      importUrl: importUrl || "",
      linkUrl: linkUrl || "",
      cssUrl,
      fontFamily: fontFamily || "",
      dateAdded: dateAdded || new Date().toISOString().split("T")[0],
      ...(description && { description }),
      ...(license && { license }),
      ...(licenseUrl && { licenseUrl }),
      ...(tags && { tags }),
      ...(version && { version }),
      ...(isActive !== undefined && { isActive }),
    };

    fonts.push(newFont);

    const jsonContent = JSON.stringify({ fonts }, null, 2);
    const gitResult = await commitFile(
      "src/data/fonts.json",
      jsonContent,
      `Add font: ${name} (${id})`
    );

    return NextResponse.json(
      {
        success: true,
        font: newFont,
        gitSync: gitResult.success,
        gitError: gitResult.error,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "ফন্ট যোগ করতে সমস্যা হয়েছে",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
