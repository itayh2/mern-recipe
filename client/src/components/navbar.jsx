import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
      <Link to="/createRecipe" className={location.pathname === "/createRecipe" ? "active" : ""}>Create Recipe</Link>
      {!cookies.access_token ? (
        <Link to="/auth" className={location.pathname === "/auth" ? "active" : ""}>Login/Register</Link>
      ) : (
        <>
          <Link to="/savedRecipes" className={location.pathname === "/savedRecipes" ? "active" : ""}>Saved Recipes</Link>
          <button className="logOutButton" onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}
