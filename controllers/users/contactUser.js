const mongoose = require("mongoose");

const { contactModel } = require("../../models/contact");
const { userModel } = require("../../models/user");

exports.contactUser = async (req, res) => {
  console.log("contactUser.js :");

  //model exist
  const userModelExist = await userModel.find({});
  if (userModelExist.length === [])
    return res.status(200).json({ error: "ko có userModel" });

  //check input
  if (!req.body) return res.status(200).json({ error: "KO ĐỦ THÔNG TIN" });
  const { userId, offerId } = req.body;
  console.log("     [input]");

  //check db
  const userFind = await userModel.findOne({
    _id: userId,
  });
  const offerFind = await userModel.findOne({
    _id: offerId,
  });
  if (!userFind || !offerFind) return res.status(200).json({ error: "hiếm" });
  // console.log("offerFind:", offerFind);

  //main
  const contactFind = await contactModel.findOne({
    $or: [
      { contactId: userFind._id, receiverId: offerFind._id },
      { contactId: offerFind._id, receiverId: userFind._id },
    ],
  });
  if (contactFind)
    return res.status(200).json({ error: "da ton tai record nay" });

  const contactSave = new contactModel({
    contactId: userId,
    receiverId: offerId,
    lastMessageId: mongoose.Schema.Types.ObjectId(""),
  });
  await contactSave.save();

  //res

  res.status(200).json({
    message: "thành công",
  });
  console.log("     [res]");
};
