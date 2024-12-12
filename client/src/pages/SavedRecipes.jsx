import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://itayrecipes.netlify.app/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes || []);
      } catch (err) {
        console.err(err);
      }
    };
    if (userID) {
      fetchSavedRecipe();
    }
  }, [userID]);

  const removeSavedRecipe = async (recipeID) => {
    try {
      await axios.delete(
        `https://itayrecipes.netlify.app/recipes/savedRecipes/${userID}/${recipeID}`
      );
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeID)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="recipes-header">Saved Recipes</h1>
      <div className="recipes-container">
        {savedRecipes.length === 0 ? (
          <div className="no-recipes">
            <p>No Recipes saved yet</p>
          </div>
        ) : (
          savedRecipes.map((recipe) => (
            <div className="recipe-card" key={recipe._id}>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <div className="details-container">
                <h2>{recipe.name}</h2>
                <ul>
                  {recipe.ingredients.map((ing) => (
                    <li key={ing.id}>{ing}</li>
                  ))}
                </ul>
                <p className="instructions">{recipe.instructions}</p>
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
                <button onClick={() => removeSavedRecipe(recipe._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
