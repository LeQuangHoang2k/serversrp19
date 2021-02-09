const mongoose = require("mongoose");

const calendar = mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "_room" },
  content: { type: String },
  time: { type: Date },
  repeated: { type: String }, //["date","month","year","null"]
  expiredDate: { type: Date },
});
