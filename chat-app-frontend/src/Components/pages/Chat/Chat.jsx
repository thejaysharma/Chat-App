import React, { useEffect } from "react";
import SideBar from "../../sidebar/SideBar";
import MessageForm from "../../messageform/MessageForm";
import "./chat.scss";
import Nav from "../../nav/Nav";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <div className="chat" id="chat">
      <Nav />
      <div className="container chat_container">
        <div className="sidebar">
          {user && <SideBar />}
        </div>
        <div className="messageForm">
          {user && <MessageForm />}
        </div>
      </div>
    </div>
  );
}
