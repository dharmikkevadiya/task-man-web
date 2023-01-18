import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  async function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect();

  return (
    <div>
      <Link to="">Home</Link>
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
      )}
    </div>
  );
};

export default navbar;
