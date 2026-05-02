import { axiosInstance } from "@/lib/axios";
import type { Comment, CreateCommentData } from "@/types/comment";

export interface CreateCommentResponse {
  comment: Comment;
  postAuthorId: string;
  success: boolean;
}

function hasResponseData(
  error: unknown,
): error is { response: { data: unknown } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response
  );
}

export async function createComment(
  data: CreateCommentData,
): Promise<CreateCommentResponse> {
  try {
    const response = await axiosInstance.post<CreateCommentResponse>(
      "/comments",
      data,
    );
    return response.data;
  } catch (error: unknown) {
    console.error("CREATE_COMMENT_SERVICE_ERROR:", error);
    throw hasResponseData(error) ? error.response.data : error;
  }
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  try {
    const response = await axiosInstance.get<Comment[]>(
      `/posts/${postId}/comments`,
    );
    return response.data;
  } catch (error: unknown) {
    console.error("GET_COMMENTS_SERVICE_ERROR:", error);
    throw hasResponseData(error) ? error.response.data : error;
  }
}
