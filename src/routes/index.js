const express = require("express");
const router = express.Router();

// const productsRouter = require("./products.route");
const authRouter = require("./auth.route");
const problemRouter = require("./problem.route");
const tagRouter = require("./tag.route");
const languageRouter = require("./language.route");
const submissionRouter = require("./submission.route");
const messageRouter = require("./message.route");
// router.use("/products", productsRouter);
router.use("/auth", authRouter);
router.use("/problems", problemRouter);
router.use("/languages", languageRouter);
router.use("/submissions", submissionRouter);
router.use("/messages", messageRouter);
router.use("/tags", tagRouter);

module.exports = router;
