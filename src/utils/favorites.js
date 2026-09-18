export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function saveRecipe(recipe) {
  const favorites = getFavorites();

  const exists = favorites.some(
    (item) =>
      item.title.toLowerCase() === recipe.title.toLowerCase()
  );

  if (exists) {
    alert("Recipe already exists in Favorites ❤️");
    return false;
  }

  favorites.push(recipe);

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  alert("Recipe saved successfully ❤️");

  return true;
}

export function removeFavorite(title) {
  const favorites = getFavorites();

  const updated = favorites.filter(
    (item) =>
      item.title.toLowerCase() !== title.toLowerCase()
  );

  localStorage.setItem(
    "favorites",
    JSON.stringify(updated)
  );
}

export function clearFavorites() {
  localStorage.removeItem("favorites");
}

export function isFavorite(title) {
  return getFavorites().some(
    (item) =>
      item.title.toLowerCase() === title.toLowerCase()
  );
}