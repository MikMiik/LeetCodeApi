const express = require("express");
const router = express.Router();
const {
  getAllProblems,
  getProblemById,
} = require("../controllers/api/problem.controller");

router.get("/", getAllProblems);

router.get("/:id", getProblemById);

module.exports = router;
