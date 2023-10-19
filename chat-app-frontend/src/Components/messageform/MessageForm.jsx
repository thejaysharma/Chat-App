import React, { useState, useEffect } from "react";
import "./messageform.scss";
import { IoSend } from "react-icons/io5";
import ChatMessage from "../pages/ChatMessage/ChatMessage";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { getSenderName } from "../../Config/ChatsLogic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

const ENDPOINT = "https://chat-app-backend-orpin.vercel.app";
var socket, selectedChatCompare;

export default function MessageForm() {
  const [socketConnection, setSocketConnection] = useState(false);
  const { userToken, userDetails, selectedChat, messages, setMessages } =
    ChatState();

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userDetails);
    socket.on("connection", () => setSocketConnection(true));
  }, []);

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
        socket.emit("new message", data);
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

  // Chats Messages

  const fetchAllMessage = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const url = `https://chat-app-backend-orpin.vercel.app/api/message/${selectedChat._id}`;

      const { data } = await axios.get(url, config);
      // console.log(data);

      setMessages(data);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Failed to load the Chat Messages", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    fetchAllMessage();
    selectedChatCompare = selectedChat;
  }, [selectedChat, messages]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare !== newMessageRecieved.chat._id
      ) {
        //give notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <div className="messageform">
      <div className="messageform_container">
        {selectedChat ? (
          <>
            <h2>{getSenderName(userDetails, selectedChat.users)}</h2>
          </>
        ) : null}

        <div className="message_output">
          {userToken && <ChatMessage messages={messages} />}
        </div>
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
