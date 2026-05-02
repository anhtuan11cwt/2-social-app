"use client";

import { useRef } from "react";
import { useGetPosts } from "@/hooks/useGetPosts";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import PostCard from "./PostCard";

function PostSkeleton() {
  return (
    <div className="p-4 border-gray-800 border-b animate-pulse">
      <div className="flex items-start gap-3">
        <div className="bg-gray-800 rounded-full w-10 h-10 shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="bg-gray-800 rounded w-32 h-4" />
          <div className="bg-gray-800 rounded w-full h-20" />
        </div>
      </div>
    </div>
  );
}

export default function PostFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetPosts();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    enabled: !!hasNextPage,
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    rootMargin: "200px",
    target: loadMoreRef,
    threshold: 0.5,
  });

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
        <p className="mt-2 text-gray-600 text-sm">Hãy bắt đầu chia sẻ nhé!</p>
      </div>
    );
  }

  return (
    <div>
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Loading more posts */}
      {isFetchingNextPage && (
        <div className="py-4">
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}

      {/* End of feed message */}
      {!hasNextPage && allPosts.length > 0 && (
        <div className="py-4 text-gray-500 text-center">No more posts</div>
      )}

      {/* Infinite scroll trigger */}
      <div className="h-10" ref={loadMoreRef} />
    </div>
  );
}
