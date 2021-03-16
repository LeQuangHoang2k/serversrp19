const { roomModel } = require("../../models/room");
const { calendarModel } = require("../../models/calendar");

exports.fetchRoom = async (socket, data) => {
  console.log("fetchRoom.js : ", data);

  //input
  console.log("data", data);

  //db
  const roomFind = await roomModel
    .find({ memberIds: { $in: [data.userId] } })
    .populate("memberIds")
    .populate({ path: "lastMessageId", populate: "senderId" });

  //main
  let listRoomContactId = [];
  roomFind.forEach((item) => {
    listRoomContactId.push(item.id);
    socket.join(item.id);
  });

  const listCalendar = await calendarModel.find({
    roomId: { $in: listRoomContactId },
  });
  console.log("listCalendar", listCalendar);

  //res
  socket.emit("fetch-room-success", {
    message: "fetch thanh cong",
    room: roomFind,
    listCalendar
  });
};
