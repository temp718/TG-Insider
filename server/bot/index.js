
const { Telegraf } = require('telegraf');
const config = require('../config');
const setupBotCommands = require('./commands');

// Initialize and configure the Telegram bot
const initBot = () => {
  // Only initialize if we have a token
  if (!config.TELEGRAM_BOT_TOKEN) {
    console.warn('TELEGRAM_BOT_TOKEN not provided, bot will not start');
    return null;
  }

  const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);
  
  // Setup commands
  setupBotCommands(bot);

  // Start the bot
  bot.launch().then(() => {
    console.log('Telegram bot started successfully');
  }).catch(err => {
    console.error('Error starting Telegram bot:', err);
  });

  return bot;
};

module.exports = initBot;
