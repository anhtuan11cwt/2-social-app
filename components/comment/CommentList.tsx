"use client";

import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { useGetComments } from "@/hooks/useGetComments";

interface CommentListProps {
  postId: string;
}

export default function CommentList({ postId }: CommentListProps) {
  const { data, isLoading } = useGetComments(postId);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div className="flex gap-3 animate-pulse" key={i}>
            <div className="bg-gray-700 rounded-full w-8 h-8" />
            <div className="flex-1 space-y-2">
              <div className="bg-gray-700 rounded w-24 h-4" />
              <div className="bg-gray-700 rounded w-full h-8" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center text-sm">
        Chưa có bình luận nào
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-800">
      {data.map((comment) => (
        <div
          className="flex gap-3 hover:bg-gray-900/30 p-4 transition-colors"
          key={comment.id}
        >
          <Link
            className="relative w-8 h-8 shrink-0"
            href={`/profile/${comment.author.username}`}
          >
            {comment.author?.image ? (
              <Image
                alt={comment.author.name}
                className="rounded-full object-cover"
                fill
                src={comment.author.image}
              />
            ) : (
              <div className="flex justify-center items-center bg-gray-700 rounded-full w-full h-full">
                <span className="text-gray-400 text-xs">?</span>
              </div>
            )}
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                className="font-semibold text-white text-sm hover:underline"
                href={`/profile/${comment.author.username}`}
              >
                {comment.author.name}
              </Link>
              <span className="text-gray-500 text-sm">
                @{comment.author.username}
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-500 text-xs">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: vi,
                })}
              </span>
            </div>

            <p className="mt-1 text-white text-sm whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
