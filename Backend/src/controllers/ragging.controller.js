const emailService = require('../services/email.service');

/**
 * Endpoint to trigger an emergency ragging alert.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const triggerRaggingAlert = async (req, res) => {
  try {
    const { studentId } = req.body;

    // Trigger the email alert
    await emailService.sendRaggingAlert(studentId);

    return res.status(200).json({ message: 'Alert sent successfully' });
  } catch (error) {
    console.error(`[Ragging Controller Error] ${error.message}`);
    return res.status(500).json({ error: 'Failed to send emergency alert' });
  }
};

module.exports = {
  triggerRaggingAlert,
};
