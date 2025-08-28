const judge0Service = require("@/services/judge0.service");

/**
 * Get all supported programming languages from Judge0
 */
const getLanguages = async (req, res, next) => {
  const result = await judge0Service.getLanguages();
  res.success(200, result);
};

/**
 * Get Judge0 system information
 */
const getSystemInfo = async (req, res, next) => {
  try {
    const result = await judge0Service.getSystemInfo();

    res.json({
      success: true,
      data: result.data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Helper function to get popular programming languages
 */
const getPopularLanguages = (languages) => {
  const popularLanguageNames = [
    "Python (3.8.1)",
    "Java (OpenJDK 13.0.1)",
    "C++ (GCC 7.4.0)",
    "C (GCC 7.4.0)",
    "JavaScript (Node.js 12.14.0)",
    "C# (Mono 6.6.0.161)",
    "Go (1.13.5)",
    "Ruby (2.7.0)",
    "Rust (1.40.0)",
    "TypeScript (3.7.4)",
  ];

  return languages.filter((lang) =>
    popularLanguageNames.some((popularName) =>
      lang.name.includes(popularName.split(" ")[0])
    )
  );
};

/**
 * Get language by ID
 */
const getLanguageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await judge0Service.getLanguages();

    const language = result.data.find((lang) => lang.id === parseInt(id));

    if (!language) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Language not found",
          status: 404,
        },
        timestamp: new Date().toISOString(),
      });
    }

    res.json({
      success: true,
      data: {
        id: language.id,
        name: language.name,
        source_file: language.source_file,
        compile_cmd: language.compile_cmd,
        run_cmd: language.run_cmd,
        is_archived: language.is_archived,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLanguages,
  getSystemInfo,
  getLanguageById,
};
