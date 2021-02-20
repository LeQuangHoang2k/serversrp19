const { calendarModel } = require("../../models/calendar");

exports.editCalendar = async (io, socket, data) => {
  console.log("editCalendar.js");
  //input
  console.log(data);
  const { currentContact, content, datetime, repeat, term, id } = data;
  //   return

  //db
  const calendarEdit = await calendarModel.findOneAndUpdate(
    { _id: id },
    { $set: { content, datetime, repeat, term } },
    { useFindAndModify: false }
  );

  //main
  const calendarFetch = await calendarModel.find({
    roomId: currentContact.id,
  });

  //res
  io.in(currentContact.id).emit("fetch-calendar-success", { calendarFetch });
};
