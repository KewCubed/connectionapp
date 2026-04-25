import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const postSchema = z.object({
  caption: z.string().min(1).max(5000).optional(),
  content: z.string().min(1).max(5000).optional(),
  image_url: z.string().url().nullable().optional(),
  userId: z.string(),
  username: z.string().min(1).optional(),
});

// GET /api/posts - Get recent posts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, error } = await supabase
      .from('posts')
      .select('id, user_id, username, caption, image_url, created_at')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    const posts =
      data?.map((post) => ({
        id: post.id,
        content: post.caption,
        image_url: post.image_url,
        createdAt: post.created_at,
        user: {
          id: post.user_id,
          username: post.username,
        },
      })) ?? [];

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = postSchema.parse(body);
    const caption = validatedData.caption ?? validatedData.content;

    if (!caption) {
      return NextResponse.json(
        { error: 'Caption is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: validatedData.userId,
        username: validatedData.username ?? 'unknown',
        caption,
        image_url: validatedData.image_url ?? null,
      })
      .select('id, user_id, username, caption, image_url, created_at')
      .single();

    if (error) {
      throw error;
    }

    const post = {
      id: data.id,
      content: data.caption,
      image_url: data.image_url,
      createdAt: data.created_at,
      user: {
        id: data.user_id,
        username: data.username,
      },
    };

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}


