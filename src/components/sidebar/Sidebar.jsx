import React, { useState } from "react";
import {
  FaBars,
  FaProductHunt,
  FaShoppingBasket,
  FaShoppingCart,
  FaShopware,
  FaSignOutAlt,
  FaTasks,
  FaTh,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItems = [
    {
      path: "/app",
      name: "Home",
      icon: <FaTh />,
    },
    {
      path: "/products",
      name: "Products",
      icon: <FaShoppingCart />,
    },
    {
      path: "/tasks",
      name: "Tasks",
      icon: <FaTasks />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUser />,
    },
  ];

  async function logout() {
    // localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: isOpen ? "300px" : "50px",
        }}
        className="sidebar"
      >
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            TaskMan
          </h1>
          <div
            style={{ marginLeft: isOpen ? "110px" : "0px" }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassname="active"
          >
            <div className="icon">{item.icon} </div>
            <div
              className="link_text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              {item.name}
            </div>
          </NavLink>
        ))}

        <div className="sidebar_bottom_section">
          <p id="logoutTooltip" data-tooltip-content="Logout">
            <FaSignOutAlt className="btn_logout" onClick={logout} />
          </p>
          <ReactTooltip anchorId="logoutTooltip" noArrow />
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
