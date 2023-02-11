import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Book from "./Book";
import BACKEND_URL from "../exports";
import "./style/BooksList.css";

export default function BooksList(props) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("book-token")) { return navigate("/");}
    fetch(`${BACKEND_URL}/books`, {
      method:"GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("book-token")}`
      }
    }).then(res => res.json()).then(data => {
      console.log(data);
      if (data.message === "this is a protected route provide token") {
        return navigate("/");
      }
      if (data.status === "failed") { return window.alert("data.message");}
      if (data.status === "success") { setBooks(data.books);}});
  }, [navigate]);

  return (
    <div className="bookslist-wrapper">
      <h2>Books List</h2>
      <button class="addNewBtn" type="button" onClick={(e) => navigate("/books/new")}>+ Add New Book</button>
      <div className="books-wrapper">
        {books.length > 0 && books.map(book => {
          return (<Book book={book} key={book._id}/>);
        })}
      </div>
    </div>  
    
  );
}
