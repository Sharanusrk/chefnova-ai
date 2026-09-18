import { ChefHat, Heart, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({ onNewChat }) {
  function handleNewRecipe() {
    const confirmRecipe = window.confirm(
      "Start a new recipe search? This clears the current card."
    );

    if (!confirmRecipe) return;

    onNewChat();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo, styled as a hand stamp */}

        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-paprika text-paprika transition-transform duration-300 group-hover:-rotate-6">
            <span className="absolute inset-1 rounded-full border border-dashed border-paprika/50" />
            <ChefHat size={20} strokeWidth={2.25} />
          </div>

          <div className="leading-tight">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
              ChefNova
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              Kitchen Notebook
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="flex items-center gap-2 sm:gap-3">

          <Link
            to="/favorites"
            className="flex items-center gap-2 rounded-full px-3 py-2 font-mono text-xs uppercase tracking-wide text-ink-soft transition hover:bg-paper-dark hover:text-ink sm:px-4"
          >
            <Heart size={16} className="text-paprika" />
            <span className="hidden sm:inline">Recipe box</span>
          </Link>

          <button
            onClick={handleNewRecipe}
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-xs uppercase tracking-wide text-paper shadow-[3px_3px_0_var(--color-paprika)] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-paprika)] active:translate-y-0 active:shadow-[1px_1px_0_var(--color-paprika)]"
          >
            <RotateCcw size={15} />
            <span>New recipe</span>
          </button>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;
