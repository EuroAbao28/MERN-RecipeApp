import React, { useState } from "react";
import TopNav from "../components/TopNav";
import style from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  // Notification Messsage
  const [notifyMessage, setNotifyMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!username || !password || !conPassword) {
      setNotifyMessage("Please fill up all the fields.");
      setStatus(`${style.errorMessage}`);
    }

    if (password && conPassword) {
      if (password != conPassword) {
        setNotifyMessage("Your password does not match.");
        setStatus(`${style.errorMessage}`);
      } else {
        try {
          const response = await axios.post("http://localhost:3001/register", {
            username,
            password,
          });

          if (response.data.errorMsg) {
            setNotifyMessage(response.data.errorMsg);
          } else {
            navigate("/login");
            alert("Registered Successfully!");
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  return (
    <div>
      <div className={style.loginContainer}>
        <div className={style.formContainer}>
          <h1>Create Account</h1>
          {notifyMessage && (
            <p onClick={() => setNotifyMessage("")} className={status}>
              {notifyMessage}
            </p>
          )}
          <form action="" onSubmit={handleRegister}>
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
            <label htmlFor="conPassword">Confirm Password</label>
            <input
              type="password"
              id="conPassword"
              placeholder="enter here"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
            />
            <button>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
