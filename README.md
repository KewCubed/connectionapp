# Connection App

A simple social media app built with Next.js 14, TypeScript, Tailwind CSS, and Prisma ORM.

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
- **Prisma ORM** (PostgreSQL)
- **bcryptjs** (password hashing)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or connection string)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your PostgreSQL connection string:
```
DATABASE_URL="postgresql://user:password@localhost:5432/connection_app?schema=public"
```

3. Generate Prisma Client:
```bash
npm run db:generate
```

4. Push the database schema:
```bash
npm run db:push
```

5. Run the development server:
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
│   ├── auth.ts
│   └── db.ts
└── prisma/
    └── schema.prisma
```

## Database Schema

### User
- `id` (String, CUID)
- `username` (String, unique)
- `passwordHash` (String)
- `createdAt` (DateTime)

### Post
- `id` (String, CUID)
- `userId` (String, foreign key)
- `content` (String, text)
- `imageUrl` (String, optional)
- `createdAt` (DateTime)

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


