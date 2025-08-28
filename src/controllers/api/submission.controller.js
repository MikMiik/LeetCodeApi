const judge0Service = require("@/services/judge0.service");
const { v4: uuidv4 } = require("uuid");

// In-memory storage for submissions (in production, use a database)
const submissions = new Map();

/**
 * Submit code for execution
 */
const submitCode = async (req, res, next) => {
  try {
    const submissionData = {
      source_code: req.body.source_code,
      language_id: req.body.language_id,
      stdin: req.body.stdin,
      expected_output: req.body.expected_output,
      cpu_time_limit: req.body.cpu_time_limit,
      memory_limit: req.body.memory_limit,
      wall_time_limit: req.body.wall_time_limit,
      compiler_options: req.body.compiler_options,
      command_line_arguments: req.body.command_line_arguments,
      redirect_stderr_to_stdout: req.body.redirect_stderr_to_stdout,
    };

    // Submit to Judge0
    const result = await judge0Service.submitCode(submissionData);

    // Generate our own submission ID for tracking
    const submissionId = uuidv4();

    // Store submission info
    submissions.set(submissionId, {
      id: submissionId,
      judge0_token: result.token,
      submitted_at: new Date(),
      status: "submitted",
      language_id: submissionData.language_id,
      source_code: submissionData.source_code,
    });

    res.success(200, {
      submission_id: submissionId,
      judge0_token: result.token,
      status: "submitted",
      message: "Code submitted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get submission result by ID
 */
const getSubmissionResult = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if submission exists in our records
    const submission = submissions.get(id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Submission not found",
          status: 404,
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Get result from Judge0
    const result = await judge0Service.getSubmissionResult(
      submission.judge0_token
    );

    // Update submission status
    submission.status = result.data.status?.description || "unknown";
    submission.result = result.data;
    submission.completed_at = new Date();

    submissions.set(id, submission);

    res.json({
      success: true,
      data: {
        submission_id: id,
        status: submission.status,
        result: result.data,
        submitted_at: submission.submitted_at,
        completed_at: submission.completed_at,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get submission result by Judge0 token
 */
const getSubmissionByToken = async (req, res, next) => {
  try {
    const { token } = req.params;

    // Get result from Judge0
    const result = await judge0Service.getSubmissionResult(token);

    res.json({
      success: true,
      data: {
        judge0_token: token,
        result: result.data,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Submit multiple codes for batch execution
 */
const submitBatch = async (req, res, next) => {
  try {
    const { submissions: submissionArray } = req.body;

    // Submit batch to Judge0
    const result = await judge0Service.batchSubmit(submissionArray);

    // Generate submission IDs for each submission
    const batchSubmissions = result.tokens.map((token, index) => {
      const submissionId = uuidv4();
      const submissionData = {
        id: submissionId,
        judge0_token: token,
        submitted_at: new Date(),
        status: "submitted",
        language_id: submissionArray[index].language_id,
        source_code: submissionArray[index].source_code,
      };

      submissions.set(submissionId, submissionData);

      return {
        submission_id: submissionId,
        judge0_token: token,
      };
    });

    res.status(201).json({
      success: true,
      data: {
        batch_id: uuidv4(),
        submissions: batchSubmissions,
        total: batchSubmissions.length,
        message: "Batch submitted successfully",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all submissions (paginated)
 */
const getAllSubmissions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const allSubmissions = Array.from(submissions.values());
    const total = allSubmissions.length;
    const paginatedSubmissions = allSubmissions
      .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
      .slice(offset, offset + limit);

    res.json({
      success: true,
      data: {
        submissions: paginatedSubmissions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a submission
 */
const deleteSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!submissions.has(id)) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Submission not found",
          status: 404,
        },
        timestamp: new Date().toISOString(),
      });
    }

    submissions.delete(id);

    res.json({
      success: true,
      message: "Submission deleted successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitCode,
  getSubmissionResult,
  getSubmissionByToken,
  submitBatch,
  getAllSubmissions,
  deleteSubmission,
};
