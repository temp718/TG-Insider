 import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { Telegraf } from 'telegraf';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const formattedSupabaseUrl = supabaseUrl.startsWith('https://') ? supabaseUrl : `https://${supabaseUrl}`;
const supabase = createClient(formattedSupabaseUrl, supabaseKey);
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(cors());

let bot = null;
if (process.env.TELEGRAM_BOT_TOKEN) {
  try {
    bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS ? process.env.ADMIN_USER_IDS.split(',') : [];

    bot.start(async (ctx) => {
      const { id: userId, first_name, last_name, username } = ctx.from;
      
      try {
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
    
        if (error) console.error('Error storing user:', error);
        ctx.reply(`Welcome to Telegram Insider, ${first_name}! 🌟\n\nUse /help for commands.`);
      } catch (err) {
        console.error('Error in start command:', err);
        ctx.reply('Welcome! Database issue. Try later.');
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
      const telegramId = ctx.from.id;
      const subscribeUrl = `${process.env.FRONTEND_URL || 'https://telegram-insider.onrender.com'}/subscribe?telegram_id=${telegramId}`;
      ctx.reply(
        'Subscribe to our newsletter!\n\n' +
        `Click here: ${subscribeUrl}`
      );
    });
    
    bot.command('latest', async (ctx) => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('title, slug')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const post = data[0];
          const postUrl = `${process.env.FRONTEND_URL || 'https://telegram-insider.onrender.com'}/blog/${post.slug}`;
          ctx.reply(`Latest article: "${post.title}"\n\nRead here: ${postUrl}`);
        } else {
          ctx.reply('No blog posts found.');
        }
      } catch (err) {
        console.error('Error fetching latest post:', err);
        ctx.reply('Error fetching post. Try later.');
      }
    });
    
    bot.command('stars', (ctx) => {
      const starsUrl = `${process.env.FRONTEND_URL || 'https://telegram-insider.onrender.com'}/stars-guide`;
      ctx.reply(
        'Telegram Stars monetization!\n\n' +
        `Guide: ${starsUrl}`
      );
    });
    
    bot.command('stats', async (ctx) => {
      const userId = ctx.from.id.toString();
      
      if (!ADMIN_USER_IDS.includes(userId)) {
        return ctx.reply('Admin only command.');
      }
      
      try {
        const { count: userCount } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });
        
        const { count: subscriberCount } = await supabase
          .from('newsletter_subscriptions')
          .select('*', { count: 'exact', head: true });
        
        const totalUsers = userCount || 0;
        const totalSubscribers = subscriberCount || 0;
        
        ctx.reply(
          '📊 Bot Stats 📊\n\n' +
          `Total users: ${totalUsers}\n` +
          `Subscribers: ${totalSubscribers}\n` +
          `Subscription rate: ${totalUsers > 0 ? Math.round((totalSubscribers / totalUsers) * 100) : 0}%`
        );
      } catch (err) {
        console.error('Error fetching stats:', err);
        ctx.reply('Error retrieving statistics.');
      }
    });
    
    bot.on('text', (ctx) => {
      ctx.reply('Unknown command. Use /help for commands.');
    });
    
    bot.launch()
      .then(() => console.log('Bot started'))
      .catch(err => console.error('Bot error:', err));
    
    app.set('bot', bot);
  } catch (error) {
    console.error('Bot init error:', error);
  }
}

app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, name, telegramId } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email required' });
    }
    
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
      console.error('Subscription error:', error);
      return res.status(500).json({ success: false, message: 'Subscribe failed' });
    }
    
    if (bot && telegramId) {
      try {
        await bot.telegram.sendMessage(
          telegramId,
          `Subscribed: ${email} to newsletter.`
        );
      } catch (botError) {
        console.error('Telegram error:', botError);
      }
    }
    
    return res.status(200).json({ success: true, message: 'Subscribed' });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    supabase: !!supabase,
    bot: !!bot,
    port: PORT
  });
});

app.get('/api/status', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server running',
    version: '1.0.0' 
  });
});

const frontendPath = path.join(__dirname, '../dist');

fs.access(frontendPath, fs.constants.F_OK, (err) => {
  console.log(`Frontend path: ${err ? 'missing' : 'exists'}`);
  if (err) {
    try {
      fs.mkdirSync(frontendPath, { recursive: true });
    } catch (mkdirErr) {
      console.error('Create dir error:', mkdirErr);
    }
  }
});

app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  const indexPath = path.join(frontendPath, 'index.html');
  
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Frontend not built');
    }
    res.sendFile(indexPath);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

process.once('SIGINT', () => {
  if (bot) bot.stop('SIGINT');
  process.exit(0);
});

process.once('SIGTERM', () => {
  if (bot) bot.stop('SIGTERM');
  process.exit(0);
});
