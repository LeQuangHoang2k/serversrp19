const mongoose = require("mongoose");
const { roomModel } = require("../../models/room");

exports.connectUser = async (socket, data) => {
  console.log("connect-user :");

  //input
  if (!data) return;
  console.log(data);
  const { userId, offerId } = data;

  //create array id user
  let memberIds = [];
  for (const key in data) {
    memberIds.push(data[key]);
  }
  memberIds = memberIds.sort();

  //db
  const roomExist = await roomModel.findOne({
    $and: [{ memberIds: { $size: 2 } }, { memberIds }],
    // memberIds,
  });

  // main(save room)
  if (roomExist) return console.log("room nay da ton tai");
  const roomSave = roomModel.create({
    // name: "",
    memberIds,
    // lastMessageId: mongoose.Schema.Types.ObjectId(""),
  });

  //join room
  // socket.join(roomSave.id);

  //res
  socket.emit("connect-user-success", { message: "tao room thanh cong" });
};
