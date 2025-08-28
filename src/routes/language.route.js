const express = require("express");
const router = express.Router();
const {
  getLanguages,
  getSystemInfo,
  getLanguageById,
} = require("../controllers/api/language.controller");

router.get("/", getLanguages);

router.get("/system-info", getSystemInfo);

router.get("/:id", getLanguageById);

module.exports = router;
