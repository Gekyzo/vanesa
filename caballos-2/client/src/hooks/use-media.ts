import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useMediaEntries() {
  return useQuery({
    queryKey: [api.media.list.path],
    queryFn: async () => {
      const res = await fetch(api.media.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch media entries");
      return api.media.list.responses[200].parse(await res.json());
    },
  });
}
