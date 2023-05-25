import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import menuIcon from "/burger-menu.svg";

function NavBar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <nav className="side-nav open">
      <h1>Chef's Website</h1>
      {cookies.access_token ? (
        <>
          <Link to={"/"}>Home</Link>
          <Link to={"/create-recipe"}>Create Recipe</Link>
          <Link to={"/saved-recipes"}>Saved Recipes</Link>
          <p className="logout" onClick={handleLogout}>
            Logout
          </p>
        </>
      ) : (
        <>
          <Link to={"/"}>Home</Link>
          <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
