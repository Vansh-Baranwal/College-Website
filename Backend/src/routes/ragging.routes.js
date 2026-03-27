const express = require('express');
const router = express.Router();
const raggingController = require('../controllers/ragging.controller');

// POST /api/ragging/alert
router.post('/alert', raggingController.triggerRaggingAlert);

module.exports = router;
