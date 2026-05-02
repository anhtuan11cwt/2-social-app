import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { postId } = await params;

    const comments = await prisma.comment.findMany({
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
      orderBy: { createdAt: "desc" },
      where: { postId },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("GET_COMMENTS_ERROR:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
