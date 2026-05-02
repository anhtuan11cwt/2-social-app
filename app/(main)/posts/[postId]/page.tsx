"use client";

import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import CommentInput from "@/components/comment/CommentInput";
import CommentList from "@/components/comment/CommentList";
import LikeButton from "@/components/post/LikeButton";
import { useGetPost } from "@/hooks/useGetPost";

export default function PostPage() {
  const params = useParams();
  const postId = params.postId as string;

  const { data: post, isLoading, isError } = useGetPost(postId);

  // Loading
  if (isLoading) {
    return (
      <div className="space-y-6 mx-auto p-4 max-w-xl">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="bg-gray-700 rounded-full w-10 h-10" />
          <div className="space-y-2">
            <div className="bg-gray-700 rounded w-32 h-4" />
            <div className="bg-gray-700 rounded w-24 h-3" />
          </div>
        </div>
        <div className="space-y-3 animate-pulse">
          <div className="bg-gray-700 rounded w-full h-4" />
          <div className="bg-gray-700 rounded w-3/4 h-4" />
          <div className="bg-gray-700 rounded w-full h-64" />
        </div>
      </div>
    );
  }

  // Error / Not found
  if (isError || !post) {
    return (
      <div className="mx-auto p-4 max-w-xl">
        <div className="py-12 text-center">
          <h1 className="mb-2 font-bold text-white text-2xl">
            Bài viết không tồn tại
          </h1>
          <p className="mb-6 text-gray-500">
            Bài viết này có thể đã bị xóa hoặc đường dẫn không chính xác.
          </p>
          <Link
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
            href="/"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Back button */}
      <div className="top-0 z-10 sticky bg-black/80 backdrop-blur-sm -m-4 mb-4 p-4">
        <Link
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          href="/"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
      </div>

      <div className="space-y-6 p-4">
        {/* Author */}
        <div className="flex items-start gap-3">
          <div className="relative w-12 h-12 shrink-0">
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
        <div className="pl-15">
          <p className="text-white text-lg whitespace-pre-wrap">
            {post.content}
          </p>

          {/* Image */}
          {post.image && (
            <div className="relative mt-4 rounded-xl w-full max-h-[600px] aspect-auto overflow-hidden">
              <Image
                alt="Ảnh bài đăng"
                className="object-cover"
                fill
                sizes="(max-width: 600px) 100vw, 600px"
                src={post.image}
              />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 pl-15 text-gray-500 text-sm">
          <span>{post._count?.likes || 0} lượt thích</span>
          <span>{post._count?.comments || 0} bình luận</span>
        </div>

        {/* Like Button */}
        <div className="pl-15">
          <LikeButton
            initialLiked={post.isLiked ?? false}
            initialLikesCount={post._count?.likes ?? 0}
            postId={post.id}
          />
        </div>

        {/* Divider */}
        <div className="border-gray-800 border-t" />

        {/* Comment Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white text-lg">Bình luận</h3>

          <CommentInput postId={postId} />
          <CommentList postId={postId} />
        </div>
      </div>
    </div>
  );
}
