const nodemailer = require('nodemailer');

// Configure Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an urgent ragging alert email.
 * @param {string} studentId - Optional student identifier.
 * @returns {Promise<Object>} The email sending result.
 */
const sendRaggingAlert = async (studentId = 'Anonymous') => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'URGENT: Ragging Alert Detected',
    text: `A ragging alert has been triggered from the student dashboard.
    
Timestamp: ${new Date().toISOString()}
Student Identifier: ${studentId}

This is an automated emergency notification.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[Email Service] Ragging alert email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('[Email Service] Error sending ragging alert email:', error.message);
    throw new Error('Failed to send emergency email alert');
  }
};

module.exports = {
  sendRaggingAlert,
};
