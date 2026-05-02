"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useFollowUser } from "@/hooks/useFollowUser";
import { axiosInstance } from "@/lib/axios";

interface SuggestedUser {
  id: string;
  image: string | null;
  isFollowing: boolean;
  name: string | null;
  username: string;
}

export default function RightSidebar() {
  const { data: session } = useSession();
  const { followUserMutation, loading } = useFollowUser();

  const { data: users = [] } = useQuery<SuggestedUser[]>({
    enabled: !!session?.user?.id,
    queryFn: async () => {
      if (!session?.user?.id) return [];

      const response = await axiosInstance.get("/users/suggestions");
      return response.data;
    },
    queryKey: ["follow-suggestions"],
  });

  const handleFollow = (userId: string) => {
    if (!session?.user?.id) return;
    followUserMutation(userId);
  };

  if (!session?.user?.id) {
    return null;
  }

  return (
    <div className="top-24 sticky space-y-4">
      <h2 className="font-semibold text-lg">Gợi ý theo dõi</h2>

      {users.length === 0 ? (
        <div className="bg-dark-2 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">
            Hiện không có gợi ý người dùng nào
          </p>
          <p className="mt-1 text-gray-500 text-xs">Bạn đã xem hết tất cả</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              className="flex justify-between items-center bg-dark-2 p-3 rounded-lg"
              key={user.id}
            >
              <Link
                className="flex items-center gap-3 hover:bg-dark-3 p-1 rounded transition"
                href={`/profile/${user.id}`}
              >
                {user.image ? (
                  <Image
                    alt={user.name || "người dùng"}
                    className="rounded-full object-cover"
                    height={40}
                    src={user.image}
                    width={40}
                  />
                ) : (
                  <div className="flex justify-center items-center bg-dark-3 rounded-full w-10 h-10">
                    <span className="text-sm">?</span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-gray-400 text-sm">@{user.username}</p>
                </div>
              </Link>

              <button
                className={`px-3 py-1.5 rounded text-sm transition cursor-pointer disabled:cursor-not-allowed ${
                  user.isFollowing
                    ? "bg-gray-600 hover:bg-gray-700 text-white"
                    : "bg-primary hover:bg-primary-hover text-white"
                } disabled:opacity-50`}
                disabled={loading}
                onClick={() => handleFollow(user.id)}
                type="button"
              >
                {loading
                  ? "Đang xử lý..."
                  : user.isFollowing
                    ? "Đang theo dõi"
                    : "Theo dõi"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
