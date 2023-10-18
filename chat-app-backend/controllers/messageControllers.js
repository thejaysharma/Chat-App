const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const { User } = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400).send({ message: "Invalid Data passed" });
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "fullName avatarUrl");

    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "fullName avatarUrl email",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "fullName avatarUrl email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { sendMessage, allMessages };
