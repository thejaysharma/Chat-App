import React, { useEffect, useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChatMessage() {
  const [LoggedUser, setLoggedUser] = useState();
  const { userDetails, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();

  const FetchMessages = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const url = `https://chat-app-backend-orpin.vercel.app/api/chat`;
      const { data } = await axios.get(url, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setChats(data);
    } catch (err) {
      toast.error("Failed to load the Chat Messages", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    useEffect(() => {
      setLoggedUser(JSON.parse(localStorage.getItem("userDetails")));
      FetchMessages();
    }, []);
  };
  return (
    <div>
      <ToastContainer autoClose={3000} />
      my chats
    </div>
  );
}
