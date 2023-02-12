import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import HOMEIMG from "../../../Assest/HOMEIMG.png";
import { IoIosChatbubbles } from "react-icons/io";
import Nav from "../../nav/Nav";

export default function Home() {
  return (
    <div className="home" id="home">
      <Nav />
      <div className="container home_container">
        <div className="box1">
          <div>
            <span>
              <h1>Share the world with your friends</h1>
            </span>
            <span>
              <h3>Chat App lets you connect with the world</h3>
            </span>
            <span>
              <Link to="/chat" className="btn btn-primary">
                Get Started <IoIosChatbubbles className="btn__icon" />
              </Link>
            </span>
          </div>
        </div>
        <div className="box2">
          <img src={HOMEIMG} alt="home" />
        </div>
      </div>
    </div>
  );
}
