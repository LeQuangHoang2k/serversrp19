const bcrypt = require("bcrypt");
const { userModel } = require("../../models/user");

exports.register = async (req, res) => {
  console.log("register.js : ");

  //check req.body
  if (!req.body)
    return res.status(200).json({ error: "register.js : NO INPUT" });
  console.log("     pass input");
  const { name, phone, email, password } = req.body;

  //check db
  const userFind = await userModel.findOne({ email });
  if (!userFind) {
    console.log("     pass db [NO USER]");

    const fakePassword = password + process.env.RANDOM;
    const hash = bcrypt.hashSync(fakePassword, 10);

    const userSave = new userModel({
      name,
      phone,
      email,
      password: hash,
      idGG: email,
      idFB: email,
      isRegister: true,
    });

    await userSave.save();

    return res.status(200).json({ message: "ĐĂNG KÍ THÀNH CÔNG" });
  }

  console.log("     pass db [USER EXIST]");
  if (userFind.isRegister)
    return res.status(200).json({ error: "register.js : USER EXIST" });

  const fakePassword = password + process.env.RANDOM;
  const hash = bcrypt.hashSync(fakePassword, 10);
  await userModel.findOneAndUpdate(
    {
      email,
    },
    {
      $set: {
        name,
        phone,
        password: hash,
        isRegister: true,
      },
    },
    { useFindAndModify: false }
  );

  //main

  //res
  console.log("     pass all");
  res.status(200).json({
    message: "ĐĂNG KÍ THÀNH CÔNG",
  });
};
