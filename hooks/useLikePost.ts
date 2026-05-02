"use client";

import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { likePost } from "@/services/like";
import type { GetPostsResponse } from "@/services/post.service";
import type { Post } from "@/types/post";

interface LikeError {
  error?: string;
}

function togglePostLike(post: Post): Post {
  const newLiked = !post.isLiked;
  const likesCount = post._count?.likes ?? 0;

  return {
    ...post,
    _count: {
      comments: post._count?.comments ?? 0,
      likes: newLiked ? likesCount + 1 : Math.max(likesCount - 1, 0),
    },
    isLiked: newLiked,
  };
}

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,

    onError: (error: LikeError) => {
      console.error("Lỗi thích:", error?.error || "Đã xảy ra lỗi");
    },

    onSuccess: (_, postId) => {
      // Update infinite query for posts feed
      queryClient.setQueriesData<InfiniteData<GetPostsResponse>>(
        { queryKey: ["posts"] },
        (oldData) => {
          if (!oldData?.pages) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post) => {
                if (post.id === postId) {
                  return togglePostLike(post);
                }
                return post;
              }),
            })),
          };
        },
      );

      // Update individual post query in cache immediately
      queryClient.setQueriesData<Post>({ queryKey: ["post"] }, (oldData) => {
        if (!oldData || oldData.id !== postId) return oldData;

        return togglePostLike(oldData);
      });

      // Also invalidate to ensure fresh data from server
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
}
