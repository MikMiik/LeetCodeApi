const pusher = require("@/configs/pusher");
const { Message, User } = require("@/models");

class MessageService {
  async getMessages() {
    const result = await Message.findAll({
      include: {
        model: User,
        attributes: ["id", "name"],
        as: "user",
      },
    });
    return result;
  }
  async create({ userId, content }) {
    const result = await Message.create({
      userId,
      content,
    });

    await pusher.trigger(`forum-leetcode`, "new-message", result);

    return result;
  }
}

module.exports = new MessageService();
