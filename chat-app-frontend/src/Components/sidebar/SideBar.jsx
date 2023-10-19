import React, { useState } from "react";
import "./sidebar.scss";
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import { getSenderName, getSenderImage } from "../../Config/ChatsLogic";

export default function SideBar() {
  // state for chat provider
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const {
    userToken,
    userDetails,
    chats,
    selectedChat,
    updateSelectedChat,
    setMessages,
  } = ChatState();

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearch(e.target.value);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const url = `https://chat-app-backend-orpin.vercel.app/api/user?search=${search}`;
      const { data } = await axios.get(url, config);
      setSearchResult(data);
    } catch (err) {
      toast.error("Failed to load the search result", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setSearch("");
    setSearchResult([]);
  };

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const url = "https://chat-app-backend-orpin.vercel.app/api/chat";
      const { data } = await axios.post(url, { userId }, config);

      updateSelectedChat(data);
    } catch (error) {
      console.log(error);
    }
    setSearch("");
    setSearchResult([]);
  };
  // console.log(chats[0].users[1].fullName);

  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <div className="searchbar">
          <input
            className="search_input"
            type="text"
            name=""
            value={search}
            placeholder="Search..."
            onChange={handleSearch}
          />
          {!search ? null : (
            <button className="search_icon" onClick={handleCancel}>
              <RxCross2 />
            </button>
          )}
          <ToastContainer autoClose={3000} />
          {search ? (
            <div className="search-results">
              {searchResult.map((user) => (
                <div
                  key={user._id}
                  className="search-result"
                  onClick={() => accessChat(user._id)}
                  // onClick={() => console.log(user)}
                >
                  <img src={user.avatarUrl} alt="profile pic" />
                  <div className="userdetails">
                    <h3>{user.fullName}</h3>
                    <p>{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="chats-results">
          {chats.map((chatDetails) => (
            <div
              key={chatDetails._id}
              className={
                selectedChat === chatDetails
                  ? "chats-result-selected"
                  : "chats-result-notselected"
              }
              onClick={(() => updateSelectedChat(chatDetails))}
            >
              <img
                src={getSenderImage(userDetails, chatDetails.users)}
                alt="profile pic"
              />
              <div className="chatsdetails">
                <h3>{getSenderName(userDetails, chatDetails.users)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
