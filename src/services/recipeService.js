const API = "https://www.themealdb.com/api/json/v1/1";

export async function searchRecipes(query) {
  const res = await fetch(`${API}/search.php?s=${query}`);
  const data = await res.json();
  return data.meals || [];
}