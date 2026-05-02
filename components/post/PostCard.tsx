"use client";

import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CommentInput, CommentList } from "@/components/comment";
import type { Post } from "@/types/post";
import LikeButton from "./LikeButton";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <article className="hover:bg-gray-900/50 p-4 border-gray-800 border-b transition-colors">
      <Link className="block" href={`/posts/${post.id}`}>
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              alt={post.author?.name || "Người dùng"}
              className="rounded-full object-cover"
              fill
              src={post.author?.image || "/assets/profile-pic.png"}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-white truncate">
                {post.author?.name}
              </span>
              <span className="text-gray-500 text-sm truncate">
                @{post.author?.username}
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-500 text-sm">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                  locale: vi,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-2 pl-13">
          <p className="text-white whitespace-pre-wrap">{post.content}</p>

          {/* Image */}
          {post.image && (
            <div className="relative mt-3 rounded-xl w-full max-h-[500px] aspect-video overflow-hidden">
              <Image
                alt="Ảnh bài đăng"
                className="object-cover"
                fill
                sizes="(max-width: 600px) 100vw, 500px"
                src={post.image}
              />
            </div>
          )}
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-6 mt-3 pl-13">
        <LikeButton
          initialLiked={post.isLiked ?? false}
          initialLikesCount={post._count?.likes ?? post.likes?.length ?? 0}
          postId={post.id}
        />

        <button
          className="group flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
          onClick={() => setShowComments(!showComments)}
          type="button"
        >
          <MessageCircle
            aria-hidden="true"
            className="w-5 h-5 group-hover:scale-110 transition-transform"
          />
          <span className="text-sm">
            {(post._count?.comments ?? 0) || (post.comments?.length ?? 0)}
          </span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-3 border-gray-800 border-t">
          <CommentList postId={post.id} />
          <CommentInput postId={post.id} />
        </div>
      )}
    </article>
  );
}
