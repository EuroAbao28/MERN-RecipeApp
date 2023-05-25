import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import style from "./Home.module.css";
import { useGetUserID } from "../hooks/useGetUserID";
import FullRecipe from "./FullRecipe";
import TopNav from "../components/TopNav";
import { useCookies } from "react-cookie";

function home() {
  const [cookies, _] = useCookies(["access_token"]);

  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  // When Recipe is click
  const [clickedRecipeID, setClickedRecipeID] = useState("");
  const [clickedRecipe, setClickedRecipe] = useState([]);

  useEffect(() => {
    // Fetch all the recipe
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch the savedRecipes of current user
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();

    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  // Saving recipe onclick
  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );

      setSavedRecipes(response.data.savedRecipes);
      console.log(response.data.savedRecipes);
    } catch (err) {
      alert(err.response.data);
      console.error(err);
    }
  };

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
      <TopNav page={"Home"} />
      <div className={style.homeContainer}>
        {!clickedRecipeID ? (
          <div className={style.gridContainer}>
            {recipes.map((recipe) => (
              <RecipeCard
                showRecipeData={showRecipeData}
                key={recipe._id}
                recipe={recipe}
                isSaved={isRecipeSaved(recipe._id)}
                saveRecipe={saveRecipe}
              />
            ))}
          </div>
        ) : (
          <FullRecipe
            handleBack={handleBack}
            saveRecipe={() => saveRecipe(clickedRecipe._id)}
            isSaved={isRecipeSaved(clickedRecipe._id)}
            name={clickedRecipe.name}
            ingredients={clickedRecipe.ingredients}
            instructions={clickedRecipe.instructions}
            imageUrl={clickedRecipe.imageUrl}
            cookingTime={clickedRecipe.cookingTime}
            recipeOwner={clickedRecipe.recipeOwner}
          />
        )}
      </div>
    </div>
  );
}

export default home;
