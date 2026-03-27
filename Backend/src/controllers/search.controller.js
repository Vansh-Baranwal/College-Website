const supabaseService = require('../services/supabase.service');

/**
 * Handle global search requests.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const search = async (req, res) => {
  try {
    const { q } = req.query;

    // Validate query parameter
    if (!q || typeof q !== 'string' || q.trim() === '') {
      return res.status(400).json({ error: 'Search query parameter "q" is required and cannot be empty.' });
    }

    // Call supabase service
    const results = await supabaseService.searchAll(q.trim());

    // Return the clean, ordered JSON payload directly
    return res.status(200).json(results);
  } catch (error) {
    console.error(`[Search Controller Error] ${error.message}\nStack: ${error.stack}`);
    return res.status(500).json({ error: 'An unexpected error occurred while searching.' });
  }
};

module.exports = {
  search
};
