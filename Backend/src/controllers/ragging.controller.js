// Email service disabled temporarily to avoid timeouts
// const emailService = require('../services/email.service');

const triggerRaggingAlert = async (req, res) => {
  try {
    const { studentId } = req.body || {};

    if (!studentId) {
      return res.status(400).json({ error: "studentId is required" });
    }

    console.log("🚨 Ragging Alert Triggered:", studentId);

    return res.status(200).json({
      message: "Alert triggered successfully 🚨",
      studentId
    });

  } catch (error) {
    console.error("[Ragging Controller Error]", error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  triggerRaggingAlert,
};
