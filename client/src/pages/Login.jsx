import React, { useState } from "react";
import TopNav from "../components/TopNav";
import style from "./Login.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies("access_token");

  // Notification Messsage
  const [notifyMessage, setNotifyMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      return (
        setNotifyMessage("Please fill up all the fields."),
        setStatus(`${style.errorMessage}`)
      );
    }

    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      if (!response.data.token)
        return (
          setNotifyMessage(response.data.message),
          setStatus(`${style.errorMessage}`)
        );

      // If all goods
      console.log(response.data.userID);
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className={style.loginContainer}>
        <div className={style.formContainer}>
          <h1>Login Form</h1>
          {notifyMessage && (
            <p onClick={() => setNotifyMessage("")} className={status}>
              {notifyMessage}
            </p>
          )}
          <form action="" onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="enter here"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="enter here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
