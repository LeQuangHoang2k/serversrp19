const express = require("express");
const { register } = require("../controllers/accounts/register");
const { login } = require("../controllers/accounts/login");
const { loginFacebook } = require("../controllers/accounts/loginFacebook");
const { loginGoogle } = require("../controllers/accounts/loginGoogle");
const { loginTwitter } = require("../controllers/accounts/loginTwitter");

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/login-facebook", loginFacebook);
route.post("/login-google", loginGoogle);
route.post("/login-twitter", loginTwitter);

module.exports = route;
