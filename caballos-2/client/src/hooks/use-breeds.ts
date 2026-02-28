import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useBreeds(filters?: { search?: string; isSpanish?: boolean; bloodType?: string }) {
  return useQuery({
    queryKey: [api.breeds.list.path, filters],
    queryFn: async () => {
      // Build query string manually or use URLSearchParams because api.breeds.list.input is optional
      const params = new URLSearchParams();
      if (filters?.search) params.append("search", filters.search);
      if (filters?.isSpanish !== undefined) params.append("isSpanish", String(filters.isSpanish));
      if (filters?.bloodType && filters.bloodType !== "all") params.append("bloodType", filters.bloodType);

      const url = `${api.breeds.list.path}?${params.toString()}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch breeds");
      return api.breeds.list.responses[200].parse(await res.json());
    },
  });
}

export function useBreed(id: number) {
  return useQuery({
    queryKey: [api.breeds.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.breeds.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch breed");
      return api.breeds.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
