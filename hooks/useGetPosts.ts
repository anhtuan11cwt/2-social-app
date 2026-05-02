"use client";

import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { type GetPostsResponse, getPosts } from "@/services/post.service";

export const useGetPosts = () => {
  return useInfiniteQuery<
    GetPostsResponse,
    Error,
    InfiniteData<GetPostsResponse>,
    string[],
    string | undefined
  >({
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
    initialPageParam: undefined,
    queryFn: ({ pageParam }) => getPosts(pageParam),
    queryKey: ["posts"],
  });
};
