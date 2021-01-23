const mongoose = require("mongoose");

const message = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "_user" },
  // receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "_user" },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "_room" },
  message: { type: String },
  isNewMessage: { type: Boolean },
  date: { type: Date, default: Date.now() },
  // roomId: { type: mongoose.Schema.Types.ObjectId, ref: "_room" },
});

exports.messageModel = mongoose.model("_message", message);
