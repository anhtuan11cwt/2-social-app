"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface Notification {
  createdAt: string;
  id: string;
  message: string;
  postId?: string;
  read: boolean;
  type: string;
  user: {
    name: string;
    username: string;
    image?: string;
  };
}

const skeletonIds = ["first", "second", "third"];

export default function NotificationsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const res = await axios.get("/api/notifications");
      return res.data as Notification[];
    },
    queryKey: ["notifications"],
  });

  useEffect(() => {
    const markNotificationsAsRead = async () => {
      try {
        await axios.put("/api/notifications");
        // Refetch notifications để cập nhật navbar
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      } catch (error) {
        console.error("Lỗi khi đánh dấu thông báo đã đọc:", error);
      }
    };

    markNotificationsAsRead();
  }, [queryClient]);

  if (isLoading) {
    return (
      <div className="bg-dark-1 p-6 min-h-screen text-white">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 font-bold text-2xl">Thông báo</h1>
          <div className="space-y-4">
            {skeletonIds.map((skeletonId) => (
              <div
                className="bg-dark-2 p-4 rounded-lg animate-pulse"
                key={skeletonId}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-600 rounded-full w-10 h-10" />
                  <div className="flex-1">
                    <div className="bg-gray-600 mb-2 rounded w-3/4 h-4" />
                    <div className="bg-gray-600 rounded w-1/2 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-dark-1 p-6 min-h-screen text-white">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 font-bold text-2xl">Thông báo</h1>
          <div className="bg-red-500/20 p-4 border border-red-500 rounded-lg">
            <p className="text-red-200">Lỗi tải thông báo</p>
          </div>
        </div>
      </div>
    );
  }

  const notifications = data || [];

  return (
    <div className="bg-dark-1 p-6 min-h-screen text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 font-bold text-2xl">Thông báo</h1>

        {notifications.length === 0 ? (
          <div className="bg-dark-2 p-8 rounded-lg text-center">
            <p className="text-gray-400">Chưa có thông báo nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                className={`bg-dark-2 rounded-lg p-4 hover:bg-dark-3 transition-colors ${
                  !notification.read ? "border-l-4 border-blue-500" : ""
                }`}
                key={notification.id}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    {notification.user.image ? (
                      <Image
                        alt={notification.user.name}
                        className="rounded-full w-10 h-10 object-cover"
                        height={40}
                        src={notification.user.image}
                        width={40}
                      />
                    ) : (
                      <div className="flex justify-center items-center bg-gray-600 rounded-full w-10 h-10">
                        <span className="font-medium text-sm">
                          {notification.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-white">
                        {notification.user.name}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {notification.type === "LIKE"
                          ? "❤️ đã thích"
                          : "💬 đã bình luận về"}{" "}
                        bài đăng của bạn
                      </span>
                    </div>

                    <p className="mb-2 text-gray-300 text-sm">
                      {notification.message}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs">
                        {new Date(notification.createdAt).toLocaleDateString()}{" "}
                        •{" "}
                        {new Date(notification.createdAt).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>

                      {notification.postId && (
                        <Link
                          className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
                          href={`/posts/${notification.postId}`}
                        >
                          Xem bài đăng →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
