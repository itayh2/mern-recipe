import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export default function Auth() {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
}

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      username={username}
      setUserName={setUserName}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now Please Login");
      //   setUserName("");
      //   setPassword("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      username={username}
      setUserName={setUserName}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUserName,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label
            htmlFor={label === "Login" ? "login-username" : "register-username"}
          >
            Username:
          </label>
          <input
            type="text"
            id={label === "Login" ? "login-username" : "register-username"}
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor={label === "Login" ? "login-password" : "register-password"}
          >
            Password:{" "}
          </label>
          <input
            type="password"
            id={label === "Login" ? "login-password" : "register-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};
