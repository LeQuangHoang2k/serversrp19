const { calendarModel } = require("../../models/calendar.js");

exports.createCalendar = async (io, socket, data) => {
  console.log("reminder.js:", data);
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

  //res
  io.in(currentContact.id).emit("create-calendar-success");
};
