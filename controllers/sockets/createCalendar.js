const { calendarModel } = require("../../models/calendar.js");

exports.createCalendar = async (io, socket, data) => {
  console.log("createCalendar.js:", data);

  //input
  if (!data) return;
  const { user, currentContact, content, datetime, repeat, term } = data;
  console.log(data);

  //data
  const calendarCreate = await calendarModel.create({
    roomId: currentContact.id,
    content,
    datetime,
    repeat,
    term,
  });
  console.log(calendarCreate.datetime);

  //main
  const calendarFetch = await calendarModel.find({
    roomId: currentContact.id,
  });

  //res
  io.in(currentContact.id).emit("fetch-calendar-success", { calendarFetch });
};
