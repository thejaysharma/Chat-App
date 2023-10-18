import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

const ChatProvider = (props) => {
  const [userDetails, setUserDetails] = useState({});
  const [userToken, setUserToken] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  // Set User Details
  const updateUserDetails = (value) => {
    setUserDetails(value);
  };

  // Set Token
  const updateUserToken = (value) => {
    setUserToken(value);
  };

  //Set Selected Chats
  const updateSelectedChat = (value) => {
    setSelectedChat(value);
  };

  // Set Chats Messages
  const updateChats = (value) => {
    setChats(value);
  };

  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userDetails,
        updateUserDetails,
        userToken,
        updateUserToken,
        selectedChat,
        updateSelectedChat,
        chats,
        updateChats,
        messages,
        setMessages,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
