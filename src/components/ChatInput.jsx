import { useState, useRef, useEffect } from "react";
import { getRecipe } from "../services/geminiServices";
import Loading from "./Loading";
import SearchSection from "./SearchSection";
import RecipeView from "./RecipeView";

function ChatInput() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(searchText = prompt) {
    if (!searchText.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const recipeData = await getRecipe(searchText);

      setRecipe(recipeData);
      setPrompt("");
    } catch (err) {
      console.error(err);
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-14">

      <SearchSection
        prompt={prompt}
        setPrompt={setPrompt}
        loading={loading}
        onSearch={handleSubmit}
        inputRef={inputRef}
      />

      {loading && (
        <div className="mt-12">
          <Loading />
        </div>
      )}

      {error && (
        <div className="stamp mx-auto mt-10 max-w-2xl border-paprika px-6 py-4 text-center text-sm text-paprika">
          {error}
        </div>
      )}

      {!loading && recipe && (
        <RecipeView
          recipe={recipe}
        />
      )}

    </div>
  );
}

export default ChatInput;