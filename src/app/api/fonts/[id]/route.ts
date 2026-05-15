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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fonts = await readFonts();
    const font = fonts.find((f) => f.id === id);

    if (!font) {
      return NextResponse.json(
        { error: "ফন্ট খুঁজে পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    return NextResponse.json({ font }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "ফন্ট ডেটা লোড করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const session = getAdminSession(cookieHeader);

    if (!session.authenticated) {
      return NextResponse.json(
        { error: "অনুমতি দেওয়া হয়নি" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const fonts = await readFonts();
    const existingIndex = fonts.findIndex((f) => f.id === id);

    if (existingIndex === -1) {
      return NextResponse.json(
        { error: "ফন্ট খুঁজে পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    const updatedFont: Font = {
      ...fonts[existingIndex],
      ...body,
      id: fonts[existingIndex].id,
    };

    fonts[existingIndex] = updatedFont;

    const jsonContent = JSON.stringify({ fonts }, null, 2);
    const gitResult = await commitFile(
      "src/data/fonts.json",
      jsonContent,
      `Update font: ${updatedFont.name} (${id})`
    );

    return NextResponse.json(
      {
        success: true,
        font: updatedFont,
        gitSync: gitResult.success,
        gitError: gitResult.error,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "ফন্ট আপডেট করতে সমস্যা হয়েছে",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const session = getAdminSession(cookieHeader);

    if (!session.authenticated) {
      return NextResponse.json(
        { error: "অনুমতি দেওয়া হয়নি" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const fonts = await readFonts();
    const existingIndex = fonts.findIndex((f) => f.id === id);

    if (existingIndex === -1) {
      return NextResponse.json(
        { error: "ফন্ট খুঁজে পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    const deletedFont = fonts[existingIndex];
    fonts.splice(existingIndex, 1);

    const jsonContent = JSON.stringify({ fonts }, null, 2);
    const gitResult = await commitFile(
      "src/data/fonts.json",
      jsonContent,
      `Delete font: ${deletedFont.name} (${id})`
    );

    return NextResponse.json(
      {
        success: true,
        deletedFont,
        gitSync: gitResult.success,
        gitError: gitResult.error,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "ফন্ট মুছে ফেলতে সমস্যা হয়েছে",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
