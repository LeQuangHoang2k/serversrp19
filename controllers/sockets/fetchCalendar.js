const { calendarModel } = require("../../models/calendar");

exports.fetchCalendar = async (io, socket, data) => {
  console.log("fetchCalendar.js");

  //input
  console.log("data", data);
  const { user, currentContact } = data;

  //db
  const calendarFetch = await calendarModel.find(
    {
      roomId: currentContact.id,
    },
    (err, res) => console.error(err)
  );
  console.log("calendarFetch", calendarFetch);

  //main

  //res
  socket.emit("fetch-calendar-success", { calendarFetch });
  //   io.in(`${currentContact.id}`).emit("fetch-calendar-success", {
  //     calendarFetch,
  //   });
};
