import { Clock, Users, Globe2, Flame } from "lucide-react";

const stamps = [
  { key: "difficulty", Icon: Flame, ink: "paprika" },
  { key: "cookingTime", Icon: Clock, ink: "basil" },
  { key: "servings", Icon: Users, ink: "mustard" },
  { key: "cuisine", Icon: Globe2, ink: "paprika" },
];

const stampInk = {
  paprika: "border-paprika text-paprika",
  basil: "border-basil text-basil",
  mustard: "border-[#8a5f16] text-[#8a5f16]",
};

const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="relative overflow-hidden rounded-b-xl border border-line bg-[#fffdf6] shadow-sm">

      {/* Torn top deckle edge */}
      <svg
        className="torn-edge"
        viewBox="0 0 400 14"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L400,0 L400,6 L390,3 L378,9 L366,2 L354,8 L342,3 L330,10 L318,4 L306,7 L294,1 L282,9 L270,3 L258,6 L246,2 L234,9 L222,4 L210,7 L198,1 L186,8 L174,3 L162,10 L150,4 L138,7 L126,1 L114,9 L102,3 L90,6 L78,2 L66,9 L54,4 L42,7 L30,1 L18,8 L6,3 L0,6 Z"
          fill="currentColor"
        />
      </svg>

      <div className="px-6 pb-6 sm:px-9 sm:pb-9">

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">
          Recipe card
        </p>

        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {recipe.title}
        </h1>

        <p className="mt-4 max-w-2xl font-display text-lg italic leading-relaxed text-ink-soft">
          {recipe.description}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">

          {stamps.map(({ key, Icon, ink }, i) => {
            const value = recipe[key];
            if (!value) return null;

            return (
              <div
                key={key}
                className={`stamp flex items-center gap-2 px-4 py-1.5 text-xs ${stampInk[ink]} ${rotations[i % rotations.length]}`}
              >
                <Icon size={14} />
                {value}
              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default RecipeCard;
