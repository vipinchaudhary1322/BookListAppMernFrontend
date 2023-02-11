import React, { useState } from "react";
import "./style/Login.css";
import BACKEND_URL from "../exports";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInputs((old) => {
      return { ...old, [e.target.name]: e.target.value };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inputs.cpassword !== inputs.password) {
      window.alert("Passwords are not same");
      return;
    }
    if (inputs.username && inputs.password) {
      fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "failed") window.alert(data.error);
          else {
            window.alert("successfully Registered");
            navigate("/");
          }
        });
    }
  };

  return (
    <div className="wrapper-login">
      <h2 className="heading">Register</h2>
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
          <div className="input-wrapper">
            <input
              className="input"
              type="password"
              placeholder="Confirm Password"
              name="cpassword"
              value={inputs.cpassword}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button htmlFor="login-form" className="btn logBtn" type="submit">
            REGISTER
          </button>
          <button
            className="btn regBtn"
            type="button"
            onClick={(e) => navigate("/")}
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
