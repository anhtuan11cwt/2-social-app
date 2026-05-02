import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";

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
