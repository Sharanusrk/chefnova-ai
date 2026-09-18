import { ArrowRight } from "lucide-react";

const suggestions = [
  { label: "Pizza", ink: "paprika" },
  { label: "Chicken biryani", ink: "basil" },
  { label: "Burger", ink: "mustard" },
  { label: "Pasta", ink: "paprika" },
  { label: "Masala dosa", ink: "basil" },
  { label: "Noodles", ink: "mustard" },
];

const inkClasses = {
  paprika: "border-paprika/40 text-paprika hover:bg-paprika hover:text-paper hover:border-paprika",
  basil: "border-basil/40 text-basil hover:bg-basil hover:text-paper hover:border-basil",
  mustard: "border-mustard/50 text-[#8a5f16] hover:bg-mustard hover:text-ink hover:border-mustard",
};

function SearchSection({
  prompt,
  setPrompt,
  loading,
  onSearch,
  inputRef,
}) {
  return (
    <div className="text-center">

      <div className="mb-10">

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-paprika">
          Recipe card &middot; today's entry
        </p>

        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
          What's cooking tonight?
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
          Name a dish. ChefNova fills in the ingredients, the method
          and a stamped note on how hard it'll be.
        </p>

      </div>

      {/* Search, styled like a card catalog slot */}

      <div className="mx-auto max-w-2xl">

        <div className="relative flex items-center rounded-2xl border-2 border-ink bg-[#fffdf6] pl-6 pr-2 shadow-[5px_5px_0_var(--color-paprika)] transition focus-within:-translate-y-0.5 focus-within:shadow-[6px_6px_0_var(--color-paprika)]">

          <span className="hidden font-mono text-xs text-ink-soft sm:block">
            №
          </span>

          <input
            ref={inputRef}
            type="text"
            value={prompt}
            placeholder="Try “paneer butter masala”…"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            className="flex-1 bg-transparent py-5 pl-3 pr-2 font-display text-lg text-ink placeholder:text-ink-soft/50 outline-none"
          />

          <button
            onClick={() => onSearch()}
            disabled={loading}
            className="m-2 flex shrink-0 items-center gap-2 rounded-xl bg-ink px-4 py-3 font-mono text-xs uppercase tracking-wide text-paper transition hover:bg-paprika disabled:opacity-50"
          >
            Cook it
            <ArrowRight size={15} />
          </button>

        </div>

      </div>

      {/* Suggestions, styled as spice-jar labels */}

      <div className="mt-9 flex flex-wrap justify-center gap-2.5">

        {suggestions.map(({ label, ink }) => (

          <button
            key={label}
            onClick={() => onSearch(label)}
            className={`rounded-full border bg-paper px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition ${inkClasses[ink]}`}
          >
            {label}
          </button>

        ))}

      </div>

    </div>
  );
}

export default SearchSection;
