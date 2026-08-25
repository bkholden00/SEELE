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
  url: "https://cuokegqaho33rqyh.public.blob.vercel-storage.com/Module%200%20-%20Introduction%20to%20the%20Morphological%20Knowledge%20Module%20Series.mp4",
};

// Add one entry per lesson video. Order here = order in the dropdown.
export const videos: Video[] = [
  {
    slug: "module-1",
    title: "Module 1 – Breaking Down Words Into Word Parts",
    url: "https://cuokegqaho33rqyh.public.blob.vercel-storage.com/Module%201%20-%20Breaking%20Down%20Words%20Into%20Word%20Parts.mp4",
  },
  {
    slug: "module-2",
    title: "Module 2 – Building Words From Word Parts",
    url: "https://cuokegqaho33rqyh.public.blob.vercel-storage.com/Module%202%20-%20Building%20Words%20From%20Word%20Parts.mp4",
  },
  {
    slug: "module-3",
    title: "Module 3 – Highlighting Semantic and Grammatical Shifts",
    url: "https://cuokegqaho33rqyh.public.blob.vercel-storage.com/Module%203%20-%20Highlighting%20Semantic%20and%20Grammatical%20Shifts.mp4",
  },
  {
    slug: "module-4",
    title: "Module 4 – Understanding Derived Words",
    url: "https://cuokegqaho33rqyh.public.blob.vercel-storage.com/Module%204%20-%20Understanding%20Derived%20Words%20%E2%80%94%20How%20Suffixes%20Create%20Adjectives%20and%20Nouns.mp4",
  },
  {
    slug: "module-5",
    title: "Module 5 – Spelling and Phonological Shifts",
    url: "https://cuokegqaho33rqyh.public.blob.vercel-storage.com/Module%205%20-%20Increasing%20Awareness%20of%20Spelling%20and%20Phonological%20Shifts.mp4",
  },
];

export function getVideoBySlug(slug: string): Video | undefined {
  if (slug === "intro") return introVideo;
  return videos.find((v) => v.slug === slug);
}

export function allVideosForNav(): Video[] {
  return [introVideo, ...videos];
}
