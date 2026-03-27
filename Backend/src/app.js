const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Main entry point for chatbot routes
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;
