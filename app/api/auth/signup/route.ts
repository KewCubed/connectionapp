import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const signupSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

// POST /api/auth/signup - Create a new user account
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = signupSchema.parse(body);

    const email = `${validatedData.username}@connection-app.local`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password: validatedData.password,
      options: {
        data: {
          username: validatedData.username,
        },
      },
    });

    if (error) {
      const status = error.message.toLowerCase().includes('already')
        ? 409
        : 400;
      return NextResponse.json({ error: error.message }, { status });
    }

    return NextResponse.json(
      {
        user: {
          id: data.user?.id ?? null,
          username: validatedData.username,
        },
        message: 'Account created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error during signup:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}


