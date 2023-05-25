import React from "react";
import style from "./RecipeCard.module.css";
import heartOuline from "/heart_outline.png";
import heartSolid from "/heart_solid.png";

function RecipeCard({ recipe, saveRecipe, isSaved, showRecipeData }) {
  return (
    <div className={style.cardContainer}>
      <div className={style.header}>
        <p onClick={() => showRecipeData(recipe._id)}>{recipe.name}</p>
        {isSaved ? (
          <img className={style.savedRecipe} src={heartSolid} alt="" />
        ) : (
          <img
            onClick={() => saveRecipe(recipe._id)}
            className={style.heartOutline}
            src={heartOuline}
            alt=""
          />
        )}
      </div>
      <p
        onClick={() => showRecipeData(recipe._id)}
        className={style.cookingTime}>
        {recipe.cookingTime} minutes
      </p>

      <div
        onClick={() => showRecipeData(recipe._id)}
        className={style.imgContainer}>
        <img src={recipe.imageUrl} alt={recipe.name} />
      </div>
    </div>
  );
}

export default RecipeCard;
