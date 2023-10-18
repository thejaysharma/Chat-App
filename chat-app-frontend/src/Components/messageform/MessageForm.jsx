import React, { useState } from "react";
import "./messageform.scss";
import { IoSend } from "react-icons/io5";
import ChatMessage from "../pages/ChatMessage/ChatMessage";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { getSenderName } from "../../Config/ChatsLogic";

export default function MessageForm() {
  const { userToken, userDetails, selectedChat, messages, setMessages } =
    ChatState();

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        };

        setNewMessage("");

        const url = "https://chat-app-backend-orpin.vercel.app/api/message";
        const { data } = await axios.post(
          url,
          { content: newMessage, chatId: selectedChat._id },
          config
        );

        console.log(data);

        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleMessages = (e) => {
    setNewMessage(e.target.value);
  };
  // console.log(getSenderName(userDetails, selectedChat.users));

  return (
    <div className="messageform">
      <div className="messageform_container">
        {selectedChat ? (
          <>
            <h2>{getSenderName(userDetails, selectedChat.users)}</h2>
          </>
        ) : null}

        <div className="message_output">{userToken && <ChatMessage />}</div>
        <div className="send_message_bar">
          <form className="search-form form" onSubmit={sendMessage}>
            <input
              className="search-field"
              placeholder="Your Message..."
              onChange={handleMessages}
              value={newMessage}
            />
            <button className="search-submit button">
              <IoSend className="send-button" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
