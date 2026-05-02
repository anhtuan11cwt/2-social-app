import { axiosInstance } from "@/lib/axios";
import type { CreatePostDTO, Post } from "@/types/post";

export async function getPosts(): Promise<Post[]> {
  const res = await axiosInstance.get<Post[]>("/posts");
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
