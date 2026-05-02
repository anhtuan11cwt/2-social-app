"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCreateComment } from "@/hooks/useCreateComment";

interface CommentInputProps {
  postId: string;
}

export default function CommentInput({ postId }: CommentInputProps) {
  const { data: session, status } = useSession();
  const { mutate, isPending } = useCreateComment(postId);

  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;

    mutate(
      { content, postId },
      {
        onSuccess: () => {
          setContent("");
        },
      },
    );
  };

  const isDisabled = !content.trim() || isPending;

  if (status === "loading") {
    return (
      <div className="flex gap-3 p-4 animate-pulse">
        <div className="bg-gray-700 rounded-full w-10 h-10" />
        <div className="flex-1">
          <div className="bg-gray-700 rounded h-20" />
        </div>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="p-4 text-gray-500 text-center text-sm">
        Đăng nhập để bình luận
      </div>
    );
  }

  return (
    <div className="flex gap-3 p-4">
      <div className="relative w-10 h-10 shrink-0">
        {session?.user?.image ? (
          <Image
            alt="ảnh đại diện"
            className="rounded-full object-cover"
            fill
            src={session.user.image}
          />
        ) : (
          <div className="flex justify-center items-center bg-gray-700 rounded-full w-full h-full">
            <span className="text-gray-400 text-sm">?</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <textarea
          className="bg-transparent p-2 border border-gray-700 rounded-lg w-full min-h-[80px] text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-blue-500"
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Viết bình luận..."
          value={content}
        />

        <div className="flex justify-end mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-1.5 rounded-full font-medium text-white text-sm transition disabled:cursor-not-allowed"
            disabled={isDisabled}
            onClick={handleSubmit}
            type="button"
          >
            {isPending ? "Đang đăng..." : "Bình luận"}
          </button>
        </div>
      </div>
    </div>
  );
}
