"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useCreatePost } from "@/hooks/useCreatePost";

export default function CreatePostInput() {
  const { data: session } = useSession();
  const { mutate, isPending } = useCreatePost();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value to allow selecting the same file again
    e.target.value = "";

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        body: formData,
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Tải lên thất bại");
      }

      setImage(data.url);
    } catch (error) {
      console.error("Tải lên thất bại:", error);
      // You could add toast notification here
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    if (!content.trim()) return;

    mutate(
      { content, image: image || undefined },
      {
        onSuccess: () => {
          setContent("");
          setImage(null);
        },
      },
    );
  };

  const isDisabled = (!content.trim() && !image) || isPending || isUploading;

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

        <div className="flex-1">
          <textarea
            className="bg-transparent outline-none w-full text-white placeholder:text-gray-500 resize-none"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Bạn đang nghĩ gì?"
            rows={3}
            value={content}
          />

          {/* Image Preview */}
          {image && (
            <div className="inline-block relative mt-2">
              <Image
                alt="Xem trước"
                className="rounded-lg max-h-60 object-cover"
                height={200}
                src={image}
                width={300}
              />
              <button
                className="top-2 right-2 absolute bg-black bg-opacity-60 hover:bg-opacity-80 p-1 rounded-full text-white transition"
                onClick={handleRemoveImage}
                type="button"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-dark-4 border-t">
        <div className="flex items-center gap-2">
          <input
            accept="image/*"
            className="hidden"
            disabled={isUploading}
            onChange={handleImageUpload}
            ref={fileInputRef}
            type="file"
          />
          <button
            className="disabled:opacity-50 text-gray-400 hover:text-white text-sm transition"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            {isUploading ? "Đang tải lên..." : "📷 Ảnh"}
          </button>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-1.5 rounded-full font-medium text-white text-sm transition disabled:cursor-not-allowed"
          disabled={isDisabled}
          onClick={handleSubmit}
          type="button"
        >
          {isPending
            ? "Đang đăng..."
            : isUploading
              ? "Đang tải ảnh..."
              : "Đăng"}
        </button>
      </div>
    </div>
  );
}
