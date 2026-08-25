export default function VideoPlayer({ url, title }: { url: string; title: string }) {
  if (!url) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500">
        Video not configured yet — add its Blob URL in lib/videos.ts (or the matching
        env var).
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      controls
      preload="metadata"
      className="aspect-video w-full rounded-lg bg-black"
      aria-label={title}
    >
      <source src={url} type="video/mp4" />
      Your browser doesn&apos;t support embedded video.
    </video>
  );
}
