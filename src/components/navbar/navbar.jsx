import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  const fullName = `${user?.firstName} ${user?.lastName}`;

  async function logout() {
    // localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="navbar">
      {/* <Link to="">Home</Link>
      {username ? (
        <div>
          <Link to={"/u/" + username}>Profile</Link>
          <div onClick={logout}>Logout</div>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )} */}
      <h1>Welcome [{fullName}] </h1>
      <FaSignOutAlt className="navbar_btn_logout" onClick={logout} />

      {/* <div className="sidebar_bottom_section">
        <p id="logoutTooltip" data-tooltip-content="Logout">
          <FaSignOutAlt className="btn_logout" onClick={logout} />
        </p>
        <ReactTooltip anchorId="logoutTooltip" noArrow />
      </div> */}
    </div>
  );
};

export default Navbar;
