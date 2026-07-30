import { Heart, Download, Play } from "lucide-react";

function ActionButtons({
  onFavorite,
  onDownload,
  youtubeLink,
  isFavorite,
}) {
  // youtubeLink from Gemini is a search phrase like "pizza recipe",
  // not a URL — turn it into an actual YouTube search link. If it's
  // ever already a full URL, just use it as-is.
  const youtubeUrl = youtubeLink
    ? /^https?:\/\//i.test(youtubeLink)
      ? youtubeLink
      : `https://www.youtube.com/results?search_query=${encodeURIComponent(
          youtubeLink
        )}`
    : null;

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

      {/* Save */}
      <button
        onClick={onFavorite}
        className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 font-mono text-xs uppercase tracking-wide transition-all duration-300 ${
          isFavorite
            ? "border-paprika bg-paprika text-paper"
            : "border-ink/15 bg-[#fffdf6] text-ink hover:border-paprika hover:text-paprika"
        }`}
      >
        <Heart
          size={17}
          fill={isFavorite ? "currentColor" : "none"}
        />
        {isFavorite ? "Saved to box" : "Save recipe"}
      </button>

      {/* PDF */}
      <button
        onClick={onDownload}
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-basil bg-basil py-3 font-mono text-xs uppercase tracking-wide text-paper shadow-[3px_3px_0_var(--color-basil-dark)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-basil-dark)]"
      >
        <Download size={17} />
        Print to PDF
      </button>

      {/* YouTube */}
      {youtubeUrl && (
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink bg-ink py-3 font-mono text-xs uppercase tracking-wide text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-paprika hover:border-paprika"
        >
          <Play size={17} />
          Watch it made
        </a>
      )}

    </div>
  );
}

export default ActionButtons;
