import type { User } from "./user";

export interface Post {
  _count: {
    likes: number;
    comments: number;
  };
  author: User;
  authorId: string;
  content: string;
  createdAt: string;
  id: string;
  image?: string;
}

export interface CreatePostDTO {
  content: string;
  image?: string;
}
