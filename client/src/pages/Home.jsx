import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.err(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes || []);
      } catch (err) {
        console.err(err);
      }
    };
    if (userID) {
      fetchRecipe();
      fetchSavedRecipe();
    }
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  // const removeRecipe = async (recipeID) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:3001/recipes/savedRecipes/${userID}/${recipeID}`
  //     );
  //     setSavedRecipes(response.data.savedRecipes);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
