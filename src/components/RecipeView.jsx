import { useState } from "react";
import { jsPDF } from "jspdf";

import RecipeCard from "./RecipeCard";
import IngredientsCard from "./IngredientsCard";
import StepsCard from "./StepsCard";
import ActionButtons from "./ActionButtons";

import {
  saveRecipe,
  removeFavorite,
  isFavorite,
} from "../utils/favorites";

function RecipeView({ recipe }) {
  const [saved, setSaved] = useState(
    isFavorite(recipe.title)
  );

  function handleFavorite() {
    if (saved) {
      removeFavorite(recipe.title);
      setSaved(false);
    } else {
      const success = saveRecipe(recipe);

      if (success) {
        setSaved(true);
      }
    }
  }

  function handleDownload() {
    const pdf = new jsPDF();

    pdf.setFontSize(22);
    pdf.text(recipe.title, 15, 20);

    pdf.setFontSize(12);
    pdf.text(`Difficulty: ${recipe.difficulty}`, 15, 35);
    pdf.text(`Cooking Time: ${recipe.cookingTime}`, 15, 45);
    pdf.text(`Servings: ${recipe.servings}`, 15, 55);
    pdf.text(`Cuisine: ${recipe.cuisine}`, 15, 65);

    let y = 80;

    pdf.setFontSize(16);
    pdf.text("Ingredients", 15, y);

    y += 10;

    recipe.ingredients.forEach((ingredient) => {
      pdf.setFontSize(12);
      pdf.text(`• ${ingredient}`, 20, y);
      y += 8;

      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    });

    y += 8;

    pdf.setFontSize(16);
    pdf.text("Steps", 15, y);

    y += 10;

    recipe.steps.forEach((step, index) => {
      const lines = pdf.splitTextToSize(
        `${index + 1}. ${step}`,
        170
      );

      pdf.setFontSize(12);
      pdf.text(lines, 20, y);

      y += lines.length * 7 + 5;

      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    });

    pdf.save(`${recipe.title}.pdf`);
  }

  return (
    <section className="mt-14 animate-rise">

      <RecipeCard recipe={recipe} />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <IngredientsCard
          ingredients={recipe.ingredients}
        />

        <StepsCard
          steps={recipe.steps}
        />

      </div>

      <ActionButtons
        onFavorite={handleFavorite}
        onDownload={handleDownload}
        youtubeLink={recipe.youtubeSearch}
        isFavorite={saved}
      />

    </section>
  );
}

export default RecipeView;