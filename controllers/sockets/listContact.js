const { roomModel } = require("../../models/room");

exports.listContact = async (socket, data) => {
  console.log("listContact.js : ", data);

  //input

  //db
  const roomFind = await roomModel
    .find({ memberIds: { $in: [data.userId] } })
    .populate("memberIds")
    .populate({ path: "lastMessageId", populate: "senderId" });

  // console.log(roomFind);

  //main
  roomFind.forEach((item) => {
    // console.log(item.memberIds);
    // item.memberIds.forEach((subItem)=>{
    //   console.log(subItem.name);
    // })

    socket.join(item.id);
  });

  //res
  socket.emit("list-contact-success", {
    message: "fetch thanh cong",
    room: roomFind,
  });
};
