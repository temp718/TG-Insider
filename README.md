
# Telegram Insider

A blog and Telegram bot mini-app focused on Telegram features, especially Stars.

## Project Structure

- `/src` - Frontend React application
- `/server` - Backend Express server and Telegram bot
- `/public` - Static assets

## Development Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your values
3. Install dependencies:
   ```
   npm install
   cd server
   npm install
   cd ..
   ```
4. Start the development servers:
   - Frontend: `npm run dev`
   - Backend: `cd server && npm run dev`

## Deployment to Railway

1. Connect your GitHub repository to Railway
2. Set up the required environment variables in Railway:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `ADMIN_USER_IDS` (comma-separated list of Telegram user IDs)
   - `NEWSLETTER_API_KEY` (if using an external newsletter service)
3. Deploy using the Railway UI

## Database Schema (Supabase)

You'll need to create these tables in Supabase:

### Users Table
```sql
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  telegram_id text not null unique,
  first_name text,
  last_name text,
  username text,
  joined_at timestamp with time zone default now(),
  last_active timestamp with time zone default now()
);
```

### Newsletter Subscriptions Table
```sql
create table public.newsletter_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  name text,
  telegram_id text,
  subscribed_at timestamp with time zone default now(),
  foreign key (telegram_id) references public.users(telegram_id)
);
```

### Blog Posts Table
```sql
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  author_id uuid,
  category text not null,
  image_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  published boolean default false,
  foreign key (author_id) references auth.users(id)
);
```

## Bot Commands

- `/start` - Start the bot and register user
- `/help` - Show help message with available commands
- `/subscribe` - Get a link to subscribe to the newsletter
- `/latest` - Get the latest blog post
- `/stars` - Learn about Telegram Stars
- `/stats` - Admin only - get bot statistics
