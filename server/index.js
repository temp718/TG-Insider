
const express = require('express');
const path = require('path');
const cors = require('cors');

// Import configuration and modules
const config = require('./config');
const apiRoutes = require('./routes/api');
const initBot = require('./bot');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Telegram bot
const bot = initBot();

// Store bot instance in app for API routes to use
if (bot) {
  app.set('bot', bot);
}

// API Routes
app.use('/api', apiRoutes);

// Serve the static frontend files in production
if (config.NODE_ENV === 'production') {
  console.log('Serving static files from', path.join(__dirname, '../dist'));
  
  // Serve static files from the React build folder
  app.use(express.static(path.join(__dirname, '../dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

// Start the server with explicit host binding
const server = app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${config.PORT}`);
  console.log(`Environment: ${config.NODE_ENV}`);
});

// Enable graceful stop
process.once('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    if (bot) bot.stop('SIGINT');
  });
});

process.once('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    if (bot) bot.stop('SIGTERM');
  });
});
