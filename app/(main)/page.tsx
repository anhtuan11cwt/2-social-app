import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import CreatePostInput from "@/components/post/CreatePostInput";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <CreatePostInput />

      <div className="space-y-4">
        <div className="bg-dark-2 p-4 rounded-lg">
          <p className="text-gray-400">Bảng tin bài viết</p>
        </div>
      </div>
    </div>
  );
}
