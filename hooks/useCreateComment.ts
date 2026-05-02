"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/services/comment";

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}
