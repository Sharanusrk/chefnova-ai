function StepsCard({ steps = [] }) {
  return (
    <div className="flex h-[440px] flex-col overflow-hidden rounded-2xl border border-line bg-[#fffdf6] shadow-sm">

      <div className="flex items-center justify-between border-b border-dashed border-line px-6 py-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Method
        </h2>
        <span className="font-mono text-xs text-ink-soft">
          {steps.length > 0 ? `${steps.length} steps` : ""}
        </span>
      </div>

      {steps.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-6 text-sm text-ink-soft">
          No cooking steps available.
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-6 py-4">

          {steps.map((step, index) => (
            <div key={index} className="relative flex gap-4 pb-6 last:pb-0">

              {index !== steps.length - 1 && (
                <span className="thread-line absolute left-[15px] top-8 bottom-0" aria-hidden="true" />
              )}

              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-paprika bg-paper font-mono text-xs font-bold text-paprika">
                {index + 1}
              </div>

              <p className="pt-1 leading-7 text-ink">
                {typeof step === "string"
                  ? step
                  : JSON.stringify(step)}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default StepsCard;
