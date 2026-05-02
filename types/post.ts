import type { User } from "./user";

export interface Post {
  _count?: {
    likes: number;
    comments: number;
  };
  author: User;
  authorId: string;
  comments?: unknown[];
  content: string;
  createdAt: string;
  id: string;
  image?: string;
  imagePublicId?: string;
  likes?: unknown[];
  updatedAt: string;
}

export interface CreatePostDTO {
  content: string;
  image?: string;
}
