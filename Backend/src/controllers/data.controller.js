const supabaseService = require('../services/supabase.service');

const getAnnouncements = async (req, res) => {
  try {
    const data = await supabaseService.getAnnouncements();
    return res.status(200).json(data);
  } catch (error) {
    console.error(`[Data Controller Error] ${error.message}`);
    return res.status(500).json({ error: 'Failed to fetch announcements' });
  }
};

const getEvents = async (req, res) => {
  try {
    const data = await supabaseService.getEvents();
    return res.status(200).json(data);
  } catch (error) {
    console.error(`[Data Controller Error] ${error.message}`);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
};

const getCourses = async (req, res) => {
  try {
    const data = await supabaseService.getCourses();
    return res.status(200).json(data);
  } catch (error) {
    console.error(`[Data Controller Error] ${error.message}`);
    return res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

const getFaculty = async (req, res) => {
  try {
    const data = await supabaseService.getFaculty();
    return res.status(200).json(data);
  } catch (error) {
    console.error(`[Data Controller Error] ${error.message}`);
    return res.status(500).json({ error: 'Failed to fetch faculty' });
  }
};

module.exports = {
  getAnnouncements,
  getEvents,
  getCourses,
  getFaculty
};
