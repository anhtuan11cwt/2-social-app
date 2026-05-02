"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useLikePost } from "@/hooks/useLikePost";

interface LikeButtonProps {
  initialLiked: boolean;
  initialLikesCount: number;
  postId: string;
}

export default function LikeButton({
  postId,
  initialLiked,
  initialLikesCount,
}: LikeButtonProps) {
  const { mutate, isPending } = useLikePost();

  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const handleLike = () => {
    if (isPending) return;

    // Optimistic update
    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));

    mutate(postId, {
      onError: () => {
        // Rollback on error
        setLiked(liked);
        setLikesCount(initialLikesCount);
      },
    });
  };

  const heartClass = liked
    ? "w-5 h-5 transition-transform active:scale-90 fill-red-500 text-red-500"
    : "w-5 h-5 transition-transform active:scale-90 text-gray-500 group-hover:text-red-400";

  const countClass = liked ? "text-sm text-red-500" : "text-sm text-gray-500";

  return (
    <button
      className="group flex items-center gap-2 disabled:opacity-50"
      disabled={isPending}
      onClick={handleLike}
      type="button"
    >
      <Heart className={heartClass} />
      <span className={countClass}>{likesCount}</span>
    </button>
  );
}
