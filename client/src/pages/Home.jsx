import React, { useEffect, useState } from "react";
import axios from "axios";
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
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchRecipe();
    if (userID) {
      fetchSavedRecipe();
    }
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        מתכונים
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48">
              <img 
                src={recipe.imageUrl} 
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {recipe.name}
              </h2>
              
              <div className="mb-4">
                <h3 className="text-md font-medium mb-2 text-gray-700">מרכיבים:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {recipe.ingredients.map((ing, index) => (
                    <li key={index} className="text-sm">
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h3 className="text-md font-medium mb-2 text-gray-700">הוראות:</h3>
                <p className="text-sm text-gray-600 line-clamp-5">
                  {recipe.instructions}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">
                  זמן בישול: {recipe.cookingTime} דקות
                </span>
                
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${isRecipeSaved(recipe._id)
                      ? 'bg-green-100 text-green-800 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}