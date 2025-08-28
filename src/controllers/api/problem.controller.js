const problemService = require("@/services/problem.service");
const { v4: uuidv4 } = require("uuid");

const getAllProblems = async (req, res, next) => {
  const data = await problemService.getAllProblems();
  res.success(200, data);
};

const getProblemById = async (req, res, next) => {
  const { id } = req.params;
  const problem = await problemService.getProblemById(id);
  res.success(200, problem);
};

module.exports = {
  getAllProblems,
  getProblemById,
};
