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
