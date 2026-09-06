import { NextRequest, NextResponse } from "next/server";
import { logConfirmation } from "@/lib/db";
import { getVideoBySlug } from "@/lib/videos";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { email, videoSlug } = await req.json();

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!videoSlug || !getVideoBySlug(videoSlug)) {
    return NextResponse.json({ error: "Unknown video." }, { status: 400 });
  }

  try {
    await logConfirmation({ email, videoSlug });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not save your confirmation right now. Please try again shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
