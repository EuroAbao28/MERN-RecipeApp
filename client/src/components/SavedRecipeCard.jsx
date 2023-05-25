import React from "react";

import style from "./RecipeCard.module.css";

function SavedRecipeCard({ recipe, showRecipeData }) {
  return (
    <div
      onClick={() => showRecipeData(recipe._id)}
      className={style.cardContainer}>
      <div className={style.header}>
        <p>{recipe.name}</p>
      </div>
      <p className={style.cookingTime}>{recipe.cookingTime} minutes</p>

      <div className={style.imgContainer}>
        <img src={recipe.imageUrl} alt={recipe.name} />
      </div>
    </div>
  );
}

export default SavedRecipeCard;
