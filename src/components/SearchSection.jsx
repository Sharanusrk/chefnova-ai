import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import dishSuggestions from "../data/dishSuggestions";

const chips = [
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const matches = useMemo(() => {
    const query = prompt.trim().toLowerCase();
    if (query.length < 2) return [];

    return dishSuggestions
      .filter((dish) => dish.toLowerCase().includes(query))
      .sort((a, b) => {
        // Names starting with the query float to the top,
        // e.g. "Dosa" beats "Mysore Masala Dosa" for query "dosa".
        const aStarts = a.toLowerCase().startsWith(query) ? 0 : 1;
        const bStarts = b.toLowerCase().startsWith(query) ? 0 : 1;
        return aStarts - bStarts || a.length - b.length;
      })
      .slice(0, 6);
  }, [prompt]);

  function selectSuggestion(name) {
    setPrompt(name);
    setIsOpen(false);
    setActiveIndex(-1);
    onSearch(name);
  }

  function handleChange(e) {
    setPrompt(e.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  }

  function handleKeyDown(e) {
    if (isOpen && matches.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % matches.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? matches.length - 1 : i - 1));
        return;
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
    }

    if (e.key === "Enter") {
      if (isOpen && activeIndex >= 0 && matches[activeIndex]) {
        selectSuggestion(matches[activeIndex]);
      } else {
        setIsOpen(false);
        onSearch();
      }
    }
  }

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

      <div className="relative mx-auto max-w-2xl">

        <div className="relative flex items-center rounded-2xl border-2 border-ink bg-[#fffdf6] pl-6 pr-2 shadow-[5px_5px_0_var(--color-paprika)] transition focus-within:-translate-y-0.5 focus-within:shadow-[6px_6px_0_var(--color-paprika)]">

          <span className="hidden font-mono text-xs text-ink-soft sm:block">
            №
          </span>

          <input
            ref={inputRef}
            type="text"
            value={prompt}
            placeholder="Try “paneer butter masala”…"
            onChange={handleChange}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-expanded={isOpen && matches.length > 0}
            aria-autocomplete="list"
            autoComplete="off"
            className="flex-1 bg-transparent py-5 pl-3 pr-2 font-display text-lg text-ink placeholder:text-ink-soft/50 outline-none"
          />

          <button
            onClick={() => {
              setIsOpen(false);
              onSearch();
            }}
            disabled={loading}
            className="m-2 flex shrink-0 items-center gap-2 rounded-xl bg-ink px-4 py-3 font-mono text-xs uppercase tracking-wide text-paper transition hover:bg-paprika disabled:opacity-50"
          >
            Cook it
            <ArrowRight size={15} />
          </button>

        </div>

        {/* Autocomplete, styled as a torn strip of index-card matches */}

        {isOpen && matches.length > 0 && (
          <ul
            role="listbox"
            className="card-stock absolute inset-x-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-2xl border-2 border-ink/15 text-left shadow-lg"
          >
            {matches.map((dish, i) => (
              <li key={dish} role="option" aria-selected={i === activeIndex}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectSuggestion(dish);
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-3 px-6 py-3 font-display text-base transition ${
                    i === activeIndex
                      ? "bg-paprika/10 text-paprika"
                      : "text-ink hover:bg-paper-dark/50"
                  }`}
                >
                  <span className="font-mono text-xs text-ink-soft">
                    №
                  </span>
                  {dish}
                </button>
              </li>
            ))}
          </ul>
        )}

      </div>

      {/* Suggestions, styled as spice-jar labels */}

      <div className="mt-9 flex flex-wrap justify-center gap-2.5">

        {chips.map(({ label, ink }) => (

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
