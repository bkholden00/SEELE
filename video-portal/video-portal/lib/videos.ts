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
    url: "https://youtu.be/HjsDzWMYD90",
  },
  {
    slug: "module-1",
    title: "Module 1 – Breaking Down Words Into Word Parts",
    url: "https://youtu.be/vYRNuxv04uE",
  },
  {
    slug: "module-2",
    title: "Module 2 – Building Words From Word Parts",
    url: "https://youtu.be/Cr3LUqpgB-M",
  },
  {
    slug: "module-3",
    title: "Module 3 – Highlighting Semantic and Grammatical Shifts",
    url: "https://youtu.be/ml2QYD3wf80",
  },
  {
    slug: "module-4",
    title: "Module 4 – Understanding Derived Words",
    url: "https://youtu.be/b5NyV4zXcm8",
  },
  {
    slug: "module-5",
    title: "Module 5 – Spelling and Phonological Shifts",
    url: "https://youtu.be/tZOPOt4g-Qg",
  },
  {
    slug: "module-6",
    title: "Module 6 – Giving Students Opportunities to Deduce the Meaning of New Words",
    url: "https://youtu.be/R9ovmok7ElA",
  },
];

// Change this each week to whichever slug you want featured on the home page.
export const featuredSlug = "module-1";

export function getVideoBySlug(slug: string): Video | undefined {
  return videos.find((v) => v.slug === slug);
}

export function getFeaturedVideo(): Video {
  return getVideoBySlug(featuredSlug) ?? videos[0];
}

export function allVideosForNav(): Video[] {
  return videos;
}
