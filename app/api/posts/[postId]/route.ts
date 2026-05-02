import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const session = await auth();

    // Check login
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const { postId } = await params;

    // Validate postId
    if (!postId) {
      return NextResponse.json(
        { error: "ID bài viết là bắt buộc" },
        { status: 400 },
      );
    }

    // Query post
    const post = await prisma.post.findUnique({
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        author: true,
        comments: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: true,
      },
      where: { id: postId },
    });

    // Not found
    if (!post) {
      return NextResponse.json(
        { error: "Không tìm thấy bài viết" },
        { status: 404 },
      );
    }

    // Add isLiked field for current user
    const postWithLikeStatus = {
      ...post,
      isLiked: post.likes.some((like) => like.userId === session.user.id),
    };

    // Return
    return NextResponse.json(postWithLikeStatus, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
