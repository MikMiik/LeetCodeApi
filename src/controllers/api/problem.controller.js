const { v4: uuidv4 } = require("uuid");

// In-memory storage for problems (in production, use a database)
const problems = new Map();

// Sample problems data
const initializeProblems = () => {
  const sampleProblems = [
    {
      id: uuidv4(),
      title: "Two Sum",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
      difficulty: "Easy",
      category: "Array",
      tags: ["Array", "Hash Table"],
      testCases: [
        {
          input: "nums = [2,7,11,15], target = 9",
          expectedOutput: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        {
          input: "nums = [3,2,4], target = 6",
          expectedOutput: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
        },
      ],
    },
    {
      id: uuidv4(),
      title: "Reverse Integer",
      description:
        "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
      difficulty: "Medium",
      category: "Math",
      tags: ["Math"],
      testCases: [
        {
          input: "x = 123",
          expectedOutput: "321",
          explanation: "The reverse of 123 is 321.",
        },
        {
          input: "x = -123",
          expectedOutput: "-321",
          explanation: "The reverse of -123 is -321.",
        },
      ],
    },
  ];

  sampleProblems.forEach((problem) => {
    problems.set(problem.id, problem);
  });
};

// Initialize sample problems
initializeProblems();

/**
 * Get all problems
 */
const getAllProblems = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const difficulty = req.query.difficulty;
    const category = req.query.category;
    const search = req.query.search;

    let allProblems = Array.from(problems.values());

    // Filter by difficulty
    if (difficulty) {
      allProblems = allProblems.filter(
        (p) => p.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    // Filter by category
    if (category) {
      allProblems = allProblems.filter((p) =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Search in title and description
    if (search) {
      allProblems = allProblems.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    const total = allProblems.length;
    const offset = (page - 1) * limit;
    const paginatedProblems = allProblems
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(offset, offset + limit);

    res.json({
      success: true,
      data: {
        problems: paginatedProblems,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        filters: {
          difficulty,
          category,
          search,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get problem by ID
 */
const getProblemById = async (req, res, next) => {
  const { id } = req.params;
  const problem = {
    id: uuidv4(),
    title: "Add Two Numbers",
    description:
      "Given two integers a and b, return their sum.\n\nYou only need to compute a + b and return the result as an integer.",
    difficulty: "Easy",
    category: "Math",
    tags: ["Math", "Basic"],
    testCases: [
      {
        input: "a = 1, b = 2",
        expected_output: "3",
        explanation: "1 + 2 = 3",
      },
      {
        input: "a = -5, b = 7",
        expected_output: "2",
        explanation: "-5 + 7 = 2",
      },
      {
        input: "a = 100, b = 200",
        expected_output: "300",
        explanation: "100 + 200 = 300",
      },
    ],
  };
  res.success(200, problem);
};

/**
 * Create a new problem
 */
const createProblem = async (req, res, next) => {
  try {
    const problemData = {
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty,
      category: req.body.category || "General",
      tags: req.body.tags || [],
      test_cases: req.body.test_cases,
      created_at: new Date(),
      updated_at: new Date(),
    };

    problems.set(problemData.id, problemData);

    res.status(201).json({
      success: true,
      data: problemData,
      message: "Problem created successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update problem by ID
 */
const updateProblem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const problem = problems.get(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Problem not found",
          status: 404,
        },
        timestamp: new Date().toISOString(),
      });
    }

    const updatedProblem = {
      ...problem,
      title: req.body.title || problem.title,
      description: req.body.description || problem.description,
      difficulty: req.body.difficulty || problem.difficulty,
      category: req.body.category || problem.category,
      tags: req.body.tags || problem.tags,
      test_cases: req.body.test_cases || problem.test_cases,
      updated_at: new Date(),
    };

    problems.set(id, updatedProblem);

    res.json({
      success: true,
      data: updatedProblem,
      message: "Problem updated successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete problem by ID
 */
const deleteProblem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!problems.has(id)) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Problem not found",
          status: 404,
        },
        timestamp: new Date().toISOString(),
      });
    }

    problems.delete(id);

    res.json({
      success: true,
      message: "Problem deleted successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get problem statistics
 */
const getProblemStats = async (req, res, next) => {
  try {
    const allProblems = Array.from(problems.values());

    const stats = {
      total: allProblems.length,
      by_difficulty: {
        Easy: allProblems.filter((p) => p.difficulty === "Easy").length,
        Medium: allProblems.filter((p) => p.difficulty === "Medium").length,
        Hard: allProblems.filter((p) => p.difficulty === "Hard").length,
      },
      by_category: allProblems.reduce((acc, problem) => {
        acc[problem.category] = (acc[problem.category] || 0) + 1;
        return acc;
      }, {}),
      all_tags: [...new Set(allProblems.flatMap((p) => p.tags))],
    };

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemStats,
};
