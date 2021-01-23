const mongoose = require("mongoose");

const contact = new mongoose.Schema({
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: "_user" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "_user" },
  lastMessageId: { type: mongoose.Schema.Types.ObjectId, ref: "_message" },
  // isContact: { type: Boolean, default: false },
});

exports.contactModel = mongoose.model("_contact", contact);
