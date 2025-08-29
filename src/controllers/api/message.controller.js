const messageService = require("@/services/message.service");
const throw404 = require("@/utils/throw404");

exports.getMessages = async (req, res) => {
  const data = await messageService.getMessages();
  if (!data) throw404();
  res.success(200, data);
};

exports.send = async (req, res) => {
  try {
    const { content, userId } = req.body;
    const message = await messageService.create({ content, userId });

    res.success(200, message);
  } catch (error) {
    console.error("Pusher trigger error:", error);
    res.error(500, error.message || "Internal Server Error");
  }
};
