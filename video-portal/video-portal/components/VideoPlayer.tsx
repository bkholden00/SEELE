function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function VideoPlayer({ url, title }: { url: string; title: string }) {
  if (!url) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500">
        Video not configured yet — add its URL in lib/videos.ts.
      </div>
    );
  }

  const youtubeId = getYouTubeId(url);

  if (youtubeId) {
    return (
      <iframe
        className="aspect-video w-full rounded-lg"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&iv_load_policy=3`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video controls preload="metadata" className="aspect-video w-full rounded-lg bg-black" aria-label={title}>
      <source src={url} type="video/mp4" />
      Your browser doesn&apos;t support embedded video.
    </video>
  );
}
