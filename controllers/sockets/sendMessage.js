const mongoose = require("mongoose");
const { messageModel } = require("../../models/message");
const { roomModel } = require("../../models/room");
const { userModel } = require("../../models/user");

exports.sendMessage = async (io, socket, data) => {
  console.log("sendMessage.js : ");

  //check input
  if (!data) return socket.emit({ error: "khong co du lieu tren server" });
  const { message, myInfo, myContact } = data;
  // console.log("socket log : ");
  // console.log(message);
  // console.log(myInfo);
  console.log(myContact);

  //check db
  console.log("input");
  const userFind = await userModel.findOne({ email: myInfo.email });
  if (!userFind) return console.log("ăn loz");

  //main
  //save mess
  console.log("main");

  const messageSave = new messageModel({
    senderId: userFind.id,
    roomId: myContact.id,
    message,
    isNewMessage: true,
  });
  await messageSave.save();
  console.log("mess save");

  // save lastMessageId in _room
  const roomUpdate = await roomModel.findOneAndUpdate(
    {
      _id: myContact.id,
    },
    { $set: { lastMessageId: messageSave._id } },
    { useFindAndModify: false }
  );
  if (roomUpdate) console.log("room save");
  // const roomFind = await roomModel.findOne({ _id: myContact.id });
  // console.log("roomFind", roomFind);
  //res
  console.log("res");
  io.in(myContact.id).emit("response-message", { lastMessage: messageSave });
};
