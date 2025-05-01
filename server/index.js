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

// Supabase configuration - USING YOUR CREDENTIALS
const SUPABASE_URL = 'https://qngpqbruijccgnkidkxb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZ3BxYnJ1aWpjY2dua2lka3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MDIzMTYsImV4cCI6MjA2MTQ3ODMxNn0.pjLtsXpH0XrB3P15YY5wJcviPb-WuxDDh4xXyxo7WXk';

// Validate Supabase URL
if (!SUPABASE_URL.startsWith('https://')) {
  throw new Error('Invalid Supabase URL. Must start with https://');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    supabase: !!supabase,
    port: PORT
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  Server running on port ${PORT}
  Supabase connected: ${!!supabase}
  Environment: ${process.env.NODE_ENV || 'development'}
  `);
});
