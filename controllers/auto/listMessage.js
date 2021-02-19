const { messageModel } = require("../../models/message");
const { userModel } = require("../../models/user");

exports.listMessage = async (req, res) => {
  console.log("listMessage.js :");

  //check model exist
  const messageModelExist = await messageModel.find({});
  if (messageModelExist.length < 1)
    return res.status(200).json({ error: "chưa có messageModel" });

  //check input
  if (req.body.myInfo.id === "default" || req.body.myContact.id === "default")
    return res.status(200).json({ error: "ko du thong tin" });
  const { myInfo, myContact } = req.body;
  console.log("     [inputListMessage]");

  //check db
  console.log("     [dbListMessage]");

  //main
  const listMessage = await messageModel
    .find({
      roomId: myContact.id,
    })
    .populate("senderId");
  console.log("listMessage", listMessage);

  // const lastMessage = listMessage[listMessage.length - 1];
  // const { senderId, message } = lastMessage;
  // const senderFind = await userModel.findOne({ _id: senderId });

  console.log("     [mainListMessage]");

  //res
  res.status(200).json({
    message: "server fetch ok",
    listMessage: listMessage || [],
  });
  console.log("     [resListMessage]");
};
