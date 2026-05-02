import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { pusher } from "@/lib/pusher";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Chưa xác thực" }, { status: 401 });
    }

    const userId = session.user.id;
    const { postId } = await params;

    // Check post exists
    const post = await prisma.post.findUnique({
      select: { authorId: true },
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Không tìm thấy bài đăng" },
        { status: 404 },
      );
    }

    // Check if already liked
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    let liked = false;

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      liked = false;
    } else {
      // Like
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
      liked = true;

      // Send notification to post author (only if not liking own post)
      if (post.authorId !== userId) {
        const notification = await prisma.notification.create({
          data: {
            message: "Có người đã thích bài đăng của bạn",
            postId,
            type: "LIKE",
            userId: post.authorId,
          },
        });

        // Trigger real-time notification via Pusher
        await pusher.trigger(
          `notifications-${post.authorId}`,
          "new-notification",
          notification,
        );
      }
    }

    return NextResponse.json(
      {
        liked,
        postAuthorId: post.authorId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("LIKE_POST_ERROR:", error);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
