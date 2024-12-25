
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword({ setForgotPassword }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkEmail = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/check-security",
        {
          email,
        }
      );

      setSecurityQuestion(response.data.securityQuestion);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "שגיאה בטעינת שאלת האבטחה");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    try {
      await axios.post("http://localhost:3001/auth/reset-password", {
        email,
        securityAnswer,
        newPassword,
      });

      alert("הסיסמא שונתה בהצלחה!");
      setForgotPassword(false);
      navigate("/auth");
    } catch (err) {
      setError(err.response?.data?.message || "שגיאה באיפוס הסיסמא");
    }
  };

  if (step === 1) {
    return (
      <form onSubmit={checkEmail} className="space-y-6">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              dir="ltr"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            המשך
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setForgotPassword(false)}
            className="text-sm text-gray-600 hover:text-gray-500"
          >
            חזור להתחברות
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={resetPassword} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-500 rounded p-3 mb-4">
          <p className="text-sm text-red-600 font-semibold text-center">
            {error}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          שאלת אבטחה:
        </label>
        <p className="mt-1 text-sm text-gray-900">{securityQuestion}</p>
      </div>

      <div>
        <label
          htmlFor="securityAnswer"
          className="block text-sm font-medium text-gray-700"
        >
          תשובה
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700"
        >
          סיסמא חדשה
        </label>
        <div className="mt-1">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          אימות סיסמא חדשה
        </label>
        <div className="mt-1">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          שנה סיסמא
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setForgotPassword(false)}
          className="text-sm text-gray-600 hover:text-gray-500"
        >
          חזור להתחברות
        </button>
      </div>
    </form>
  );
}
