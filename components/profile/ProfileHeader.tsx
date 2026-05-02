"use client";

import Image from "next/image";
import { useFollowUser } from "@/hooks/useFollowUser";

interface ProfileHeaderProps {
  isOwnProfile: boolean;
  user: {
    id: string;
    name: string;
    username: string;
    image?: string | null;
    bio?: string | null;
    _count: {
      posts: number;
      followers: number;
      following: number;
    };
    isFollowing?: boolean;
  };
}

export default function ProfileHeader({
  user,
  isOwnProfile,
}: ProfileHeaderProps) {
  const { followUserMutation, loading } = useFollowUser();

  const handleFollowAction = () => {
    followUserMutation(user.id);
  };

  return (
    <div className="p-6 border-gray-800 border-b">
      {/* Profile Info */}
      <div className="flex sm:flex-row flex-col items-start sm:items-center gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Image
            alt={`${user.name}'s avatar`}
            className="border-4 border-gray-700 rounded-full"
            height={100}
            priority
            src={user.image || "/assets/avatar-placeholder.png"}
            width={100}
          />
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          {/* Name and Username */}
          <div className="mb-2">
            <h1 className="font-bold text-white text-2xl truncate">
              {user.name}
            </h1>
            <p className="text-gray-400">@{user.username}</p>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="mb-4 text-gray-300 whitespace-pre-wrap">{user.bio}</p>
          )}

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <span className="font-bold text-white">{user._count.posts}</span>
              <p className="text-gray-400">Bài viết</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-white">
                {user._count.followers}
              </span>
              <p className="text-gray-400">Người theo dõi</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-white">
                {user._count.following}
              </span>
              <p className="text-gray-400">Đang theo dõi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6">
        {isOwnProfile ? (
          <button
            className="hover:bg-gray-800 px-4 py-2 border border-gray-600 rounded-md w-full sm:w-auto text-gray-300"
            type="button"
          >
            Chỉnh sửa hồ sơ
          </button>
        ) : (
          <button
            className={`px-4 py-2 rounded-md w-full sm:w-auto ${
              user.isFollowing
                ? "border border-gray-600 hover:bg-gray-800 text-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={loading}
            onClick={handleFollowAction}
            type="button"
          >
            {loading
              ? "Đang tải..."
              : user.isFollowing
                ? "Bỏ theo dõi"
                : "Theo dõi"}
          </button>
        )}
      </div>
    </div>
  );
}
