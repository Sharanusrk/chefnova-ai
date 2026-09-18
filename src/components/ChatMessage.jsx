import RecipeCard from "./RecipeCard";
import IngredientsCard from "./IngredientsCard";
import StepsCard from "./StepsCard";
import ActionButtons from "./ActionButtons";

function ChatMessage({
  recipe,
  onFavorite,
  onDownload,
  isFavorite,
}) {
  if (!recipe) return null;

  return (
    <div className="mx-auto mt-8 max-w-6xl space-y-6 px-4">

      <RecipeCard recipe={recipe} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <IngredientsCard
          ingredients={recipe.ingredients || []}
        />

        <StepsCard
          steps={recipe.steps || []}
        />

      </div>

      <ActionButtons
        onFavorite={onFavorite}
        onDownload={onDownload}
        youtubeLink={recipe.youtubeSearch}
        isFavorite={isFavorite}
      />

    </div>
  );
}

export default ChatMessage;
