const mongoose = require("mongoose");
const validator = require("validator");

const user = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String, default: "" },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        return validator.isEmail(value);
      },
    },
    password: { type: String },
    idFB: { type: String, default: "" },
    idGG: { type: String, default: "" },
    isRegister: { type: Boolean },
  },
  { timestamps: true }
);

exports.userModel = mongoose.model("_user", user);
