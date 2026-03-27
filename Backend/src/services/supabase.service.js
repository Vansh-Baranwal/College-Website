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

/**
 * Global search across departments, faculty, and courses using case-insensitive matching.
 * @param {string} q - Search query string
 */
const searchAll = async (q) => {
  if (!q || typeof q !== 'string' || q.trim() === '') {
    return { departments: [], faculty: [], courses: [] };
  }

  const searchTerm = `%${q}%`;

  // Request all tables concurrently for efficiency
  const [deptRes, facultyRes, coursesRes] = await Promise.all([
    supabase.from('departments').select('*').ilike('name', searchTerm),
    supabase.from('faculty').select('*').ilike('name', searchTerm),
    supabase.from('courses').select('*').or(`name.ilike.${searchTerm},code.ilike.${searchTerm}`)
  ]);

  if (deptRes.error) throw new Error(`Error searching departments: ${deptRes.error.message}`);
  if (facultyRes.error) throw new Error(`Error searching faculty: ${facultyRes.error.message}`);
  if (coursesRes.error) throw new Error(`Error searching courses: ${coursesRes.error.message}`);

  return {
    departments: deptRes.data || [],
    faculty: facultyRes.data || [],
    courses: coursesRes.data || []
  };
};

module.exports = {
  supabase,
  getAnnouncements,
  getEvents,
  getCourses,
  getFaculty,
  searchAll
};
