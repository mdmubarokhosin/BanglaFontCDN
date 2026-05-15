export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { readFile, commitFile } from "@/lib/github";

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

    const [fontsContent, settingsContent] = await Promise.all([
      readFile("src/data/fonts.json"),
      readFile("src/data/settings.json"),
    ]);

    if (!fontsContent && !settingsContent) {
      return NextResponse.json(
        { error: "কোনো ফাইল পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    const results: Record<string, { success: boolean; error?: string }> = {};

    if (fontsContent) {
      const fontsResult = await commitFile(
        "src/data/fonts.json",
        fontsContent,
        "Sync fonts.json to GitHub"
      );
      results.fonts = fontsResult;
    }

    if (settingsContent) {
      const settingsResult = await commitFile(
        "src/data/settings.json",
        settingsContent,
        "Sync settings.json to GitHub"
      );
      results.settings = settingsResult;
    }

    return NextResponse.json(
      {
        success: true,
        message: "সফলভাবে GitHub এ সিঙ্ক করা হয়েছে",
        results,
        syncedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "সিঙ্ক করতে সমস্যা হয়েছে",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
