import React, { useState } from "react";
import axios from "axios";
import { SECURITY_QUESTIONS } from '../hooks/securityQuestions'


export default function Register({ setIsLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    securityQuestion: SECURITY_QUESTIONS[0],
    securityAnswer: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.securityAnswer
    ) {
      setError("נא למלא את כל השדות");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    try {
      await axios.post("http://localhost:3001/auth/register", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer,
      });

      alert("ההרשמה הושלמה בהצלחה! אנא התחבר");
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data?.message || "שגיאה בהרשמה");
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          שם משתמש
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            name="password"
            value={formData.password}
            onChange={handleChange}
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
          אימות סיסמא
        </label>
        <div className="mt-1">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="securityQuestion"
          className="block text-sm font-medium text-gray-700"
        >
          שאלת אבטחה
        </label>
        <div className="mt-1">
          <select
            name="securityQuestion"
            value={formData.securityQuestion}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {SECURITY_QUESTIONS.map((question, index) => (
              <option key={index} value={question}>
                {question}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="securityAnswer"
          className="block text-sm font-medium text-gray-700"
        >
          תשובה לשאלת האבטחה
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="securityAnswer"
            value={formData.securityAnswer}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          הרשם
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className="text-sm text-gray-600 hover:text-gray-500"
        >
          כבר יש לך חשבון? התחבר
        </button>
      </div>
    </form>
  );
}
