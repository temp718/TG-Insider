const express = require('express');
const supabase = require('../db/supabase');
const config = require('../config');

const router = express.Router();

// Health check endpoint for deployment platforms
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Newsletter subscription endpoint
router.post('/newsletter/subscribe', async (req, res) => {
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
    // We'll need to pass the bot instance to this function
    if (req.app.get('bot') && telegramId) {
      try {
        await req.app.get('bot').telegram.sendMessage(
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

// Status endpoint
router.get('/status', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

module.exports = router;
