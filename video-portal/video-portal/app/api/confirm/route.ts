import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { logConfirmation } from "@/lib/db";
import { getVideoBySlug } from "@/lib/videos";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const accessCode = req.cookies.get(SESSION_COOKIE)?.value;
  if (!accessCode) {
    return NextResponse.json({ error: "Session expired. Please re-enter your access code." }, { status: 401 });
  }

  const { email, videoSlug } = await req.json();

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!videoSlug || !getVideoBySlug(videoSlug)) {
    return NextResponse.json({ error: "Unknown video." }, { status: 400 });
  }

  try {
    await logConfirmation({ accessCode, email, videoSlug });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not save your confirmation right now. Please try again shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
