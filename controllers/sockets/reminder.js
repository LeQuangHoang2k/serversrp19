exports.reminder = (io, socket, data) => {
  console.log("reminder.js:", data);
  //input
  if (!data) return;
  const { user, currentContact } = data;

  //data

  //main

  //res
  // console.log("data",data);
  // console.log(socket.adapter.rooms, typeof currentContact.id);
  io.in(currentContact.id).emit("reminder-success");
  // io.sockets.emit("alo");
};
