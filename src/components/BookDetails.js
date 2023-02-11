import React, { useState, useEffect } from "react";
import "./style/BookDetails.css";
import BACKEND_URL from "../exports";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const deleteBook =(e)=> {
    fetch(`${BACKEND_URL}/books/${location.pathname.split("/")[2]}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("book-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "failed") window.alert(data.error);
        else {
          window.alert("Book successfully Deleted");
          navigate("/books");
        }
      });
  };

  const [inputs, setInputs] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_date: "",
    publisher: "",
  });

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

  return (
    <div className="wrapper-login2">
      <button
        className="btn regBtn"
        type="button"
        onClick={(e) => navigate("/books")}
      >
        Show Book List
      </button>
      <h1 className="heading">Book's Record</h1>
      <h2>View Book's Info</h2>
      <div className="table-wrapper">
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td>Title</td>
              <td>{inputs.title}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Author</td>
              <td>{inputs.author}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>ISBN</td>
              <td>{inputs.isbn}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Publisher</td>
              <td>{inputs.publisher}</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Published Date</td>
              <td>{inputs.published_date}</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Description</td>
              <td>{inputs.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="login-form-wrapper">
        <button
          htmlFor="login-form"
          className="btn delBtn"
          type="button"
          onClick={deleteBook}
        >
          Delete Book
        </button>
        <button
          className="btn regBtn"
          type="button"
          onClick={(e) => navigate(`/books/${location.pathname.split("/")[2]}/edit`)}
        >
          Edit Book
        </button>
      </div>
    </div>
  );
}
