import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollableFeed from "react-scrollable-feed";
import { isSameSenderMargin, isSameUser } from "../../../Config/ChatsLogic";
import { ChatState } from "../../../Context/ChatProvider";
import Loader from "../../Loaders/Loader";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function ChatMessage(props) {
  const [LoggedUser, setLoggedUser] = useState();
  const { userToken, userDetails, chats, updateChats } = ChatState();

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
      toast.error(`${err}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userDetails")));
    FetchMessagesDetails();
  }, []);

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <ScrollableFeed>
        {props.messages ? (
          props.messages.map((msg, index) => (
            <div style={{ display: "flex" }} key={msg._id}>
              <span
                style={{
                  color: "#57419d",
                  backgroundColor: `${
                    msg.sender._id === userDetails._id ? "#fecb82" : "#c1bcf9"
                  }`,
                  marginLeft: isSameSenderMargin(
                    props.messages,
                    msg,
                    index,
                    userDetails._id
                  ),
                  marginTop: isSameUser(
                    props.messages,
                    msg,
                    index,
                    userDetails._id
                  )
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
          ))
        ) : (
          <Loader />
        )}
      </ScrollableFeed>
    </div>
  );
}
