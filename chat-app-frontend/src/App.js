import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/pages/Home/Home";
import Chat from "./Components/pages/Chat/Chat";
import Login from "./Components/pages/Login/Login";
import SignUp from "./Components/pages/SignUp/SignUp";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}

export default App;
