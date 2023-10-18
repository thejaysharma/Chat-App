import React, { useEffect, useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollableFeed from "react-scrollable-feed";
import { isSameSenderMargin, isSameUser } from "../../../Config/ChatsLogic";

export default function ChatMessage() {
  const [LoggedUser, setLoggedUser] = useState();
  const {
    userToken,
    userDetails,
    chats,
    updateChats,
    selectedChat,
    messages,
    setMessages,
  } = ChatState();

  const FetchMessagesDetails = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const url = `https://chat-app-backend-orpin.vercel.app/api/chat`;
      const { data } = await axios.get(url, config);

      if (!chats.find((c) => c._id === data._id)) updateChats([data, ...chats]);

      updateChats(data);
    } catch (err) {
      toast.error("Failed to load the Chat User Details", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

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
      console.log(data);
      setMessages(data);
    } catch (error) {
      toast.error("Failed to load the Chat Messages", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userDetails")));
    FetchMessagesDetails();
  }, []);

  useEffect(() => {
    fetchAllMessage();
  }, [selectedChat]);

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <ScrollableFeed>
        {messages &&
          messages.map((msg, index) => (
            <div style={{ display: "flex" }} key={msg._id}>
              <span
                style={{
                  color: "#57419d",
                  backgroundColor: `${
                    msg.sender._id === userDetails._id ? "#fecb82" : "#c1bcf9"
                  }`,
                  marginLeft: isSameSenderMargin(
                    messages,
                    msg,
                    index,
                    userDetails._id
                  ),
                  marginTop: isSameUser(messages, msg, index, userDetails._id)
                    ? 3
                    : 5,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {msg.content}
              </span>
            </div>
          ))}
      </ScrollableFeed>
    </div>
  );
}
