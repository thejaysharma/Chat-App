import React, { useState, useEffect } from "react";
import "./nav.scss";
import { Link } from "react-router-dom";
import LOGO from "../../Assest/logo.webp";
import { useNavigate } from "react-router-dom";


export default function Nav() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [isNotLoggedin, setIsNotLoggedin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token");
    setData({
      name: localStorage.getItem("name"),
      image: localStorage.getItem("image"),
    });

    if (!user) {
      setIsNotLoggedin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("image");
    navigate("/");
  };
  return (
    <div>
      <div className="nav">
        <div className="nav_container">
          <div className="left_items">
            <img src={LOGO} alt="logo" />
          </div>
          {!isNotLoggedin ? (
            <div className="right_items_loggedin">
              <div className="userDetails">
                <img src={data.image} alt="Profile" />
                <span className="name">{data.name}</span>
                <ul className="ul_loggedin">
                  <li className="li_loggedin">
                    <span onClick={handleLogout}>Logout </span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="right_items">
              <ul className="nav_links">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
