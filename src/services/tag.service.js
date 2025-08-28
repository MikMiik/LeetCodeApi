const { Tag } = require("@/models");

class TagService {
  async getAllTags() {
    const tags = await Tag.findAll({
      attributes: ["id", "name"],
    });
    return tags;
  }
}

module.exports = new TagService();
