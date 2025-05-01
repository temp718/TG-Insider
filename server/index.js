import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { Telegraf } from 'telegraf';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// ES Modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server configuration
const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health check endpoint (REQUIRED for Render)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Initialize services if environment variables exist
let supabase, bot;

if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
}

if (process.env.TELEGRAM_BOT_TOKEN) {
  bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  
  bot.start((ctx) => ctx.reply('Welcome to Telegram Insider!'));
  bot.help((ctx) => ctx.reply('Help message'));
  
  bot.launch().then(() => {
    console.log('Telegram bot started');
  }).catch(err => {
    console.error('Bot failed to start:', err);
  });
}

// Production static file serving
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../../dist');
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server with explicit host binding
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  Server running in ${process.env.NODE_ENV || 'development'} mode
  Listening on port ${PORT}
  Health check: http://0.0.0.0:${PORT}/health
  `);
});

// Graceful shutdown
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    console.log(`\nReceived ${signal}, shutting down gracefully...`);
    server.close(() => {
      if (bot) {
        bot.stop(signal);
      }
      process.exit(0);
    });
  });
});
