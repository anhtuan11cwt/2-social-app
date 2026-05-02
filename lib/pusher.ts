import Pusher from "pusher";

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const pusher = new Pusher({
  appId: requireEnv("PUSHER_APP_ID"),
  cluster: requireEnv("PUSHER_CLUSTER"),
  key: requireEnv("NEXT_PUBLIC_PUSHER_KEY"),
  secret: requireEnv("PUSHER_SECRET"),
  useTLS: true,
});

if (process.env.NODE_ENV === "development") {
  console.log(
    "Pusher đã được khởi tạo với cluster:",
    process.env.PUSHER_CLUSTER,
  );
}
