# Createorate App

A simple social media app built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

- User authentication (signup/login)
- Create and view posts
- Image upload support (structure ready)
- Responsive mobile-first design
- Clean, minimalist UI

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Auth + Postgres)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase project (URL and anon key)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── signup/route.ts
│   │   └── posts/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AuthModal.tsx
│   ├── CreatePost.tsx
│   ├── Navbar.tsx
│   └── PostCard.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   ├── db.ts
│   └── supabase.ts
```

## Database Schema

### posts table
- `id`
- `user_id`
- `username`
- `caption`
- `created_at`

## API Routes

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Authenticate user

### Posts
- `GET /api/posts` - Get recent posts (query params: `limit`, `offset`)
- `POST /api/posts` - Create a new post (requires authentication)

## Future Enhancements

- Image upload to cloud storage (Cloudinary, AWS S3, etc.)
- Session management with JWT or NextAuth.js
- Post likes and comments
- User profiles
- Real-time updates

## License

MIT


