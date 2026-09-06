export type Video = {
  slug: string;
  title: string;
  description?: string;
  url: string;
};

export const videos: Video[] = [
  {
    slug: "module-0",
    title: "Module 0 – Introduction",
    description: "Introduction to the Morphological Knowledge Module Series.",
    url: "https://youtu.be/2QT7vOAby1M",
  },
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

// Change this each week to whichever slug you want featured on the home page.
export const featuredSlug = "module-0";

export function getVideoBySlug(slug: string): Video | undefined {
  return videos.find((v) => v.slug === slug);
}

export function getFeaturedVideo(): Video {
  return getVideoBySlug(featuredSlug) ?? videos[0];
}

export function allVideosForNav(): Video[] {
  return videos;
}
