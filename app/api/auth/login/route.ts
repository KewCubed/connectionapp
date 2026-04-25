import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

// POST /api/auth/login - Authenticate user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = loginSchema.parse(body);

    const email = `${validatedData.username}@connection-app.local`;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: validatedData.password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Return user data (in production, you'd set a session/JWT here)
    return NextResponse.json(
      {
        user: {
          id: data.user.id,
          username:
            (data.user.user_metadata?.username as string | undefined) ??
            validatedData.username,
        },
        message: 'Login successful',
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 500 }
    );
  }
}


