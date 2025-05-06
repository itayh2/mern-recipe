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
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Left side navigation links */}
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`inline-flex ml-3 items-center px-3 py-2 text-sm font-medium hover:text-blue-600 transition-colors
                ${
                  location.pathname === "/"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
            >
              בית
            </Link>

            <Link
              to="/createRecipe"
              className={`inline-flex items-center px-3 py-2 text-sm font-medium hover:text-blue-600 transition-colors
                ${
                  location.pathname === "/createRecipe"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
            >
              הוספת מתכון
            </Link>

            {cookies.access_token && (
              <Link
                to="/savedRecipes"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium hover:text-blue-600 transition-colors
                  ${
                    location.pathname === "/savedRecipes"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
              >
                מתכונים שמורים
              </Link>
            )}
          </div>

          <div className="flex items-center">
            {!cookies.access_token ? (
              <Link
                to="/auth"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors
                  ${location.pathname === "/auth" ? "bg-blue-700" : ""}`}
              >
                כניסה/הרשמה
              </Link>
            ) : (
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                התנתקות
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
