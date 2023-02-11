import React, { useEffect } from "react";
import "./style/Home.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const logOut = (e) => {
    localStorage.removeItem("book-token");
    navigate("/");
  };

  useEffect(() => {
    if (
      !localStorage.getItem("book-token") &&
      location.pathname.split("/")[1] === "books"
    ) {
      return navigate("/");
    }
  }, [navigate, location.pathname]);
  return (
    <div className="home-wrapper">
      {location.pathname.split("/")[1] === "books" && (
        <button id="logout" type="button" onClick={logOut}>
          Logout
        </button>
      )}
      <Outlet />
    </div>
  );
}
