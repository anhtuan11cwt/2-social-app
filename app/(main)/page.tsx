import { redirect } from "next/navigation";
import { auth } from "@/app/auth";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <div className="bg-dark-2 p-4 rounded-lg">
        <p className="text-gray-400">Tạo bài viết</p>
      </div>

      <div className="space-y-4">
        <div className="bg-dark-2 p-4 rounded-lg">
          <p className="text-gray-400">Bảng tin bài viết</p>
        </div>
      </div>
    </div>
  );
}
