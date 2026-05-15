export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { suggestFontPairing } from "@/lib/openrouter";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { bengaliFontName, category, designer } = body;

    if (!bengaliFontName || !category || !designer) {
      return NextResponse.json(
        { error: "ফন্টের নাম, ক্যাটাগরি এবং ডিজাইনারের নাম প্রয়োজন" },
        { status: 400 }
      );
    }

    const result = await suggestFontPairing({
      bengaliFontName,
      category,
      designer,
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "ফন্ট পেয়ারিং করতে সমস্যা হয়েছে";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
