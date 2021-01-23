const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../../models/user");

exports.loginGoogle = (req, res) => {
  console.log("loginGoogle.js :");

  //check input
  if (!req.body) return res.status(200).json({ error: "THIẾU THÔNG TIN" });
  console.log("     pass input");
  const { googleId, tokenId } = req.body;

  //check db

  const client = new OAuth2Client(
    "496509540327-sdht0p2mir6mjjshd0ih9ks54h2k9bq9.apps.googleusercontent.com"
  );
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "496509540327-sdht0p2mir6mjjshd0ih9ks54h2k9bq9.apps.googleusercontent.com",
    })
    .then(async (resGG) => {
      const { email, email_verified } = resGG.payload;

      if (!email_verified)
        return res.status(200).json({ error: "CHƯA XÁC THỰC GOOGLE" });
      console.log("     pass verified");

      const userFind = await userModel.findOne({ email });
      if (!userFind) {
        const fakePassword = googleId + process.env.RANDOM;
        const hash = bcrypt.hashSync(fakePassword, 10);

        await userModel.create({
          name: email,
          phone: "",
          email,
          password: hash,
          idFB: "",
          idGG: googleId,
          isRegister: false,
        });

        console.log("     pass [REGISTER]");
      } else {
        await userModel.findOneAndUpdate(
          { email, idGG: "" },
          { $set: { idGG: googleId } },
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
      console.log("id : " + userFetch.id);
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
