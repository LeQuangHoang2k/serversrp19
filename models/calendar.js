const mongoose = require("mongoose");

const calendar = mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "_room" },
  content: { type: String },
  datetime: { type: String },
  repeat: { type: String }, //["date","month","year","null"]
  term: { type: String },
});

exports.calendarModel = mongoose.model("_calendar", calendar);
