import React, { useEffect, useState } from "react";
import "./style/BooksList.css";
import BACKEND_URL from "../exports";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookEdit() {
  const [inputs, setInputs] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_date: "",
    publisher: "",
  });
  const location = useLocation();

  useEffect(() => {
    fetch(`${BACKEND_URL}/books/${location.pathname.split("/")[2]}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("book-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "failed") window.alert(data.error);
        else {
          const {
            title,
            isbn,
            author,
            description,
            published_date,
            publisher,
          } = data.book;
          setInputs({
            title,
            isbn,
            author,
            description,
            published_date,
            publisher,
          });
        }
      });
  }, [location.pathname]);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInputs((old) => {
      return { ...old, [e.target.name]: e.target.value };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetch(`${BACKEND_URL}/books/${location.pathname.split("/")[2]}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("book-token")}`,
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "failed") window.alert(data.error);
        else {
          window.alert("Book successfully updated");
          navigate("/books");
        }
      });
  };

  return (
    <div className="wrapper-login3">
      <h2 className="heading3">Update Book</h2>
      <div className="login-form-wrapper3">
        <form id="login-form3" onSubmit={onSubmitHandler}>
          <div className="input-wrapper3">
            <label>Title</label>
            <input
              className="input3"
              type="text"
              placeholder="Title"
              name="title"
              value={inputs.title}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper3">
            <label>ISBN</label>
            <input
              className="input3"
              type="text"
              placeholder="ISBN"
              name="isbn"
              value={inputs.isbn}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper3">
            <label>Author</label>
            <input
              className="input3"
              type="text"
              placeholder="Author"
              name="author"
              value={inputs.author}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper3">
            <label>Description</label>
            <input
              className="input3"
              type="text"
              placeholder="Describe this Book"
              name="description"
              value={inputs.description}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper3">
            <label>Published Date (yyyy-mm-dd)</label>
            <input
              className="input3"
              type="text"
              placeholder="Published date (yyyy-mm-dd)"
              name="published_date"
              value={inputs.published_date}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-wrapper3">
            <label>Publisher</label>
            <input
              className="input3"
              type="text"
              placeholder="Publisher of this Book"
              name="publisher"
              value={inputs.publisher}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button htmlFor="login-form" className="btn3 updateBtn" type="submit">
            Update Book
          </button>
          <button
            className="btn3 regBtn"
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
