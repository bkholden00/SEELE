import { NextRequest, NextResponse } from "next/server";
import { isValidAccessCode, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (!code || typeof code !== "string" || !isValidAccessCode(code)) {
    return NextResponse.json(
      { error: "That access code isn't recognized. Please check and try again." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, code.trim().toUpperCase(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });
  return res;
}
