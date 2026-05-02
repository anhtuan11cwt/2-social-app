import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/services/post.service";

export function useGetPost(postId: string) {
  return useQuery({
    enabled: !!postId,
    queryFn: () => getPostById(postId),
    queryKey: ["post", postId],
  });
}
