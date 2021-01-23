const { contactModel } = require("../../models/contact");
const { roomModel } = require("../../models/room");
const { userModel } = require("../../models/user");

exports.listContact = async (req, res) => {
  console.log("listContact.js :");

  //check model exist
  // const contactModelExist = await contactModel.find({});
  // if (contactModelExist.length < 1)
  //   return res.status(200).json({ error: "lỗi contactModel exist" });
  const roomModelExist = await roomModel.find({});
  if (roomModelExist.length ===0)
    return res.status(200).json({ error: "lỗi contactModel exist" });

  //req.body
  if (!req.body) return res.status(200).json({ error: "lỗi thông tin" });
  const { userId } = req.body;
  console.log("     [inputListContact]", req.body);

  //db
  const userFind = await userModel.findOne({ _id: userId });
  console.log("     [dbListContact]");

  //main
  //contact is user
  // const contactFind = await contactModel
  //   .find({
  //     $or: [{ contactId: userFind._id }, { receiverId: userFind._id }],
  //   })
  //   .populate("contactId receiverId", "name")
  //   .populate({
  //     path: "lastMessageId",
  //     populate: {
  //       path: "senderId",
  //       select: "name -_id",
  //     },
  //   });
  const roomFind=await roomModel.find({
    memberIds:{$size:3}
  })

  console.log(roomFind);
  // console.log(contactFind.lastMessageId);
  // contactFind.forEach((x) => console.log(x.receiverId.name));

  //contact is room

  console.log("     [mainListContact]");

  //res
  res.status(200).json({
    message: "thành công",
    // listContact: contactFind,
    listContact: [],
  });
  console.log("     [resListContact]");
};
