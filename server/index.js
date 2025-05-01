
const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { Telegraf } = require('telegraf');
const cors = require('cors');

// Environment variables
const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS ? process.env.ADMIN_USER_IDS.split(',').map(id => id.trim()) : [];

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize Telegram bot
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Bot commands
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
  const subscribeUrl = `${process.env.FRONTEND_URL || 'https://your-app-url.up.railway.app'}/subscribe?telegram_id=${telegramId}`;
  
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
      const postUrl = `${process.env.FRONTEND_URL || 'https://your-app-url.up.railway.app'}/blog/${post.slug}`;
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
  const starsUrl = `${process.env.FRONTEND_URL || 'https://your-app-url.up.railway.app'}/stars-guide`;
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
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count');
    
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscriptions')
      .select('count');
    
    if (usersError || subscribersError) throw new Error('Database query failed');
    
    const totalUsers = users[0]?.count || 0;
    const totalSubscribers = subscribers[0]?.count || 0;
    
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

// Start the bot
bot.launch().then(() => {
  console.log('Telegram bot started successfully');
}).catch(err => {
  console.error('Error starting Telegram bot:', err);
});

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
        subscribed_at: new Date()
      }, {
        onConflict: 'email'
      });
    
    if (error) {
      console.error('Error storing subscription:', error);
      return res.status(500).json({ success: false, message: 'Failed to subscribe' });
    }
    
    // If subscription is coming from a Telegram user, send confirmation
    if (telegramId) {
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

// Serve the static frontend files
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React build folder
  app.use(express.static(path.join(__dirname, '../dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

// Start the server and log the port it's running on
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

// Enable graceful stop
process.once('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    bot.stop('SIGINT');
  });
});

process.once('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    bot.stop('SIGTERM');
  });
});

// Start the bot if we have a token
if (TELEGRAM_BOT_TOKEN) {
  bot.launch().then(() => {
    console.log('Telegram bot started successfully');
  }).catch(err => {
    console.error('Error starting Telegram bot:', err);
  });
} else {
  console.warn('TELEGRAM_BOT_TOKEN not provided, bot will not start');
}
