import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/post.service";

export function usePosts() {
  return useQuery({
    queryFn: () => getPosts(undefined),
    queryKey: ["posts"],
  });
}
