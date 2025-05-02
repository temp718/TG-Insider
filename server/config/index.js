
// Environment variables configuration
const config = {
  PORT: process.env.PORT || 8080,
  get SUPABASE_URL() {
    const url = process.env.SUPABASE_URL || 'https://qngpqbruijccgnkidkxb.supabase.co';
    return url.startsWith('https://') ? url : `https://${url}`;
  },
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZ3BxYnJ1aWpjY2dua2lka3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MDIzMTYsImV4cCI6MjA2MTQ3ODMxNn0.pjLtsXpH0XrB3P15YY5wJcviPb-WuxDDh4xXyxo7WXk',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '8096236043:AAEk9vFK7TMklFivxA-FNG77zFbsblqy428',
  ADMIN_USER_IDS: process.env.ADMIN_USER_IDS ? process.env.ADMIN_USER_IDS.split(',').map(id => id.trim()) : ['5107333540', '00011166'],
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://telegram-insider.up.railway.app',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

module.exports = config;
