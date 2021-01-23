const mongoose = require("mongoose");

const room = new mongoose.Schema({
  // name: { type: String },
  // memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "_user" }],

  name: { type: String },
  memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "_user" }],
  lastMessageId: { type: mongoose.Schema.Types.ObjectId, ref: "_message" },
});
0
exports.roomModel = mongoose.model("_room", room);
