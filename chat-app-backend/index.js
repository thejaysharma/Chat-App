const express = require("express");
const connections = require("./config/DBConnection");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoute");
const chatRoutes = require("./Routes/chatRoutes");
const cors = require("cors");
const messageRoutes = require("./Routes/messageRoutes");

dotenv.config();
connections();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`Listening on ${port}`));

//Socket Io Implementation

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://chat-app-sigma-coral.vercel.app/",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to Socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (chatId) => {
    socket.join(chatId);
    console.log("User join chat: " + chatId);
  });

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("Chat.user not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
