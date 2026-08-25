export type Video = {
  slug: string;       // used in the URL: /videos/[slug]
  title: string;      // shown in the nav dropdown and on the page
  description?: string;
  url: string;        // the Vercel Blob URL for the mp4 (fill in after uploading)
};

// The intro video is treated as the "home page" after login (app/intro/page.tsx).
export const introVideo: Video = {
  slug: "intro",
  title: "Welcome / Introduction",
  description: "Start here before watching the lesson videos below.",
  url: process.env.NEXT_PUBLIC_INTRO_VIDEO_URL || "",
};

// Add one entry per lesson video. Order here = order in the dropdown.
export const videos: Video[] = [
  {
    slug: "lesson-1",
    title: "Lesson 1",
    url: process.env.NEXT_PUBLIC_LESSON_1_URL || "",
  },
  {
    slug: "lesson-2",
    title: "Lesson 2",
    url: process.env.NEXT_PUBLIC_LESSON_2_URL || "",
  },
  {
    slug: "lesson-3",
    title: "Lesson 3",
    url: process.env.NEXT_PUBLIC_LESSON_3_URL || "",
  },
];

export function getVideoBySlug(slug: string): Video | undefined {
  if (slug === "intro") return introVideo;
  return videos.find((v) => v.slug === slug);
}

export function allVideosForNav(): Video[] {
  return [introVideo, ...videos];
}
