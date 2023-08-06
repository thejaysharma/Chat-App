import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [userToken, setUserToken] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userDetails,
        setUserDetails,
        userToken,
        setUserToken,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
