const authService = require('../services/auth.service');

/**
 * Handle signup requests.
 */
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const { token, user } = await authService.signupUser(name, email, password);

    return res.status(201).json({ token, user });
  } catch (error) {
    console.error(`[Auth Controller Error] ${error.message}\nStack: ${error.stack}`);
    return res.status(400).json({ error: error.message || 'Signup failed' });
  }
};

/**
 * Handle login requests.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { token, user } = await authService.loginUser(email, password);

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(`[Auth Controller Error] ${error.message}\nStack: ${error.stack}`);
    return res.status(401).json({ error: error.message || 'Authentication failed' });
  }
};

module.exports = {
  signup,
  login
};
