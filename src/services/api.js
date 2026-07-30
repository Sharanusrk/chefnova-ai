const API = "https://www.themealdb.com/api/json/v1/1";

/**
 * Search multiple recipes
 */
export async function searchRecipes(query) {
  try {
    const res = await fetch(
      `${API}/search.php?s=${encodeURIComponent(query)}`
    );

    const data = await res.json();

    return data.meals || [];
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
}

/**
 * Search a single recipe
 */
export async function searchRecipe(recipeName) {
  try {
    const res = await fetch(
      `${API}/search.php?s=${encodeURIComponent(recipeName)}`
    );

    const data = await res.json();

    if (!data.meals) return null;

    const meal = data.meals[0];

    return {
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      cuisine: meal.strArea,
      youtube: meal.strYoutube,
      source: meal.strSource,

      ingredients: Array.from({ length: 20 })
        .map((_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`];
          const measure = meal[`strMeasure${i + 1}`];

          if (!ingredient || ingredient.trim() === "") return null;

          return `${measure || ""} ${ingredient}`.trim();
        })
        .filter(Boolean),
    };
  } catch (error) {
    console.error("TheMealDB Error:", error);
    return null;
  }
}