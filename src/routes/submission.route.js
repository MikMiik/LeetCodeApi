const express = require("express");
const router = express.Router();
const {
  submitCode,
  getSubmissionResult,
  getSubmissionByToken,
  submitBatch,
  getAllSubmissions,
  deleteSubmission,
} = require("../controllers/api/submission.controller");

router.post("/", submitCode);

router.post("/batch", submitBatch);

router.get("/", getAllSubmissions);

router.get("/:id", getSubmissionResult);

router.get("/token/:token", getSubmissionByToken);

router.delete("/:id", deleteSubmission);

module.exports = router;
