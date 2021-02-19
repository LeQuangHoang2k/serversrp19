const { roomModel } = require("../../models/room");

exports.createRoom = async (socket, data) => {
  console.log("create-room.js : ");

  //input
  console.log(data);
  const { user, member } = data;
  let memberIds = [user.id];
  let nameOfRoom = user.name;

  member.forEach(async (item) => {
    await memberIds.push(item.value);
    nameOfRoom = nameOfRoom + "," + item.label;
  });

  memberIds = await memberIds.sort();
  console.log(memberIds);
  console.log("nameOfRoom", nameOfRoom);

  //db
  const roomExist = await roomModel.findOne({
    memberIds,
  });
  if (roomExist) return console.log("roomExist", roomExist);

  //main
  const roomSave = await roomModel.create({
    name: nameOfRoom,
    memberIds,
  });

  //res
  // socket.emit("update-room");
  // socket.to(`${offerId}`).emit("update-room");
  memberIds.forEach((item) => {
    socket.to(`${item}`).emit("update-room");
  });
};
