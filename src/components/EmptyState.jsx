import { ChefHat } from "lucide-react";

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-paprika">
        <span className="absolute inset-2 rounded-full border border-dashed border-paprika/40" />
        <ChefHat className="text-paprika" size={32} />
      </div>

      <h1 className="mt-6 font-display text-4xl font-semibold text-ink sm:text-5xl">
        Welcome to ChefNova
      </h1>

      <p className="mt-4 max-w-xl text-lg text-ink-soft">
        Ask for any dish and the notebook fills in the ingredients,
        the method, chef's notes and a video to watch it made.
      </p>
    </div>
  );
}

export default EmptyState;
