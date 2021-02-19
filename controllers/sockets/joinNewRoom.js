const { roomModel } = require("../../models/room");

exports.joinNewRoom = async (io, socket, data) => {
  console.log("joinNewRoom.js : ", data);
  
  //input
  const { roomId } = data;
  
  //db
  
  //main
  socket.join(roomId);

  //res
  io.in(`${roomId}`).emit("add-room-success", { roomId });
};
