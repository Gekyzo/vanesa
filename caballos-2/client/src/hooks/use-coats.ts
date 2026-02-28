import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useCoats() {
  return useQuery({
    queryKey: [api.coats.list.path],
    queryFn: async () => {
      const res = await fetch(api.coats.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch coats");
      return api.coats.list.responses[200].parse(await res.json());
    },
  });
}

export function useSimulateCoat() {
  return useMutation({
    mutationFn: async (data: { sireColor: string; damColor: string }) => {
      const res = await fetch(api.coats.simulate.path, {
        method: api.coats.simulate.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to simulate coat genetics");
      return api.coats.simulate.responses[200].parse(await res.json());
    },
  });
}
