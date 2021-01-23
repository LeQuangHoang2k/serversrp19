const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
require("./data/connect");
const { userModel } = require("./models/user");
const { messageModel } = require("./models/message");
const { contactModel } = require("./models/contact");
const { roomModel } = require("./models/room");

dotenv.config();
const app = require("./app.js");
const { connectUser } = require("./controllers/sockets/connectUser");
const { sendMessage } = require("./controllers/sockets/sendMessage");
// const { contactUser } = require("./controllers/users/contactUser");
const { listContact } = require("./controllers/sockets/listContact");
const { createRoom } = require("./controllers/sockets/createRoom");
const server = http.createServer(app);
const io = socketio(server);

server.listen(process.env.PORT || 4000, () =>
  console.log("http://localhost:4000/")
);

// io.use(async (socket, next) => {
//   console.log("hello word from middleware of socketio");

//   const { user } = socket.handshake.query;
//   console.log(user);

//   // const userFind = await userModel.findOne({ _id: user.id });
//   // if (!userFind) return socket.disconnect(true);

//   // socket.idMongo = userFind.id;
//   // socket.nameMongo = userFind.name;

//   // socket.join(userFind.id);
//   next();
// });

io.on("connection", async (socket) => {
  console.log("hello world from socketio", socket.id);

  socket.on("join-my-id", (data) => socket.join(data.userId));

  socket.on("list-contact", (data) => listContact(socket, data));

  socket.on("connect-user", (data) => connectUser(socket, data));

  socket.on("send-message", (data) => sendMessage(io, socket, data));

  socket.on("create-room", (data) => createRoom(socket, data));
  // socket.on("create-room", async (listInvited) => {
  //   //input
  //   if (!listInvited) return;
  //   console.log(listInvited);

  //   //db
  //   console.log(socket.idMongo, socket.nameMongo);
  //   const { idMongo, nameMongo } = socket;
  //   let nameRoom = nameMongo;
  //   let listMemberId = [idMongo];
  //   listInvited.forEach((item) => {
  //     nameRoom += `,${item.label}`;
  //     listMemberId.push(item.value);
  //   });

  //   //check room
  //   //check length + check memberId in array

  //   //create room
  //   console.log("nameRoom : ", nameRoom);
  //   console.log("array id room : ", listMemberId);
  //   const roomSave = new roomModel({
  //     name: nameRoom,
  //     memberIds: listMemberId,
  //   });

  //   await roomSave.save();

  //   //main

  //   //tao model contact room hay fetch thang vo room
  //   // listMemberId.forEach(async (item) => {
  //   //   let contactSave = new contactModel({
  //   //     contactId: item.value,
  //   //     receiverId: roomSave._id,
  //   //     lastMessageId: mongoose.Schema.Types.ObjectId(""),
  //   //   });

  //   //   await contactSave.save();
  //   // });

  //   //res
  //   listMemberId.forEach((item) => {
  //     // console.log(item.value);
  //     io.to(item.value).emit("success-invited");
  //   });
  // });
});
