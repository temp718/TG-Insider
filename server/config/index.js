
// Environment variables configuration
const config = {
  PORT: process.env.PORT || 10000,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  ADMIN_USER_IDS: process.env.ADMIN_USER_IDS ? process.env.ADMIN_USER_IDS.split(',').map(id => id.trim()) : [],
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://your-app-url.up.railway.app',
  NODE_ENV: process.env.NODE_ENV
};

module.exports = config;
