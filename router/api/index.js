const express = require("express");
const router = express.Router();
const postApi = require("../../controller/api/postApi");
router.get("/", postApi.index);
module.exports = router;
