import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Trash2, ChefHat, Heart, Clock, Users } from "lucide-react";
import {
  getFavorites,
  removeFavorite,
} from "../utils/favorites";

function Favorites() {
  const [recipes, setRecipes] = useState(getFavorites());
  const [search, setSearch] = useState("");

  function handleDelete(title) {
    removeFavorite(title);
    setRecipes(getFavorites());
  }

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-paper">

      <div className="mx-auto max-w-6xl px-6 py-14">

        {/* Header, styled like the label on a recipe-box drawer */}

        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-6">

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-paprika">
              Drawer 01
            </p>
            <h1 className="mt-2 flex items-center gap-3 font-display text-4xl font-semibold text-ink">
              <Heart className="text-paprika" fill="currentColor" size={30} />
              The recipe box
            </h1>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink transition hover:bg-ink hover:text-paper"
          >
            <ChefHat size={16} />
            Back to the notebook
          </Link>

        </div>

        {/* Search, styled like a card-catalog index */}

        <div className="relative mb-10 max-w-lg">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
          />

          <input
            type="text"
            placeholder="Search the box..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border-2 border-line bg-[#fffdf6] py-3 pl-11 pr-4 font-mono text-sm text-ink outline-none transition focus:border-paprika"
          />

        </div>

        {/* Empty State */}

        {filteredRecipes.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-line bg-[#fffdf6] px-8 py-16 text-center">

            <Heart
              size={44}
              className="mx-auto mb-5 text-paprika/40"
            />

            <h2 className="font-display text-2xl font-semibold text-ink">
              This drawer is empty
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-ink-soft">
              Save a recipe from the notebook and its card will land
              here for next time.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {filteredRecipes.map((recipe, index) => (

              <div
                key={index}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-[#fffdf6] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="relative h-40 overflow-hidden bg-paper-dark">
                  <img
                    src={
                      recipe.image ||
                      `https://placehold.co/600x300/C1440E/F6EEDC?text=${encodeURIComponent(
                        recipe.title
                      )}`
                    }
                    alt={recipe.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="stamp absolute right-3 top-3 border-paprika bg-paper/90 px-3 py-1 text-[10px] text-paprika">
                    Card {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">

                  <h2 className="font-display text-xl font-semibold text-ink">
                    {recipe.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                    {recipe.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 font-mono text-xs text-ink-soft">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-basil" />
                      {recipe.cookingTime || "-"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={13} className="text-mustard" />
                      {recipe.servings || "-"}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(recipe.title)}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-ink/10 py-2.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition hover:border-paprika hover:text-paprika"
                  >
                    <Trash2 size={15} />
                    Remove card
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Favorites;
