import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { Telegraf } from 'telegraf';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

// Initialize environment variables
dotenv.config();

// ES Modules fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://qngpqbruijccgnkidkxb.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZ3BxYnJ1aWpjY2dua2lka3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MDIzMTYsImV4cCI6MjA2MTQ3ODMxNn0.pjLtsXpH0XrB3P15YY5wJcviPb-WuxDDh4xXyxo7WXk';

// Ensure the Supabase URL is correctly formatted
const formattedSupabaseUrl = supabaseUrl.startsWith('https://') 
  ? supabaseUrl 
  : `https://${supabaseUrl}`;

const supabase = createClient(formattedSupabaseUrl, supabaseKey);
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(cors());

// Bot initialization
let bot = null;
if (TELEGRAM_BOT_TOKEN) {
  try {
    bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    
    // Setup basic commands
    bot.start(async (ctx) => {
      const { id: userId, first_name, last_name, username } = ctx.from;
      
      try {
        // Store user in Supabase
        const { data, error } = await supabase
          .from('users')
          .upsert({
            telegram_id: userId.toString(),
            first_name,
            last_name,
            username,
            joined_at: new Date(),
            last_active: new Date()
          }, {
            onConflict: 'telegram_id'
          });
    
        if (error) {
          console.error('Error storing user:', error);
        }
    
        ctx.reply(`Welcome to Telegram Insider, ${first_name}! 🌟\n\nThis bot helps you stay updated with the latest Telegram features, especially Stars. Use /help to see available commands.`);
      } catch (err) {
        console.error('Error in start command:', err);
        ctx.reply('Welcome! There was an issue connecting to our database. Please try again later.');
      }
    });
    
    bot.help((ctx) => {
      ctx.reply(
        'Telegram Insider Bot Commands:\n\n' +
        '/start - Start the bot and register\n' +
        '/help - Show this help message\n' +
        '/subscribe - Subscribe to our newsletter\n' +
        '/latest - Get the latest blog post\n' +
        '/stars - Learn about Telegram Stars\n' +
        '/stats - Get bot statistics (admin only)'
      );
    });
    
    bot.command('subscribe', async (ctx) => {
      // Create a unique URL with user's Telegram ID for newsletter subscription
      const telegramId = ctx.from.id;
      const subscribeUrl = `${process.env.FRONTEND_URL || 'https://telegram-insider.onrender.com'}/subscribe?telegram_id=${telegramId}`;
      
      ctx.reply(
        'Subscribe to our newsletter to get the latest Telegram updates!\n\n' +
        `Click here to subscribe: ${subscribeUrl}`
      );
    });
    
    bot.command('latest', async (ctx) => {
      try {
        // Get the latest blog post from Supabase
        const { data, error } = await supabase
          .from('blog_posts')
          .select('title, slug')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const post = data[0];
          const postUrl = `${process.env.FRONTEND_URL || 'https://telegram-insider.onrender.com'}/blog/${post.slug}`;
          ctx.reply(`Latest article: "${post.title}"\n\nRead it here: ${postUrl}`);
        } else {
          ctx.reply('No blog posts found. Check back later!');
        }
      } catch (err) {
        console.error('Error fetching latest post:', err);
        ctx.reply('Sorry, I couldn\'t fetch the latest post. Please try again later.');
      }
    });
    
    bot.command('stars', (ctx) => {
      const starsUrl = `${process.env.FRONTEND_URL || 'https://telegram-insider.onrender.com'}/stars-guide`;
      ctx.reply(
        'Telegram Stars are a new way to monetize content on Telegram!\n\n' +
        `Learn more in our comprehensive guide: ${starsUrl}`
      );
    });
    
    // Admin only - stats command
    bot.command('stats', async (ctx) => {
      const userId = ctx.from.id.toString();
      
      if (!ADMIN_USER_IDS.includes(userId)) {
        return ctx.reply('Sorry, this command is only available to admins.');
      }
      
      try {
        // Get user stats
        const { count: userCount } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });
        
        const { count: subscriberCount } = await supabase
          .from('newsletter_subscriptions')
          .select('*', { count: 'exact', head: true });
        
        const totalUsers = userCount || 0;
        const totalSubscribers = subscriberCount || 0;
        
        ctx.reply(
          '📊 Bot Statistics 📊\n\n' +
          `Total users: ${totalUsers}\n` +
          `Newsletter subscribers: ${totalSubscribers}\n` +
          `Subscription rate: ${totalUsers > 0 ? Math.round((totalSubscribers / totalUsers) * 100) : 0}%`
        );
      } catch (err) {
        console.error('Error fetching stats:', err);
        ctx.reply('Sorry, there was an error retrieving statistics.');
      }
    });
    
    // Handle other messages
    bot.on('text', (ctx) => {
      ctx.reply('I don\'t understand that command. Use /help to see available commands.');
    });
    
    // Launch bot
    bot.launch()
      .then(() => console.log('Telegram bot started successfully'))
      .catch(err => console.error('Error starting Telegram bot:', err));
    
    // Make bot available to API routes
    app.set('bot', bot);
  } catch (error) {
    console.error('Failed to initialize Telegram bot:', error);
  }
}

