import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Login({ setIsLogin, setForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("נא למלא את כל השדות");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "שגיאה בהתחברות");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-500 rounded p-3 mb-4">
          <p className="text-sm text-red-600 font-semibold text-center">
            {error}
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          אימייל
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          סיסמא
        </label>
        <div className="mt-1">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            dir="ltr"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setForgotPassword(true)}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          שכחת סיסמא?
        </button>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          התחבר
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className="text-sm text-gray-600 hover:text-gray-500"
        >
          אין לך חשבון? הירשם עכשיו
        </button>
      </div>
    </form>
  );
}
