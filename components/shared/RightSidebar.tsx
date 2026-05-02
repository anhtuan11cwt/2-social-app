import Image from "next/image";
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";

export default async function RightSidebar() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
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

  return (
    <div className="top-24 sticky space-y-4">
      <h2 className="font-semibold text-lg">Gợi ý theo dõi</h2>

      {users.length === 0 ? (
        <div className="bg-dark-2 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">
            Không có gợi ý người dùng ngay bây giờ
          </p>
          <p className="mt-1 text-gray-500 text-xs">Bạn đã xem hết tất cả</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              className="flex justify-between items-center bg-dark-2 p-3 rounded-lg"
              key={user.id}
            >
              <div className="flex items-center gap-3">
                {user.image ? (
                  <Image
                    alt={user.name || "user"}
                    className="rounded-full object-cover"
                    height={40}
                    src={user.image}
                    width={40}
                  />
                ) : (
                  <div className="flex justify-center items-center bg-dark-3 rounded-full w-10 h-10">
                    <span className="text-sm">?</span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-gray-400 text-sm">@{user.username}</p>
                </div>
              </div>

              <button
                className="bg-primary hover:bg-primary-hover px-3 py-1.5 rounded text-sm transition"
                type="button"
              >
                Theo dõi
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
