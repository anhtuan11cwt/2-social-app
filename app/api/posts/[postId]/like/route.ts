import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";

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
