import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Không được phép" }, { status: 401 });
    }

    const body = await req.json();
    const { content, image } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Nội dung là bắt buộc" },
        { status: 400 },
      );
    }

    const post = await prisma.post.create({
      data: {
        authorId: session.user.id,
        content: content.trim(),
        image: image || null,
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        author: {
          select: {
            id: true,
            image: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("CREATE_POST_ERROR:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
