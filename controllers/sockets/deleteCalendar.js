const { calendarModel } = require("../../models/calendar");

exports.deleteCalendar = async (io, socket, data) => {
  console.log("deleteCalendar.js");

  //input
  console.log(data);
  const { currentContact, id } = data;

  //db
  const calendarDelete = await calendarModel.findOneAndDelete({ _id: id });

  //main
  const calendarFetch = await calendarModel.find({
    roomId: currentContact.id,
  });
  console.log("calendarFetch", calendarFetch);

  //res
  io.in(currentContact.id).emit("fetch-calendar-success", { calendarFetch });
};
