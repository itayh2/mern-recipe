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
        console.error(err);
      }
    };
    if (userID) {
      fetchSavedRecipe();
    }
  }, [userID]);

  const removeSavedRecipe = async (recipeID) => {
    try {
      await axios.delete(
        `http://localhost:3001/recipes/savedRecipes/${userID}/${recipeID}`
      );
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeID)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Saved Recipes
      </h1>

      {savedRecipes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-xl text-gray-600 font-medium">No Recipes saved yet</p>
            <p className="text-gray-500">Your saved recipes will appear here</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeSavedRecipe(recipe._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {recipe.name}
                </h2>

                <div className="mb-4">
                  <h3 className="text-md font-medium mb-2 text-gray-700">
                    Ingredients:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {recipe.ingredients.map((ing, index) => (
                      <li key={index} className="text-sm">
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="text-md font-medium mb-2 text-gray-700">
                    Instructions:
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {recipe.instructions}
                  </p>
                </div>

                <div className="flex items-center justify-end mt-4">
                  <span className="text-sm text-gray-500">
                    Cooking Time: {recipe.cookingTime} minutes
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}