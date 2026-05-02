"use client";

import { useEffect, useRef } from "react";
import { useGetPosts } from "@/hooks/useGetPosts";
import PostCard from "./PostCard";

function PostSkeleton() {
  return (
    <div className="border-b border-gray-800 p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-800 shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-32 bg-gray-800 rounded" />
          <div className="h-20 w-full bg-gray-800 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function PostFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetPosts();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (allPosts.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 text-lg">Chưa có bài đăng nào</p>
        <p className="text-gray-600 text-sm mt-2">Hãy bắt đầu chia sẻ nhé!</p>
      </div>
    );
  }

  return (
    <div>
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Infinite scroll trigger */}
      <div
        className="h-10 flex items-center justify-center py-4"
        ref={loadMoreRef}
      >
        {isFetchingNextPage && (
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
        )}
        {!hasNextPage && allPosts.length > 0 && (
          <p className="text-gray-600 text-sm">Đã hiển thị tất cả bài đăng</p>
        )}
      </div>
    </div>
  );
}
