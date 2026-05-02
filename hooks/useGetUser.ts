import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetUser(userId: string) {
  return useQuery({
    enabled: !!userId,
    queryFn: async () => {
      const { data } = await axios.get(`/api/users/${userId}`);
      return data;
    },
    queryKey: ["user", userId],
  });
}
