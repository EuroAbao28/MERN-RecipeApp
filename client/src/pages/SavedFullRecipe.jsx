import React from "react";
import style from "./FullRecipe.module.css";
import backIcon from "/left-arrow.png";

function FullRecipe({
  handleBack,
  name,
  ingredients,
  instructions,
  imageUrl,
  cookingTime,
  isSaved,
}) {
  console.log(isSaved);
  return (
    <div className={style.fullRecipeContainer}>
      <img
        className={style.backButton}
        onClick={handleBack}
        src={backIcon}
        alt="arrow"
      />

      <h1>{name}</h1>
      <p>Cooking time: {cookingTime} minutes</p>
      <div className={style.flex}>
        <div className={style.left}>
          <img src={imageUrl} alt="" />
          <h3>How to cook it</h3>
          <p>{instructions}</p>
        </div>
        <div className={style.right}>
          <h3>Ingredients</h3>
          {ingredients.map((ingredients, index) => (
            <li key={index}>{ingredients}</li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FullRecipe;
