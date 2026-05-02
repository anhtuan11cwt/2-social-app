import { axiosInstance } from "@/lib/axios";

export interface LikePostResponse {
  liked: boolean;
  postAuthorId: string;
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

export async function likePost(postId: string): Promise<LikePostResponse> {
  try {
    const response = await axiosInstance.post<LikePostResponse>(
      `/posts/${postId}/like`,
    );
    return response.data;
  } catch (error: unknown) {
    console.error("LIKE_SERVICE_ERROR:", error);
    throw hasResponseData(error) ? error.response.data : error;
  }
}
