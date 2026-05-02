import type { User } from "./user";

export interface CreateCommentData {
  content: string;
  postId: string;
}

export interface Comment {
  author: User;
  authorId: string;
  content: string;
  createdAt: string;
  id: string;
  postId: string;
}

export interface CommentResponse {
  comment: Comment;
  postAuthorId: string;
  success: boolean;
}
