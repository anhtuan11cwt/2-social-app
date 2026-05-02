import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "ID người dùng là bắt buộc" },
        { status: 400 },
      );
    }

    const session = await auth();
    const currentUserId = session?.user?.id;

    // Get user profile with counts
    const user = await prisma.user.findUnique({
      select: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
        bio: true,
        createdAt: true,
        email: true,
        id: true,
        image: true,
        name: true,
        updatedAt: true,
        username: true,
      },
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 },
      );
    }

    // Check if current user is following this user
    let isFollowing = false;

    if (currentUserId && currentUserId !== userId) {
      const follow = await prisma.follow.findFirst({
        where: {
          followerId: currentUserId,
          followingId: userId,
        },
      });

      isFollowing = !!follow;
    }

    // Remove password from response
    return NextResponse.json({
      ...user,
      isFollowing,
    });
  } catch {
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
