import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { pusher } from "@/lib/pusher";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Chưa xác thực" }, { status: 401 });
    }

    const { content, postId } = await request.json();

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Nội dung là bắt buộc" },
        { status: 400 },
      );
    }

    if (!postId) {
      return NextResponse.json(
        { error: "PostId là bắt buộc" },
        { status: 400 },
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Không tìm thấy bài đăng" },
        { status: 404 },
      );
    }

    const comment = await prisma.comment.create({
      data: {
        authorId: session.user.id,
        content: content.trim(),
        postId,
      },
      include: {
        author: {
          select: {
            bio: true,
            email: true,
            id: true,
            image: true,
            name: true,
            username: true,
          },
        },
      },
    });

    // Send notification to post author (only if not commenting on own post)
    if (post.authorId !== session.user.id) {
      const notification = await prisma.notification.create({
        data: {
          message: "Có người đã bình luận về bài đăng của bạn",
          postId,
          type: "COMMENT",
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

    return NextResponse.json(
      {
        comment,
        postAuthorId: post.authorId,
        success: true,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE_COMMENT_ERROR:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
