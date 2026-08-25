// Usage:
//   BLOB_READ_WRITE_TOKEN=xxxx node scripts/upload-video.mjs ./my-video.mp4
//
// Get BLOB_READ_WRITE_TOKEN from: Vercel dashboard -> your project ->
// Storage -> your Blob store -> .env.local tab.
//
// After it finishes, copy the printed URL into lib/videos.ts (or the
// matching NEXT_PUBLIC_*_URL env var) for that lesson.

import { put } from "@vercel/blob";
import { readFile } from "node:fs/promises";
import path from "node:path";

const filePath = process.argv[2];

if (!filePath) {
  console.error("Usage: node scripts/upload-video.mjs <path-to-mp4>");
  process.exit(1);
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN env var. See comment at top of this file.");
  process.exit(1);
}

const fileName = path.basename(filePath);
const fileBuffer = await readFile(filePath);

const blob = await put(fileName, fileBuffer, {
  access: "public",
  addRandomSuffix: false,
});

console.log("Uploaded:", blob.url);
