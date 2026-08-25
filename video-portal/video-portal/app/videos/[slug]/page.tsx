import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import VideoPlayer from "@/components/VideoPlayer";
import EmailConfirmForm from "@/components/EmailConfirmForm";
import { allVideosForNav, getVideoBySlug, videos } from "@/lib/videos";

export function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) notFound();

  return (
    <>
      <NavBar videos={allVideosForNav()} currentSlug={video.slug} />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-slate-900">{video.title}</h1>
        {video.description && (
          <p className="mt-1 text-sm text-slate-500">{video.description}</p>
        )}

        <div className="mt-6">
          <VideoPlayer url={video.url} title={video.title} />
        </div>

        <p className="mt-6 text-sm text-slate-600">
          Confirm below once you&apos;ve finished watching this video.
        </p>

        <EmailConfirmForm videoSlug={video.slug} />
      </main>
    </>
  );
}
