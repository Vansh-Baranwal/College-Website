const aiService = require('../services/ai.service');
const supabaseService = require('../services/supabase.service');

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

    const lowerMsg = message.toLowerCase();
    let contextData = null;

    // Simple Intent Detection
    if (lowerMsg.includes('event')) {
      contextData = await supabaseService.getEvents();
    } else if (lowerMsg.includes('announcement')) {
      contextData = await supabaseService.getAnnouncements();
    } else if (lowerMsg.includes('course')) {
      contextData = await supabaseService.getCourses();
    } else if (lowerMsg.includes('faculty')) {
      contextData = await supabaseService.getFaculty();
    }

    // Call AI Service with or without context
    const reply = await aiService.generateResponse(message, contextData);

    return res.status(200).json({ reply });
  } catch (error) {
    console.error(`[Chat Controller Error] ${error.message}\nStack: ${error.stack}`);
    return res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
};

module.exports = {
  handleChat
};
