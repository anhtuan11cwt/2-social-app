import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import CreatePostInput from "@/components/post/CreatePostInput";
import PostFeed from "@/components/post/PostFeed";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6 min-h-screen">
      <CreatePostInput />
      <PostFeed />
    </div>
  );
}
