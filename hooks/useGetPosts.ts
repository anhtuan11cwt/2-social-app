"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/post.service";

export const useGetPosts = () => {
  return useInfiniteQuery({
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => getPosts(pageParam),
    queryKey: ["posts"],
  });
};
