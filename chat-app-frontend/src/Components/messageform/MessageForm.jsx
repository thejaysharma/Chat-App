import React from "react";
import "./messageform.scss";
import { IoSend } from "react-icons/io5";
import ChatMessage from "../pages/ChatMessage/ChatMessage";
import { ChatState } from "../../Context/ChatProvider";

export default function MessageForm() {
  const { userToken } = ChatState();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="messageform">
      <div className="messageform_container">
        <div className="message_output">{userToken && <ChatMessage />}</div>
        <div className="send_message_bar">
          <form className="search-form form">
            <input className="search-field" placeholder="Your Message..." />
            <button className="search-submit button">
              <IoSend className="send-button" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
