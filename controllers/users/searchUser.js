const { userModel } = require("../../models/user");

exports.searchUser = async (req, res) => {
  console.log("searchUser.js :");

  //check req.body
  if (!req.body)
    return res.status(200).json({ error: "LỖI : KO ĐỦ THÔNG TIN" });
  const { name } = req.body;
  console.log("     [input]");

  //check db
  const userFind = await userModel
    .find({
      name: { $regex: new RegExp(name, "i") },
    })
    .select("name email _id");
  if (userFind.length === 0)
    return res.status(200).json({ error: "KHÔNG CÓ KẾT QUẢ PHÙ HỢP" });
  console.log("     [db]");

  //main
  console.log("     [main]");
  console.log("userFind", userFind);

  //res
  res.status(200).json({
    message: "search thanh cong",
    user: userFind,
  });
  console.log("     [res]");
};
