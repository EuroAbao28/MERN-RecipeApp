import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import style from "./Home.module.css";
import SavedRecipeCard from "../components/SavedRecipeCard";
import SavedFullRecipe from "./SavedFullRecipe";
import TopNav from "../components/TopNav";

function SavedRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  // When Recipe is click
  const [clickedRecipeID, setClickedRecipeID] = useState("");
  const [clickedRecipe, setClickedRecipe] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    // Fetch all the saved  recipe in the current user
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSavedRecipes();
  }, []);

  console.log(savedRecipes);

  // Check if the recipe is already saved
  const isRecipeSaved = (id) => savedRecipes.includes(id);

  const showRecipeData = async (recipeID) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes/fullRecipe/${recipeID}`
      );
      setClickedRecipe(response.data);
      console.log("This is clickedRecipe:", clickedRecipe);
    } catch (err) {
      console.error(err);
    }
    setClickedRecipeID(recipeID);
  };

  const handleBack = () => {
    setClickedRecipeID("");
  };

  return (
    <div>
      <TopNav page={"Saved Recipes"} />
      <div className={style.homeContainer}>
        {savedRecipes.length > 0 ? (
          <>
            {!clickedRecipeID ? (
              <div className={style.gridContainer}>
                {savedRecipes.map((recipe) => (
                  <SavedRecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    showRecipeData={showRecipeData}
                  />
                ))}
              </div>
            ) : (
              <SavedFullRecipe
                handleBack={handleBack}
                isSaved={isRecipeSaved(clickedRecipe._id)}
                name={clickedRecipe.name}
                ingredients={clickedRecipe.ingredients}
                instructions={clickedRecipe.instructions}
                imageUrl={clickedRecipe.imageUrl}
                cookingTime={clickedRecipe.cookingTime}
                recipeOwner={clickedRecipe.recipeOwner}
              />
            )}
          </>
        ) : (
          <h1 className={style.msg}>You haven't saved any recipe yet.</h1>
        )}
      </div>
    </div>
  );
}

export default SavedRecipe;
