const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { supabase } = require('./supabase.service');

const JWT_SECRET = process.env.JWT_SECRET || 'f4l1b4ckt0k3ns3cr3t1234!!';

/**
 * Register a new user securely.
 */
const signupUser = async (name, email, password) => {
  try {
    // 1. Check if email is already taken
    const { data: existingUser } = await supabase.from('users').select('id').eq('email', email).maybeSingle();
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    // 2. Hash their password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert into Supabase 'users' table
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])
      .select()
      .single();

    if (error) {
       console.error("Supabase Error during insert:", error);
       throw new Error(`Failed to create user: ${error.message}`);
    }
    if (!newUser) throw new Error('Failed to create user. Data empty.');

    // 4. Generate token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

    return {
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Authenticate existing users.
 */
const loginUser = async (email, password) => {
  try {
    // 1. Fetch user by email
    const { data: user, error } = await supabase.from('users').select('*').eq('email', email).maybeSingle();
    if (error) throw new Error(`Supabase fetch failed: ${error.message}`);
    if (!user) throw new Error('Invalid credentials');

    // 2. Verify hashed password securely
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // 3. Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signupUser,
  loginUser
};
