const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat.routes');
const authRoutes = require('./routes/auth.routes');
const dataRoutes = require('./routes/data.routes');
const searchRoutes = require('./routes/search.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/search', searchRoutes);

// Root API route
app.get("/api", (req, res) => {
  res.json({
    status: "success",
    message: "API is running 🚀",
    endpoints: {
      auth: [
        "/api/auth/signup",
        "/api/auth/login"
      ],
      chatbot: [
        "/api/chat"
      ],
      search: [
        "/api/search?q=..."
      ],
      data: [
        "/api/data/courses",
        "/api/data/events",
        "/api/data/departments",
        "/api/data/faculty"
      ]
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;
