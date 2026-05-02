"use client";

import { useQuery } from "@tanstack/react-query";
import { getCommentsByPostId } from "@/services/comment";

export function useGetComments(postId: string) {
  return useQuery({
    queryFn: () => getCommentsByPostId(postId),
    queryKey: ["comments", postId],
  });
}
