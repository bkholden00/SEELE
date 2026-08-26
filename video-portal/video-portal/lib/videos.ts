export type Video = {
  slug: string;       // used in the URL: /videos/[slug]
  title: string;      // shown in the nav dropdown and on the page
  description?: string;
  url: string;        // the Vercel Blob URL for the mp4
};

// The intro video is treated as the "home page" after login (app/intro/page.tsx).
export const introVideo: Video = {
  slug: "intro",
  title: "Module 0 – Introduction",
  description: "Introduction to the Morphological Knowledge Module Series.",
  url: "https://youtu.be/2QT7vOAby1M",
};

// Add one entry per lesson video. Order here = order in the dropdown.
export const videos: Video[] = [
  {
    slug: "module-1",
    title: "Module 1 – Breaking Down Words Into Word Parts",
    url: "https://youtu.be/Q8jl_tYAILg",
  },
  {
    slug: "module-2",
    title: "Module 2 – Building Words From Word Parts",
    url: "https://youtu.be/LpkPwulkPCc",
  },
  {
    slug: "module-3",
    title: "Module 3 – Highlighting Semantic and Grammatical Shifts",
    url: "https://youtu.be/nJk5_6tsztk",
  },
  {
    slug: "module-4",
    title: "Module 4 – Understanding Derived Words",
    url: "https://youtu.be/S4Xg5wZjc5E",
  },
  {
    slug: "module-5",
    title: "Module 5 – Spelling and Phonological Shifts",
    url: "https://youtu.be/mU48LwaczoA",
  },
];

export function getVideoBySlug(slug: string): Video | undefined {
  if (slug === "intro") return introVideo;
  return videos.find((v) => v.slug === slug);
}

export function allVideosForNav(): Video[] {
  return [introVideo, ...videos];
}
