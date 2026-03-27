const aiService = require('../services/ai.service');

/**
 * Handles incoming chat messages.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required and must be a non-empty string.' });
    }

    const reply = await aiService.generateResponse(message);

    return res.status(200).json({ reply });
  } catch (error) {
    console.error(`[Chat Controller Error] ${error.message}\nStack: ${error.stack}`);
    return res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
};

module.exports = {
  handleChat
};
