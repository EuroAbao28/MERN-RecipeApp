import React, { useState } from "react";
import TopNav from "../components/TopNav";
import style from "./CreateRecipe.module.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

function CreateRecipe() {
  const [cookies, _] = useCookies(["access_token"]);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const userID = useGetUserID();
  const [newIngredients, setNewIngredients] = useState("");
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    recipeOwner: userID,
  });

  const handleRecipeChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredients = () => {
    if (newIngredients == "") return;
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, newIngredients],
    });
    setNewIngredients("");
  };

  function removeIngredients(index) {
    const newIng = [...recipe.ingredients];
    newIng.splice(index, 1);
    setRecipe({ ...recipe, ingredients: newIng });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(recipe);
    if (
      !recipe.name ||
      !recipe.cookingTime ||
      !recipe.imageUrl ||
      recipe.ingredients.length == 0 ||
      !recipe.instructions ||
      !recipe.recipeOwner
    )
      return setErrorMsg("Please fill up all the fields.");
    try {
      const response = await axios.post(
        "http://localhost:3001/recipes",
        recipe,
        { headers: { authorization: cookies.access_token } }
      );
      setSuccessMsg(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <TopNav page={"Create Recipe"} />
      <div className={style.createRecipeContainer}>
        <div className={style.formContainer}>
          <h1>New Recipe</h1>
          {errorMsg && (
            <p onClick={() => setErrorMsg("")} className={style.errorMsg}>
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p onClick={() => setSuccessMsg("")} className={style.successMsg}>
              {successMsg}
            </p>
          )}
          <form onSubmit={handleSubmit} className={style.form} action="">
            <div className={style.left}>
              <label htmlFor="name">Name</label>
              <input
                onChange={handleRecipeChange}
                type="text"
                name="name"
                id="name"
                placeholder="Dish name"
              />
              <label htmlFor="instructions">Instructions</label>
              <textarea
                onChange={handleRecipeChange}
                name="instructions"
                id="instructions"
                placeholder="How would you do it"
              />
              <label htmlFor="imageUrl">Image URL</label>
              <input
                onChange={handleRecipeChange}
                type="text"
                name="imageUrl"
                id="imageUrl"
                placeholder="https://www.example.com"
              />
              <label htmlFor="cookingTime">Cooking Time</label>
              <input
                onChange={handleRecipeChange}
                type="text"
                name="cookingTime"
                id="cookingTime"
                placeholder="In minutes"
              />
              <div className={style.action}>
                <button type="submit">Save Recipe</button>
              </div>
            </div>
            <div className={style.right}>
              <label htmlFor="ingredients">Ingredients</label>
              <div className={style.addIng}>
                <input
                  onChange={(e) => setNewIngredients(e.target.value)}
                  value={newIngredients}
                  type="text"
                  name="ingredients"
                  id="ingredients"
                  placeholder="Ingredients"
                />
                <button onClick={addIngredients} type="button">
                  Add
                </button>
              </div>
              <div className={style.IngList}>
                {recipe.ingredients.map((ingredients, index) => (
                  <li
                    key={index}
                    onClick={() => removeIngredients(index)}
                    type="text">
                    {ingredients}
                  </li>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;
