import React, { useEffect, useState } from "react";
import menuIcon from "/burger-menu.svg";
import userIcon from "/account.png";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

function TopNav({ page, toggleSideBar }) {
  const userID = useGetUserID();

  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getUser/${userID}`
        );
        setCurrentUser(response.data.username);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch current user when component mounts
    fetchCurrentUser();
  }, []);

  return (
    <nav className="top-nav">
      <div className="left">
        <img onClick={toggleSideBar} src={menuIcon} alt="" />
        <p className="current-page">{page}</p>
      </div>

      {currentUser && (
        <div className="right">
          <img src={userIcon} alt="" />
          <p className="user">{currentUser}</p>
        </div>
      )}
    </nav>
  );
}

export default TopNav;
