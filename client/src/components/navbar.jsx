import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/createRecipe">Create Recipe</Link>
      <Link to="/savedRecipes">Saved Recipes</Link>
      <Link to="/auth">Login/Register</Link>
    </div>
  );
}
