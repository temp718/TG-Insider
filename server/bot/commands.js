
const supabase = require('../db/supabase');
const config = require('../config');

// Bot commands
const setupBotCommands = (bot) => {
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
    const subscribeUrl = `${config.FRONTEND_URL}/subscribe?telegram_id=${telegramId}`;
    
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
        const postUrl = `${config.FRONTEND_URL}/blog/${post.slug}`;
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
    const starsUrl = `${config.FRONTEND_URL}/stars-guide`;
    ctx.reply(
      'Telegram Stars are a new way to monetize content on Telegram!\n\n' +
      `Learn more in our comprehensive guide: ${starsUrl}`
    );
  });

  // Admin only - stats command
  bot.command('stats', async (ctx) => {
    const userId = ctx.from.id.toString();
    
    if (!config.ADMIN_USER_IDS.includes(userId)) {
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
};

module.exports = setupBotCommands;
