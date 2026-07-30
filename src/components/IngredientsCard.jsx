function IngredientsCard({ ingredients = [] }) {
  return (
    <div className="flex h-[440px] flex-col overflow-hidden rounded-2xl border border-line bg-[#fffdf6] shadow-sm">

      <div className="flex items-center justify-between border-b border-dashed border-line px-6 py-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Ingredients
        </h2>
        <span className="font-mono text-xs text-ink-soft">
          {ingredients.length > 0 ? `${ingredients.length} items` : ""}
        </span>
      </div>

      {ingredients.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-6 text-sm text-ink-soft">
          No ingredients available.
        </div>
      ) : (
        <div className="notebook-holes flex-1 space-y-1 overflow-y-auto py-2 pl-9 pr-4">

          {ingredients.map((item, index) => (
            <div
              key={index}
              className="group flex items-start gap-3 rounded-lg py-2 pr-2 transition hover:bg-paper-dark/40"
            >
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border-2 border-basil">
                <svg viewBox="0 0 10 8" className="h-2 w-2.5 fill-none stroke-basil opacity-0 transition group-hover:opacity-100" strokeWidth="2">
                  <path d="M1 4l2.5 2.5L9 1" />
                </svg>
              </span>

              <p className="leading-relaxed text-ink">
                {typeof item === "string"
                  ? item
                  : `${item.quantity || ""} ${item.item || ""}`}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default IngredientsCard;
