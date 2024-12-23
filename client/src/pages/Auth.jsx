import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth">
      <div className="auth-container">
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
}

const Login = ({ setIsLogin }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
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
      switchForm={() => setIsLogin(false)}
      switchLabel="Register"
    />
  );
};

const Register = ({ setIsLogin }) => {
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
      setIsLogin(true);
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
      switchForm={() => setIsLogin(true)}
      switchLabel="Login"
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
  switchForm,
  switchLabel,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>{label}</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="submit">{label}</button>
        <button type="button" onClick={switchForm} className="switch-form">
          {switchLabel}
        </button>
      </div>
    </form>
  );
};
