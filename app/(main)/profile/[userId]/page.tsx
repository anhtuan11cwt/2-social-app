"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import UserPosts from "@/components/profile/UserPosts";
import { useGetUser } from "@/hooks/useGetUser";

export default function ProfilePage() {
  const params = useParams();
  const { data: session } = useSession();
  const userId = params.userId as string;

  const { data: user, isLoading, error } = useGetUser(userId);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !user) {
    return (
      <div className="mx-auto p-4 max-w-2xl">
        <h1 className="font-bold text-white text-2xl text-center">
          Không tìm thấy người dùng
        </h1>
      </div>
    );
  }

  const isOwnProfile = session?.user?.id === user.id;

  return (
    <div className="mx-auto max-w-2xl">
      <ProfileHeader isOwnProfile={isOwnProfile} user={user} />
      <UserPosts userId={user.id} />
    </div>
  );
}
