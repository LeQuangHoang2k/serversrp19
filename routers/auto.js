const express = require("express");
const router = express.Router();

const { listContact } = require("../controllers/auto/listContact");
const { listMessage } = require("../controllers/auto/listMessage");


router.post("/list-contact", listContact);
router.post("/list-message", listMessage);

module.exports = router;
