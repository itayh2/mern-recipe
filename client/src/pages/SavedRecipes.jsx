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
          `http://localhost:3001/recipes/savedRecipes/${userID}`
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

  // const removeSavedRecipe = async (recipeID) => {
  //   try {
  //     await axios.put(`http://localhost:3001/recipes/removeSavedRecipe`, {
  //       recipeID,
  //       userID,
  //     });
  //     setSavedRecipes((prevRecipes) =>
  //       prevRecipes.filter((recipe) => recipe._id !== recipeID)
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              {/* <button onClick={removeSavedRecipe(recipe._id)}>Unsave</button> */}
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
