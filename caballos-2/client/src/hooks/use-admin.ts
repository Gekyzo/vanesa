import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Coat, InsertCoat, CoatCategory, InsertCoatCategory } from "@shared/schema";
import { api } from "@shared/routes";

// Coat Categories Hooks
export function useCoatCategories() {
  return useQuery<CoatCategory[]>({
    queryKey: [api.admin.coatCategories.list.path],
    queryFn: async () => {
      const response = await fetch(api.admin.coatCategories.list.path);
      if (!response.ok) throw new Error("Failed to fetch coat categories");
      return response.json();
    },
  });
}

export function useCreateCoatCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: InsertCoatCategory) => {
      const response = await fetch(api.admin.coatCategories.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!response.ok) throw new Error("Failed to create category");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.coatCategories.list.path] });
    },
  });
}

export function useUpdateCoatCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, category }: { id: number; category: InsertCoatCategory }) => {
      const response = await fetch(api.admin.coatCategories.update.path.replace(":id", String(id)), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!response.ok) throw new Error("Failed to update category");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.coatCategories.list.path] });
    },
  });
}

export function useDeleteCoatCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(api.admin.coatCategories.delete.path.replace(":id", String(id)), {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete category");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.coatCategories.list.path] });
    },
  });
}

// Admin Coats Hooks
export function useAdminCoats(categoryId?: number) {
  const url = categoryId
    ? `${api.admin.coats.list.path}?categoryId=${categoryId}`
    : api.admin.coats.list.path;

  return useQuery<Coat[]>({
    queryKey: [api.admin.coats.list.path, categoryId],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch coats");
      return response.json();
    },
  });
}

export function useAdminCoat(id: number) {
  return useQuery<Coat>({
    queryKey: [api.admin.coats.get.path, id],
    queryFn: async () => {
      const response = await fetch(api.admin.coats.get.path.replace(":id", String(id)));
      if (!response.ok) throw new Error("Failed to fetch coat");
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateCoat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (coat: InsertCoat) => {
      const response = await fetch(api.admin.coats.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coat),
      });
      if (!response.ok) throw new Error("Failed to create coat");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.coats.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.coats.list.path] });
    },
  });
}

export function useUpdateCoat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, coat }: { id: number; coat: InsertCoat }) => {
      const response = await fetch(api.admin.coats.update.path.replace(":id", String(id)), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coat),
      });
      if (!response.ok) throw new Error("Failed to update coat");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.coats.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.coats.list.path] });
    },
  });
}

export function useDeleteCoat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(api.admin.coats.delete.path.replace(":id", String(id)), {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete coat");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.coats.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.coats.list.path] });
    },
  });
}
