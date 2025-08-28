const { Problem, Tag } = require("@/models");

class ProblemService {
  async getAllProblems() {
    const problems = await Problem.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return problems;
  }

  async getProblemById(id) {
    const problem = await Problem.findByPk(id);
    return problem;
  }

  async createProblem(data) {
    const problem = await Problem.create(data);
    return problem;
  }

  async updateProblem(id, data) {
    const problem = await Problem.update(data, { where: { id } });
    return problem;
  }

  async deleteProblem(id) {
    const result = await Problem.destroy({ where: { id } });
    return result;
  }
}

module.exports = new ProblemService();