// API Routes
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, name, telegramId } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    
    // Store subscription in Supabase
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .upsert({
        email,
        name,
        telegram_id: telegramId,
        subscribed_at: new Date().toISOString()
      }, {
        onConflict: 'email'
      });
    
    if (error) {
      console.error('Error storing subscription:', error);
      return res.status(500).json({ success: false, message: 'Failed to subscribe' });
    }
    
    // If subscription is coming from a Telegram user, send confirmation
    if (bot && telegramId) {
      try {
        await bot.telegram.sendMessage(
          telegramId,
          `Success! Your email (${email}) has been subscribed to our newsletter. You'll receive the latest Telegram news and insights.`
        );
      } catch (botError) {
        console.error('Error sending Telegram confirmation:', botError);
      }
    }
    
    return res.status(200).json({ success: true, message: 'Successfully subscribed to newsletter' });
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    supabase: !!supabase,
    bot: !!bot,
    port: PORT
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    version: '1.0.0' 
  });
});

// Define the frontend build path - go up one directory from server
const frontendPath = path.join(__dirname, '../dist');

// Log paths for debugging
console.log('Server directory:', __dirname);
console.log('Frontend path:', frontendPath);

// Check if the dist directory exists and log the result
fs.access(frontendPath, fs.constants.F_OK, (err) => {
  console.log(`Dist directory ${err ? 'does not exist' : 'exists'} at path: ${frontendPath}`);
  if (err) {
    console.error(`Error accessing frontend path: ${err.message}`);
    
    // Try to list parent directory contents to debug
    try {
      const parentDir = path.join(__dirname, '..');
      const files = fs.readdirSync(parentDir);
      console.log('Parent directory contents:', files);
      
      // Create dist directory if it doesn't exist
      fs.mkdirSync(frontendPath, { recursive: true });
      console.log('Created dist directory at:', frontendPath);
    } catch (readErr) {
      console.error('Error reading parent directory:', readErr);
    }
  }
});

// Serve static files from the React frontend app
app.use(express.static(frontendPath));

// Special case for index.html - add more detailed error handling
app.get('*', (req, res) => {
  // Check if index.html exists before sending
  const indexPath = path.join(frontendPath, 'index.html');
  
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`Error: index.html not found at ${indexPath}`);
      
      // More informative error response
      return res.status(404).send(`
        <html>
          <head><title>Frontend Not Built</title></head>
          <body>
            <h1>Frontend not built</h1>
            <p>The frontend build files were not found at ${indexPath}</p>
            <p>Please run <code>npm run build</code> first or check your build configuration.</p>
            <p>Server is running, but frontend assets are missing.</p>
            <p><a href="/api/status">Check API Status</a></p>
          </body>
        </html>
      `);
    }
    
    res.sendFile(indexPath);
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  Server running on port ${PORT}
  Supabase connected: ${!!supabase}
  Bot initialized: ${!!bot}
  Environment: ${process.env.NODE_ENV || 'development'}
  Health check available at: /health
  API status available at: /api/status
  Frontend path: ${frontendPath}
  `);
});

// Handle termination signals properly
process.once('SIGINT', () => {
  if (bot) bot.stop('SIGINT');
  process.exit(0);
});

process.once('SIGTERM', () => {
  if (bot) bot.stop('SIGTERM');
  process.exit(0);
});
