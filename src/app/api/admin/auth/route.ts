export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, getAdminSession, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, error: "পাসওয়ার্ড প্রদান করুন" },
        { status: 400 }
      );
    }

    if (!(await verifyAdmin(password))) {
      return NextResponse.json(
        { success: false, error: "ভুল পাসওয়ার্ড" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { success: true, message: "সফলভাবে লগইন হয়েছে" },
      { status: 200 }
    );

    response.cookies.set(ADMIN_SESSION_COOKIE, "active", {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 86400,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "সার্ভার ত্রুটি" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const session = getAdminSession(cookieHeader);

  return NextResponse.json(
    { authenticated: session.authenticated },
    { status: 200 }
  );
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: "সফলভাবে লগআউট হয়েছে" },
    { status: 200 }
  );

  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 0,
  });

  return response;
}
