import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import Login from "./Login";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {forgotPassword ? "שחזור סיסמא" : isLogin ? "התחברות" : "הרשמה"}
          </h2>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          {forgotPassword ? (
            <ForgotPassword setForgotPassword={setForgotPassword} />
          ) : isLogin ? (
            <Login
              setIsLogin={setIsLogin}
              setForgotPassword={setForgotPassword}
            />
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  );
}
