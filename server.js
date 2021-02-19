const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const dotenv = require("dotenv");
require("./data/connect");

dotenv.config();
const app = require("./app.js");
const { connectUser } = require("./controllers/sockets/connectUser");
const { sendMessage } = require("./controllers/sockets/sendMessage");
const { fetchRoom } = require("./controllers/sockets/fetchRoom");
const { createRoom } = require("./controllers/sockets/createRoom");
const { addRoom } = require("./controllers/sockets/addRoom");
const { createCalendar } = require("./controllers/sockets/createCalendar");
const { joinNewRoom } = require("./controllers/sockets/joinNewRoom");
const server = http.createServer(app);
const io = socketio(server);

server.listen(process.env.PORT || 4000, () =>
  console.log("http://localhost:4000/")
);

io.on("connection", async (socket) => {
  console.log("hello world from socketio", socket.id);
  // socket.join(userId);
  socket.on("join-my-id", (data) => socket.join(data.userId));

  // socket.on("join-new-room", (data) => joinNewRoom(io, socket, data));

  socket.on("add-room", (data) => addRoom(io, socket, data));

  socket.on("fetch-room", (data) => fetchRoom(socket, data));

  socket.on("connect-user", (data) => connectUser(socket, data));

  socket.on("send-message", (data) => sendMessage(io, socket, data));

  socket.on("create-room", (data) => createRoom(socket, data));

  socket.on("create-calendar", (data) => createCalendar(io, socket, data));
});
