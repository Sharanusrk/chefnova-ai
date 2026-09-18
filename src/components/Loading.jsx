import { AIAvatar } from "./Avatar";

function Loading() {
  return (
    <div className="mx-auto flex max-w-2xl gap-4">

      <AIAvatar />

      <div className="flex-1 rounded-2xl border border-line bg-[#fffdf6] px-6 py-5 shadow-sm">

        <h3 className="font-display text-lg font-semibold text-ink">
          ChefNova is writing the card&hellip;
        </h3>

        <p className="mt-1 font-mono text-xs text-ink-soft">
          checking pantry &middot; measuring &middot; plating
        </p>

        <div className="mt-4 flex items-center gap-1.5" role="status" aria-label="Generating recipe">

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-paprika"></span>

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-basil [animation-delay:0.15s]"></span>

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-mustard [animation-delay:0.3s]"></span>

        </div>

      </div>

    </div>
  );
}

export default Loading;
