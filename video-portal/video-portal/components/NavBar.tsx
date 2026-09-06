"use client";

import Link from "next/link";
import { useState } from "react";
import { Video } from "@/lib/videos";

export default function NavBar({
  videos,
  currentSlug,
}: {
  videos: Video[];
  currentSlug: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-slate-900 text-white shadow">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Teacher Video Portal
        </Link>

        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            className="flex items-center gap-1 rounded-md bg-slate-800 px-3 py-1.5 text-sm hover:bg-slate-700"
          >
            Videos
            <span aria-hidden>▾</span>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-md border border-slate-700 bg-slate-800 shadow-lg">
              <Link
                href="/"
                className="block px-4 py-2 text-sm font-semibold hover:bg-slate-700"
              >
                ⭐ Video of the Week
              </Link>
              <div className="my-1 border-t border-slate-700" />
              {videos.map((v) => (
                <Link
                  key={v.slug}
                  href={`/videos/${v.slug}`}
                  className={`block px-4 py-2 text-sm hover:bg-slate-700 ${
                    v.slug === currentSlug ? "bg-slate-700 font-medium" : ""
                  }`}
                >
                  {v.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
