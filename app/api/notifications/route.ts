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

    const notifications = await prisma.notification.findMany({
      include: {
        user: {
          select: {
            image: true,
            name: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("GET_NOTIFICATIONS_ERROR:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}

export async function PUT() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Chưa được xác thực" },
        { status: 401 },
      );
    }

    await prisma.notification.updateMany({
      data: {
        read: true,
      },
      where: {
        read: false,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MARK_NOTIFICATIONS_READ_ERROR:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
