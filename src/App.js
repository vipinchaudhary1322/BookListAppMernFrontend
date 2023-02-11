import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook";
import BookEdit from "./components/BookEdit";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route index element={<Login/>}/>  
            <Route path="/register" element={<Register/>}/>  
            <Route path="/books" element={<BooksList/>}/>  
            <Route path="/books/new" element={<AddBook/>}/>  
            <Route path="/books/:id" element={<BookDetails/>}/>  
            <Route path="/books/:id/edit" element={<BookEdit/>}/>  
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
