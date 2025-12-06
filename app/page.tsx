'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PostCard from '@/components/PostCard';
import CreatePost from '@/components/CreatePost';

interface Post {
  id: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
}

export default function Home() {
  const { user, isLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoadingPosts(true);
      setError(null);
      const response = await fetch('/api/posts?limit=20');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => {
    // Refresh posts after creating a new one
    fetchPosts();
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {user && <CreatePost onPostCreated={handlePostCreated} />}

      <div className="border-t border-gray-200 dark:border-gray-800">
        {isLoadingPosts ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Loading posts...
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchPosts}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-colors"
            >
              Try again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <p className="mb-2">No posts yet.</p>
            {user && (
              <p className="text-sm">Be the first to share something!</p>
            )}
            {!user && (
              <p className="text-sm">Sign up to create your first post!</p>
            )}
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}


