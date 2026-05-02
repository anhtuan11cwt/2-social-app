import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const session = await auth();
    const { userId } = await params;

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Chưa được xác thực" },
        { status: 401 },
      );
    }

    const followerId = session.user.id;
    const followingId = userId;

    // Không cho follow chính mình
    if (followerId === followingId) {
      return NextResponse.json(
        { error: "Bạn không thể theo dõi chính mình" },
        { status: 400 },
      );
    }

    // Kiểm tra người dùng cần follow có tồn tại không
    const targetUser = await prisma.user.findUnique({
      select: { id: true },
      where: { id: followingId },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Người dùng không tồn tại" },
        { status: 404 },
      );
    }

    // Kiểm tra đã follow chưa
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
    });

    // Nếu đã follow → UNFOLLOW
    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });

      return NextResponse.json({ following: false }, { status: 200 });
    }

    // Nếu chưa follow → FOLLOW
    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    return NextResponse.json({ following: true }, { status: 200 });
  } catch (error) {
    console.error("Follow error:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
