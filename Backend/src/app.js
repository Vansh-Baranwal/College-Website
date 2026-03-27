const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat.routes');
const authRoutes = require('./routes/auth.routes');
const dataRoutes = require('./routes/data.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;
