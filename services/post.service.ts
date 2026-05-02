import { axiosInstance } from "@/lib/axios";
import type { CreatePostDTO, Post } from "@/types/post";

export interface GetPostsResponse {
  nextCursor: string | null;
  posts: Post[];
}

export async function getPosts(cursor?: string): Promise<GetPostsResponse> {
  const res = await axiosInstance.get<GetPostsResponse>("/posts/feed", {
    params: { cursor, limit: 10 },
  });
  return res.data;
}

export async function getPostById(id: string): Promise<Post> {
  const res = await axiosInstance.get<Post>(`/posts/${id}`);
  return res.data;
}

export async function createPost(data: CreatePostDTO): Promise<Post> {
  const res = await axiosInstance.post<Post>("/posts", data);
  return res.data;
}

export async function deletePost(id: string): Promise<void> {
  await axiosInstance.delete(`/posts/${id}`);
}
