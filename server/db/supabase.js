
const { createClient } = require('@supabase/supabase-js');
const config = require('../config');

// Ensure proper Supabase URL formatting
const supabaseUrl = config.SUPABASE_URL;
const formattedUrl = supabaseUrl.startsWith('https://') 
  ? supabaseUrl 
  : `https://${supabaseUrl}`;

// Initialize Supabase client with proper URL
const supabase = createClient(formattedUrl, config.SUPABASE_ANON_KEY);

module.exports = supabase;
