const { roomModel } = require("../../models/room");

exports.fetchRoom = async (socket, data) => {
  console.log("fetchRoom.js : ", data);

  //input
  console.log("data", data);

  //db
  const roomFind = await roomModel
    .find({ memberIds: { $in: [data.userId] } })
    .populate("memberIds")
    .populate({ path: "lastMessageId", populate: "senderId" });

  // console.log("roomFind",roomFind);

  //main
  roomFind.forEach(async (item) => {
    // console.log(item.memberIds);
    // item.memberIds.forEach((subItem)=>{
    //   console.log(subItem.name);
    // })

    await socket.join(item.id);
  });
  // console.log(socket.adapter.rooms);
  // console.log(socket.id);

  //res
  socket.emit("fetch-room-success", {
    message: "fetch thanh cong",
    room: roomFind,
  });
};
