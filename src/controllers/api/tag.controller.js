const tagService = require("@/services/tag.service");

const getAllTags = async (req, res, next) => {
  const data = await tagService.getAllTags();
  res.success(200, data);
};

module.exports = {
  getAllTags,
};
