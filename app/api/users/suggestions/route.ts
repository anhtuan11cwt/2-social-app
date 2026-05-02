import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Chưa được xác thực" },
        { status: 401 },
      );
    }

    const currentUserId = session.user.id;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        username: true,
      },
      take: 5,
      where: {
        id: {
          not: currentUserId,
        },
      },
    });

    console.log("🔍 Suggestions API - Raw users data:", users);

    // Query follows separately to ensure fresh data
    const follows = await prisma.follow.findMany({
      select: {
        followingId: true,
      },
      where: {
        followerId: currentUserId,
        followingId: {
          in: users.map((user) => user.id),
        },
      },
    });

    console.log("🔍 Suggestions API - Follow records:", follows);

    const followingIds = new Set(follows.map((f) => f.followingId));

    const usersWithFollowingStatus = users.map((user) => ({
      ...user,
      isFollowing: followingIds.has(user.id),
    }));

    return NextResponse.json(usersWithFollowingStatus);
  } catch (error) {
    console.error("User suggestions error:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
