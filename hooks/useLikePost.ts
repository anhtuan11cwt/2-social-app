"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "@/services/like";

interface LikeError {
  error?: string;
}

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,

    onError: (error: LikeError) => {
      console.error("Lỗi thích:", error?.error || "Đã xảy ra lỗi");
    },

    onSuccess: () => {
      // Refresh posts to update like count
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}
