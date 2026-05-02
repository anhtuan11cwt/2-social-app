"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "@/services/follow";

interface UserWithFollowing {
  bio?: string;
  email: string;
  id: string;
  image?: string;
  isFollowing?: boolean;
  name: string;
  username: string;
}

interface FollowMutationContext {
  previousUsers: UserWithFollowing[] | undefined;
}

export function useFollowUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation<string, unknown, string, FollowMutationContext>({
    mutationFn: (userId: string) => followUser(userId),

    onError: (_err, _userId, context) => {
      // Rollback khi có lỗi
      if (context?.previousUsers) {
        queryClient.setQueryData(["follow-suggestions"], context.previousUsers);
      }
    },

    onMutate: async (userId) => {
      // Hủy các query đang thực hiện
      await queryClient.cancelQueries({ queryKey: ["follow-suggestions"] });

      // Lưu dữ liệu trước đó
      const previousUsers = queryClient.getQueryData(["follow-suggestions"]) as
        | UserWithFollowing[]
        | undefined;

      // Cập nhật UI một cách lạc quan
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

      return { previousUsers };
    },

    onSuccess: () => {
      // làm mới gợi ý người dùng
      queryClient.invalidateQueries({
        queryKey: ["follow-suggestions"],
      });

      // nếu có trang profile
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
    },
  });

  return {
    followUserMutation: mutation.mutate,
    loading: mutation.isPending,
  };
}
