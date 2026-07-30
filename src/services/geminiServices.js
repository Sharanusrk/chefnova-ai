import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchRecipe } from "./api";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// Retry helper
async function generateWithRetry(prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(prompt);
    } catch (err) {
      console.error(`Attempt ${i + 1} failed`, err);

      const message = err?.message || "";

      if (
        (message.includes("503") ||
          message.includes("429") ||
          message.includes("high demand")) &&
        i < retries - 1
      ) {
        console.log("Retrying...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      }

      throw err;
    }
  }
}

export async function getRecipe(recipeName) {
  try {
    const prompt = `
You are ChefNova AI.

Generate a complete recipe for "${recipeName}".

Return ONLY valid JSON.

{
  "title":"",
  "description":"",
  "category":"",
  "cuisine":"",
  "cookingTime":"",
  "difficulty":"",
  "servings":"",
  "calories":"",
  "ingredients":[],
  "steps":[],
  "tips":"",
  "nutrition":{
    "protein":"",
    "carbs":"",
    "fat":""
  },
  "youtubeSearch":""
}

Rules:
- Return ONLY JSON.
- No markdown.
- No explanation.
- Ingredients must be array of strings.
- Steps must be array of strings.
- Beginner friendly.
- Include approximate nutrition.
`;

    const result = await generateWithRetry(prompt);

    const text = result.response.text();

    console.log("===== RAW GEMINI RESPONSE =====");
    console.log(text);

    // Remove markdown if present
    const cleanText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    console.log("===== CLEAN RESPONSE =====");
    console.log(cleanText);

    // Extract JSON safely
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Gemini did not return valid JSON.");
    }

    const recipe = JSON.parse(jsonMatch[0]);

    // Fetch image from TheMealDB
    const meal = await searchRecipe(recipeName);

    if (meal?.image) {
      recipe.image = meal.image;
    }

    return {
      title: recipe.title || recipeName,
      description: recipe.description || "",
      image: recipe.image || "",
      category: recipe.category || "Recipe",
      cuisine: recipe.cuisine || "International",
      cookingTime: recipe.cookingTime || "30 mins",
      difficulty: recipe.difficulty || "Easy",
      servings: recipe.servings || "2",
      calories: recipe.calories || "-",
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients
        : [],
      steps: Array.isArray(recipe.steps)
        ? recipe.steps
        : [],
      tips: recipe.tips || "",
      nutrition: recipe.nutrition || {
        protein: "-",
        carbs: "-",
        fat: "-",
      },
      youtubeSearch:
        recipe.youtubeSearch || `${recipeName} recipe`,
    };
  } catch (error) {
    console.error("===== GEMINI ERROR =====");
    console.error(error);

    // Fallback image
    let meal = null;

    try {
      meal = await searchRecipe(recipeName);
    } catch (e) {
      console.log("MealDB lookup failed.");
    }

    return {
      title: recipeName,
      description:
        "AI recipe generation is temporarily unavailable. Showing a basic recipe instead.",

      image: meal?.image || "",

      category: meal?.category || "Recipe",

      cuisine: meal?.area || "International",

      cookingTime: "30 mins",

      difficulty: "Easy",

      servings: "2",

      calories: "Approx. 250 kcal",

      ingredients: [
        "Ingredients are temporarily unavailable.",
        "Please try again in a few moments."
      ],

      steps: [
        "Gemini AI is currently experiencing high demand.",
        "Please try your search again after a few seconds."
      ],

      tips:
        "Tip: Retry in a few minutes. Google Gemini servers are temporarily busy.",

      nutrition: {
        protein: "-",
        carbs: "-",
        fat: "-",
      },

      youtubeSearch: `${recipeName} recipe`,
    };
  }
}