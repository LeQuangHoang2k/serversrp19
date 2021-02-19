const { roomModel } = require("../../models/room");

exports.addRoom = async (io, socket, data) => {
  console.log("addRoom.js : ");

  //input
  console.log(data);
  const { user, offerId } = data;
  let memberIds = [user.id, offerId].sort();
  console.log(memberIds);

  //db
  const roomExist = await roomModel.findOne({
    memberIds,
  });
  if (roomExist) return console.log("roomExist", roomExist);

  //main
  const roomCreate = await roomModel.create({
    name: "",
    memberIds,
  });

  //res
  socket.emit("update-room");
  socket.to(`${offerId}`).emit("update-room");
  // io.in(roomCreate.id).emit("add-room-success", { roomId: roomCreate.id });
};
