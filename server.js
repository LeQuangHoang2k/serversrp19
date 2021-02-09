const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const dotenv = require("dotenv");
require("./data/connect");

dotenv.config();
const app = require("./app.js");
const { connectUser } = require("./controllers/sockets/connectUser");
const { sendMessage } = require("./controllers/sockets/sendMessage");
const { listContact } = require("./controllers/sockets/listContact");
const { createRoom } = require("./controllers/sockets/createRoom");
const { reminder } = require("./controllers/sockets/reminder");
const server = http.createServer(app);
const io = socketio(server);

server.listen(process.env.PORT || 4000, () =>
  console.log("http://localhost:4000/")
);

io.on("connection", async (socket) => {
  console.log("hello world from socketio", socket.id);

  // socket.on("join-my-id", (data) => socket.join(data.userId));

  socket.on("list-contact", (data) => listContact(socket, data));

  socket.on("connect-user", (data) => connectUser(socket, data));

  socket.on("send-message", (data) => sendMessage(io, socket, data));

  socket.on("create-room", (data) => createRoom(socket, data));

  socket.on("reminder", (data) => reminder(io, socket, data));
});
