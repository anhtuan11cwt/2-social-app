import { axiosInstance } from "@/lib/axios";
import type { User, UserWithCounts } from "@/types/user";

export async function getCurrentUser(): Promise<User> {
  const res = await axiosInstance.get<User>("/users/me");
  return res.data;
}

export async function getUserById(id: string): Promise<UserWithCounts> {
  const res = await axiosInstance.get<UserWithCounts>(`/users/${id}`);
  return res.data;
}

export async function getUsers(): Promise<User[]> {
  const res = await axiosInstance.get<User[]>("/users");
  return res.data;
}
