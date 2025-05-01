import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { Telegraf } from 'telegraf';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// ES Modules fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate Supabase URL
const SUPABASE_URL = process.env.SUPABASE_URL;
if (!SUPABASE_URL || !SUPABASE_URL.startsWith('https://')) {
  throw new Error('Invalid Supabase URL. Must start with https://');
}

const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
if (!SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase anon key');
}

// Initialize services
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    supabase: !!supabase,
    port: PORT
  });
});

// Telegram bot initialization
if (process.env.TELEGRAM_BOT_TOKEN) {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  
  bot.start((ctx) => ctx.reply('Bot is working!'));
  
  bot.launch().then(() => {
    console.log('Telegram bot started');
  }).catch(console.error);
}

// Production static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  Server running on port ${PORT}
  Supabase connected: ${!!supabase}
  Environment: ${process.env.NODE_ENV || 'development'}
  `);
});
