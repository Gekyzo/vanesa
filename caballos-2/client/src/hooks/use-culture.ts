import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useCultureArticles() {
  return useQuery({
    queryKey: [api.culture.list.path],
    queryFn: async () => {
      const res = await fetch(api.culture.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch culture articles");
      return api.culture.list.responses[200].parse(await res.json());
    },
  });
}
