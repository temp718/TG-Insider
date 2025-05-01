 import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { Telegraf } from 'telegraf';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables
const PORT = process.env.PORT || 10000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS ? process.env.ADMIN_USER_IDS.split(',') : [];
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://tg-insider.onrender.com';

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL }));

// Initialize Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize Telegram Bot
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Bot Commands
bot.start((ctx) => ctx.reply('Welcome to Telegram Insider!'));
bot.help((ctx) => ctx.reply('Help message'));

// API Routes
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
  });
}

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Start bot if token exists
if (TELEGRAM_BOT_TOKEN) {
  bot.launch()
    .then(() => console.log('Bot started'))
    .catch(err => console.error('Bot error:', err));
}

// Graceful shutdown
process.once('SIGINT', () => {
  server.close();
  if (bot) bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  server.close();
  if (bot) bot.stop('SIGTERM');
});
