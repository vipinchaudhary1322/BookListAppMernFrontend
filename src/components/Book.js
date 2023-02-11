import {useNavigate} from "react-router-dom";
import "./style/Book.css";

export default function Books(props) {
  const {book} = props;
  const navigate = useNavigate();
  
  const onClickHandler = (e) => {
    navigate(`/books/${book._id}`);    
  }

  return (
    <div className="book-card">
      <img src="https://source.unsplash.com/200x200/?cute" alt=""/>
      <p className="book-title" onClick={onClickHandler}>{book.title}</p>
      <p className="book-author">{book.author}</p>
      <p className="book-desc">{book.description}</p>
    </div>
  );
}
