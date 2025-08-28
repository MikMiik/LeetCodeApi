const express = require("express");
const router = express.Router();
const { getAllTags } = require("../controllers/api/tag.controller");

router.get("/", getAllTags);

module.exports = router;
