const express = require("express");
const router = express.Router();
const {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemStats,
} = require("../controllers/api/problem.controller");

router.get("/stats", getProblemStats);

router.get("/", getAllProblems);

router.post("/", createProblem);

router.get("/:id", getProblemById);

router.put("/:id", updateProblem);

router.delete("/:id", deleteProblem);

module.exports = router;
