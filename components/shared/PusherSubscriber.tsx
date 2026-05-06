"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import { useEffect } from "react";

export default function PusherSubscriber() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!session?.user?.id) return;

    const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

    if (!(pusherKey && pusherCluster)) {
      console.warn("Thiếu biến môi trường client Pusher.");
      return;
    }

    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });

    const channel = pusher.subscribe(`notifications-${session.user.id}`);

    channel.bind("new-notification", () => {
      // Invalidate notifications query to refetch latest data
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    });

    // Cleanup function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [session?.user?.id, queryClient]);

  return null;
}
