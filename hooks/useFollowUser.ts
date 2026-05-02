"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "@/services/follow";

interface UserWithFollowing {
  _count?: {
    followers: number;
    following: number;
    posts: number;
  };
  bio?: string;
  email: string;
  id: string;
  image?: string;
  isFollowing?: boolean;
  name: string;
  username: string;
}

interface FollowMutationContext {
  previousUser?: UserWithFollowing | undefined;
  previousUsers: UserWithFollowing[] | undefined;
}

export function useFollowUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation<string, unknown, string, FollowMutationContext>({
    mutationFn: (userId: string) => followUser(userId),

    onError: (_err, userId, context) => {
      // Rollback khi có lỗi
      if (context?.previousUsers) {
        queryClient.setQueryData(["follow-suggestions"], context.previousUsers);
      }
      if (context?.previousUser) {
        queryClient.setQueryData(["user", userId], context.previousUser);
      }
    },

    onMutate: async (userId) => {
      // Hủy các query đang thực hiện
      await queryClient.cancelQueries({ queryKey: ["follow-suggestions"] });
      await queryClient.cancelQueries({ queryKey: ["user", userId] });

      // Lưu dữ liệu trước đó
      const previousUsers = queryClient.getQueryData(["follow-suggestions"]) as
        | UserWithFollowing[]
        | undefined;
      const previousUser = queryClient.getQueryData(["user", userId]) as
        | UserWithFollowing
        | undefined;

      // Cập nhật UI một cách lạc quan cho follow suggestions
      queryClient.setQueryData(
        ["follow-suggestions"],
        (old: UserWithFollowing[] | undefined) => {
          if (!Array.isArray(old)) return old;

          // Tìm người dùng hiện tại để xác định trạng thái hiện tại
          const currentUser = old.find((user) => user.id === userId);
          const isCurrentlyFollowing = currentUser?.isFollowing || false;

          // Chuyển đổi dựa trên trạng thái hiện tại
          const updated = old.map((user) =>
            user.id === userId
              ? { ...user, isFollowing: !isCurrentlyFollowing }
              : user,
          );

          return updated;
        },
      );

      // Cập nhật UI một cách lạc quan cho user profile
      queryClient.setQueryData(
        ["user", userId],
        (old: UserWithFollowing | undefined) => {
          if (!old) return old;

          const isCurrentlyFollowing = old.isFollowing || false;
          const followerCount = old._count?.followers || 0;

          return {
            ...old,
            _count: {
              ...old._count,
              followers: isCurrentlyFollowing
                ? followerCount - 1
                : followerCount + 1,
            },
            isFollowing: !isCurrentlyFollowing,
          };
        },
      );

      return { previousUser, previousUsers };
    },

    onSuccess: () => {
      // Không cần invalidate queries vì optimistic updates đã xử lý đúng
      // Chỉ invalidate follow suggestions để cập nhật danh sách gợi ý
      queryClient.invalidateQueries({
        queryKey: ["follow-suggestions"],
      });
    },
  });

  return {
    followUserMutation: mutation.mutate,
    loading: mutation.isPending,
  };
}
