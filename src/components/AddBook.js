import React, { useState } from "react";
import "./style/Login.css";
import BACKEND_URL from "../exports";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [inputs, setInputs] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_date: "",
    publisher: ""
  });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInputs((old) => {
      return { ...old, [e.target.name]: e.target.value };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
      fetch(`${BACKEND_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("book-token")}`
        },
        body: JSON.stringify(inputs),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "failed") window.alert(data.error);
          else {
            window.alert("Book successfully added");
            navigate("/books");
          }
        });
  };

  return (
    <div className="wrapper-login">
      <h2 className="heading">Add Book</h2>
      <div className="login-form-wrapper">
        <form id="login-form" onSubmit={onSubmitHandler}>
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Title"
              name="title"
              value={inputs.title}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="ISBN"
              name="isbn"
              value={inputs.isbn}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Author"
              name="author"
              value={inputs.author}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Describe this Book"
              name="description"
              value={inputs.description}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Published date (yyyy-mm-dd)"
              name="published_date"
              value={inputs.published_date}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Publisher of this Book"
              name="publisher"
              value={inputs.publisher}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button htmlFor="login-form" className="btn logBtn" type="submit">
            Submit
          </button>
          <button
            className="btn regBtn"
            type="button"
            onClick={(e) => navigate("/books")}
          >
            Show Book List
          </button>
        </form>
      </div>
    </div>
  );
}
