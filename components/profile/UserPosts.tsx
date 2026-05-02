"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostCard from "@/components/post/PostCard";
import type { Post } from "@/types/post";

interface UserPostsProps {
  userId: string;
}

export default function UserPosts({ userId }: UserPostsProps) {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    enabled: !!userId,
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/user/${userId}`);
      return data;
    },
    queryKey: ["user-posts", userId],
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              className="p-4 border border-gray-800 rounded-lg animate-pulse"
              key={i}
            >
              <div className="bg-gray-700 mb-2 rounded w-3/4 h-4" />
              <div className="bg-gray-700 rounded w-1/2 h-3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400 text-center">Không thể tải bài viết</div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="p-6 text-gray-400 text-center">Chưa có bài viết nào</div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="mb-4 font-semibold text-white text-lg">Bài viết</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
