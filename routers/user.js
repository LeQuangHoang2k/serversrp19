const express = require("express");
const router = express.Router();

const { searchUser } = require("../controllers/users/searchUser");
const { contactUser } = require("../controllers/users/contactUser");

router.post("/search-user", searchUser);
router.post("/contact-user", contactUser);

module.exports = router;
