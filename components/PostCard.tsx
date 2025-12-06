'use client';

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

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <article className="border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <div className="flex gap-3">
        {/* Avatar placeholder */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
            {post.user.username.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Post content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900 dark:text-white">
              {post.user.username}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              · {formatDate(post.createdAt)}
            </span>
          </div>

          <p className="text-gray-900 dark:text-white whitespace-pre-wrap break-words mb-2">
            {post.content}
          </p>

          {post.imageUrl && (
            <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
              <img
                src={post.imageUrl}
                alt="Post image"
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}


