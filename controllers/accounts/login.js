const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const userModel = require("../../models/user");
const { userModel } = require("../../models/user");

exports.login = async (req, res) => {
  console.log("login.js : ");

  //check req.body

  if (!req.body)
    return res.status(200).json({ error: "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN" });
  console.log("     pass input");
  const { email, password } = req.body;

  //check db

  const userFind = await userModel.findOne({ email });
  if (!userFind)
    return res.status(200).json({ error: "TÀI KHOẢN KHÔNG TỒN TẠI" });
  console.log("     pass exist");

  if (!userFind.isRegister)
    return res.status(200).json({ error: "TÀI KHOẢN CHƯA ĐĂNG KÍ" });
  console.log("     pass register");

  const fakePassword = password + process.env.RANDOM;
  const compare = await bcrypt.compare(fakePassword, userFind.password);
  if (!compare) return res.status(200).json({ error: "SAI MẬT KHẨU" });
  console.log("     pass compare");

  //main

  const token = jwt.sign({ id: userFind.id }, process.env.KEY, {
    expiresIn: "7d",
  });
  console.log("     pass main");

  //res

  res.status(200).json({
    token,
    user: {
      id: userFind.id,
      email: userFind.email,
      name: userFind.name,
    },
  });
  console.log("     pass all");
};
