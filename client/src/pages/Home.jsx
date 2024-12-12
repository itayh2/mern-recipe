import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("https://itayrecipes.netlify.app/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.err(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://itayrecipes.netlify.app/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.err(err);
      }
    };
    fetchRecipe();

    if (userID) {
      fetchSavedRecipe();
    }
  }, [userID]); // This array c ontrols when the effect should re-run, if userID changes, the effect will be re-executed

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://itayrecipes.netlify.app/recipes",
        {
          recipeID,
          userID,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <>
      <h1 className="recipes-header">Recipes</h1>
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <div className="details-container">
              <h2>{recipe.name}</h2>
              <ul>
                {recipe.ingredients.map((ing) => (
                  <li key={ing._id}>{ing}</li>
                ))}
              </ul>
              <p className="instructions">{recipe.instructions}</p>
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
