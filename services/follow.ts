import { axiosInstance } from "@/lib/axios";

export async function followUser(userId: string) {
  try {
    const res = await axiosInstance.post(`/users/${userId}/follow`);
    return res.data;
  } catch (error: unknown) {
    console.error("Lỗi dịch vụ theo dõi:", error);
    throw error;
  }
}
