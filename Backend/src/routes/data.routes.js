const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

// GET requests mapping dynamically to respective databases via standard REST
router.get('/announcements', dataController.getAnnouncements);
router.get('/events', dataController.getEvents);
router.get('/courses', dataController.getCourses);
router.get('/faculty', dataController.getFaculty);

module.exports = router;
