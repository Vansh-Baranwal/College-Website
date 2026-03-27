const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase Setup Warning] SUPABASE_URL or SUPABASE_KEY is missing from environment variables.');
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

/**
 * Fetch all announcements from the database.
 */
const getAnnouncements = async () => {
  const { data, error } = await supabase.from('announcements').select('*');
  if (error) throw new Error(`Supabase error fetching announcements: ${error.message}`);
  return data;
};

/**
 * Fetch all events from the database.
 */
const getEvents = async () => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) throw new Error(`Supabase error fetching events: ${error.message}`);
  return data;
};

/**
 * Fetch all courses from the database.
 */
const getCourses = async () => {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) throw new Error(`Supabase error fetching courses: ${error.message}`);
  return data;
};

/**
 * Fetch all faculty from the database.
 */
const getFaculty = async () => {
  const { data, error } = await supabase.from('faculty').select('*');
  if (error) throw new Error(`Supabase error fetching faculty: ${error.message}`);
  return data;
};

module.exports = {
  supabase,
  getAnnouncements,
  getEvents,
  getCourses,
  getFaculty
};
