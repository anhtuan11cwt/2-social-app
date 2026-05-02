"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCreatePost } from "@/hooks/useCreatePost";

export default function CreatePostInput() {
  const { data: session } = useSession();
  const { mutate, isPending } = useCreatePost();

  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | undefined>();

  const handleSubmit = () => {
    if (!content.trim()) return;

    mutate(
      { content, image },
      {
        onSuccess: () => {
          setContent("");
          setImage(undefined);
        },
      },
    );
  };

  const isDisabled = !content.trim() || isPending;

  return (
    <div className="space-y-3 bg-dark-2 p-4 border border-dark-4 rounded-xl">
      <div className="flex items-start gap-3">
        {session?.user?.image ? (
          <Image
            alt="ảnh đại diện"
            className="rounded-full object-cover"
            height={40}
            src={session.user.image}
            width={40}
          />
        ) : (
          <div className="flex justify-center items-center bg-dark-3 rounded-full w-10 h-10">
            <span className="text-gray-400 text-sm">?</span>
          </div>
        )}

        <textarea
          className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500 resize-none"
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bạn đang nghĩ gì?"
          rows={3}
          value={content}
        />
      </div>

      <div className="flex justify-between items-center pt-2 border-dark-4 border-t">
        <button
          className="text-gray-400 hover:text-white text-sm transition"
          type="button"
        >
          📷 Ảnh
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-1.5 rounded-full font-medium text-white text-sm transition disabled:cursor-not-allowed"
          disabled={isDisabled}
          onClick={handleSubmit}
          type="button"
        >
          {isPending ? "Đang đăng..." : "Đăng"}
        </button>
      </div>
    </div>
  );
}
