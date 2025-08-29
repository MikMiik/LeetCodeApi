const axios = require("axios");

class Judge0Service {
  constructor() {
    this.baseURL = process.env.JUDGE0_API_URL || "http://103.20.96.168:2358";
    this.apiKey = process.env.JUDGE0_API_KEY;

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
        ...(this.apiKey && { "X-RapidAPI-Key": this.apiKey }),
      },
    });
  }

  /**
   * Submit code for execution
   * @param {Object} submissionData - The submission data
   * @param {string} submissionData.source_code - The source code to execute
   * @param {number} submissionData.language_id - The language ID
   * @param {string} submissionData.stdin - Standard input (optional)
   * @param {string} submissionData.expected_output - Expected output for testing (optional)
   * @returns {Promise<Object>} The submission response with token
   */
  async submitCode(submissionData) {
    try {
      const response = await this.client.post("/submissions", {
        source_code: submissionData.source_code,
        language_id: submissionData.language_id,
        stdin: submissionData.stdin || "",
        expected_output: submissionData.expected_output || null,
        cpu_time_limit: submissionData.cpu_time_limit || 2,
        memory_limit: submissionData.memory_limit || 128000,
        wall_time_limit: submissionData.wall_time_limit || 5,
        compiler_options: submissionData.compiler_options || null,
        command_line_arguments: submissionData.command_line_arguments || null,
        redirect_stderr_to_stdout:
          submissionData.redirect_stderr_to_stdout || false,
      });

      return {
        success: true,
        token: response.data.token,
      };
    } catch (error) {
      console.error(
        "Judge0 submission error:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to submit code: ${error.response?.data?.error || error.message}`
      );
    }
  }

  /**
   * Get submission result by token
   * @param {string} token - The submission token
   * @param {boolean} includeStderr - Include stderr in response
   * @param {boolean} includeCompileOutput - Include compile output in response
   * @returns {Promise<Object>} The submission result
   */
  async getSubmissionResult(
    token,
    includeStderr = true,
    includeCompileOutput = true
  ) {
    try {
      const params = new URLSearchParams({
        base64_encoded: "false",
        fields: "*",
      });

      if (includeStderr) params.append("stderr", "true");
      if (includeCompileOutput) params.append("compile_output", "true");

      const response = await this.client.get(`/submissions/${token}?${params}`);

      // Normalize stdout and expected_output for robust comparison
      const data = { ...response.data };
      const normalize = (str) =>
        typeof str === "string"
          ? str.replace(/'/g, '"').replace(/\s+/g, "")
          : str;
      if (typeof data.stdout === "string") data.stdout = normalize(data.stdout);
      if (typeof data.expected_output === "string")
        data.expected_output = normalize(data.expected_output);
      if (typeof data.compile_output === "string")
        data.compile_output = data.compile_output.replace(/'/g, '"');
      if (typeof data.stderr === "string")
        data.stderr = data.stderr.replace(/'/g, '"');
      // Compare and add passed field
      let passed = false;
      if (
        typeof data.stdout === "string" &&
        typeof data.expected_output === "string" &&
        data.stdout.length > 0 &&
        data.expected_output.length > 0
      ) {
        passed = data.stdout === data.expected_output;
      }
      data.passed = passed;
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(
        "Judge0 get result error:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to get submission result: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  }

  /**
   * Get all supported languages
   * @returns {Promise<Object>} List of supported languages
   */
  async getLanguages() {
    try {
      const response = await this.client.get("/languages");

      return response.data;
    } catch (error) {
      console.error(
        "Judge0 get languages error:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to get languages: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  }

  /**
   * Batch submit multiple submissions
   * @param {Array} submissions - Array of submission objects
   * @returns {Promise<Object>} Batch submission response
   */
  async batchSubmit(submissions) {
    try {
      const response = await this.client.post("/submissions/batch", {
        submissions: submissions.map((sub) => ({
          source_code: sub.source_code,
          language_id: sub.language_id,
          stdin: sub.stdin || "",
          expected_output: sub.expected_output || null,
          cpu_time_limit: sub.cpu_time_limit || 2,
          memory_limit: sub.memory_limit || 128000,
          wall_time_limit: sub.wall_time_limit || 5,
        })),
      });

      return {
        success: true,
        tokens: response.data.map((item) => item.token),
      };
    } catch (error) {
      console.error(
        "Judge0 batch submission error:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to batch submit: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  }

  /**
   * Get batch submission results
   * @param {Array} tokens - Array of submission tokens
   * @returns {Promise<Object>} Batch results
   */
  async getBatchResults(tokens) {
    try {
      const tokensQuery = tokens.join(",");
      const response = await this.client.get(
        `/submissions/batch?tokens=${tokensQuery}&base64_encoded=false&fields=*`
      );

      // Normalize stdout and expected_output for robust comparison in each submission
      const normalize = (str) =>
        typeof str === "string"
          ? str.replace(/'/g, '"').replace(/\s+/g, "")
          : str;
      const submissions = response.data.submissions.map((item) => {
        const data = { ...item };
        if (typeof data.stdout === "string")
          data.stdout = normalize(data.stdout);
        if (typeof data.expected_output === "string")
          data.expected_output = normalize(data.expected_output);
        if (typeof data.compile_output === "string")
          data.compile_output = data.compile_output.replace(/'/g, '"');
        if (typeof data.stderr === "string")
          data.stderr = data.stderr.replace(/'/g, '"');
        // Compare and add passed field
        let passed = false;
        if (
          typeof data.stdout === "string" &&
          typeof data.expected_output === "string" &&
          data.stdout.length > 0 &&
          data.expected_output.length > 0
        ) {
          passed = data.stdout === data.expected_output;
        }
        data.passed = passed;
        return data;
      });
      return {
        success: true,
        data: submissions,
      };
    } catch (error) {
      console.error(
        "Judge0 batch results error:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to get batch results: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  }

  /**
   * Check Judge0 system status
   * @returns {Promise<Object>} System status
   */
  async getSystemInfo() {
    try {
      const response = await this.client.get("/system_info");

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        "Judge0 system info error:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to get system info: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  }
}

module.exports = new Judge0Service();
