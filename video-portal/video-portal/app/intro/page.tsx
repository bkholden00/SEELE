import NavBar from "@/components/NavBar";
import VideoPlayer from "@/components/VideoPlayer";
import EmailConfirmForm from "@/components/EmailConfirmForm";
import { allVideosForNav, introVideo } from "@/lib/videos";

export default function IntroPage() {
  return (
    <>
      <NavBar videos={allVideosForNav()} currentSlug="intro" />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-slate-900">{introVideo.title}</h1>
        {introVideo.description && (
          <p className="mt-1 text-sm text-slate-500">{introVideo.description}</p>
        )}

        <div className="mt-6">
          <VideoPlayer url={introVideo.url} title={introVideo.title} />
        </div>

        <p className="mt-6 text-sm text-slate-600">
          Once you&apos;ve watched this video, confirm below. Then use the{" "}
          <strong>Videos</strong> menu above to go through each lesson.
        </p>

        <EmailConfirmForm videoSlug={introVideo.slug} />
      </main>
    </>
  );
}
