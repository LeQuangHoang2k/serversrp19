const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { userModel } = require("../../models/user");

exports.loginFacebook = (req, res) => {
  console.log("loginFacebook.js : ");

  //check req.body

  if (!req.body) return res.status(200).json({ error: "KHÔNG ĐỦ THÔNG TIN" });
  const { userID, accessToken } = req.body;
  console.log("     pass input");

  //check db

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  fetch(url, { method: "GET" })
    .then((resFB) => resFB.json())
    .then(async (resFB) => {
      //
      const { id, name, email } = resFB;
      const userFind = await userModel.findOne({ email });
      if (!userFind) {
        const fakePassword = userID + process.env.RANDOM;
        const hash = bcrypt.hashSync(fakePassword, 10);

        const userSave = new userModel({
          name: email,
          phone: "",
          email,
          password: hash,
          idFB: userID,
          idGG: "",
          isRegister: false,
        });
        await userSave.save();

        console.log("     pass [REGISTER]");
      } else {
        await userModel.findOneAndUpdate(
          { email, idFB: "" },
          { $set: { idFB: userID } },
          { useFindAndModify: false }
        );

        console.log("     pass [UPDATE]");
      }

      //main

      const userFetch = await userModel.findOne({ email });
      const token = jwt.sign({ id: userFetch.id }, process.env.KEY, {
        expiresIn: "7d",
      });
      console.log("     pass main");

      //res

      res.status(200).json({
        token,
        user: {
          id: userFetch.id,
          email: userFetch.email,
          name: userFetch.name,
        },
      });
      console.log("     pass all");
    });
};
