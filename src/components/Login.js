import React, { useState } from "react";
import "./style/Login.css";
import BACKEND_URL from "../exports";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInputs((old) => {
      return { ...old, [e.target.name]: e.target.value };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inputs.username && inputs.password) {
      fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "failed") window.alert(data.message);
          else {
            localStorage.setItem("book-token", data.payload);
            navigate("/books");
          }
        });
    }
  };

  return (
    <div className="wrapper-login">
      <h2 className="heading">Member Login</h2>
      <div className="login-form-wrapper">
        <form id="login-form" onSubmit={onSubmitHandler}>
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button htmlFor="login-form" className="btn logBtn" type="submit">
            LOGIN
          </button>
          <button
            className="btn regBtn"
            type="button"
            onClick={(e) => navigate("/register")}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
