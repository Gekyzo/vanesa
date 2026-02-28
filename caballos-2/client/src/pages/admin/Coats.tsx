import AdminLayout from "@/components/admin/AdminLayout";
import {
  useAdminCoats,
  useCoatCategories,
  useDeleteCoat,
} from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Image as ImageIcon, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CoatFormDialog } from "@/components/admin/CoatFormDialog";
import type { Coat } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AdminCoats() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>();
  const { data: coats, isLoading } = useAdminCoats(selectedCategoryId);
  const { data: categories } = useCoatCategories();
  const deleteCoat = useDeleteCoat();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoat, setEditingCoat] = useState<Coat | null>(null);

  const resetSeedMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/admin/coats/reset-seed', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to reset coats');
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/coats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/coat-categories'] });
      toast({
        title: "Success!",
        description: `Reset complete: ${data.categoriesCreated} categories and ${data.coatsCreated} coats created`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to reset coat data",
        variant: "destructive",
      });
    },
  });

  const handleResetAndSeed = async () => {
    if (!confirm(
      "⚠️ This will DELETE all existing coats and categories, then seed 29 comprehensive coats with full genetic data.\n\nAre you sure you want to proceed?"
    )) return;

    resetSeedMutation.mutate();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this coat?")) return;
    try {
      await deleteCoat.mutateAsync(id);
      toast({ title: "Coat deleted successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete coat",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (coat: Coat) => {
    setEditingCoat(coat);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingCoat(null);
    setDialogOpen(true);
  };

  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return "Uncategorized";
    const category = categories?.find((c) => c.id === categoryId);
    return category?.name || "Unknown";
  };

  const getDominanceBadgeVariant = (dominance: string | null) => {
    switch (dominance) {
      case "dominant":
        return "default";
      case "recessive":
        return "secondary";
      case "co-dominant":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Manage Horse Coats</h2>
          <p className="text-gray-600 mt-2">
            Create and edit horse coat information including genetics and phenotypes
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-64">
            <Select
              value={selectedCategoryId?.toString() || "all"}
              onValueChange={(value) =>
                setSelectedCategoryId(value === "all" ? undefined : Number(value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleResetAndSeed}
              disabled={resetSeedMutation.isPending}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${resetSeedMutation.isPending ? 'animate-spin' : ''}`} />
              {resetSeedMutation.isPending ? 'Resetting...' : 'Reset & Seed Data'}
            </Button>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Add Coat
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Images</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Genotype</TableHead>
                <TableHead>Dominance</TableHead>
                <TableHead className="w-32">Order</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : coats && coats.length > 0 ? (
                coats.map((coat) => (
                  <TableRow key={coat.id}>
                    <TableCell>
                      <div className="flex gap-1">
                        {coat.imageUrl && (
                          <div className="w-10 h-10 rounded overflow-hidden bg-muted">
                            <img
                              src={coat.imageUrl}
                              alt={coat.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        {coat.phenotypeImageUrl && (
                          <div className="w-10 h-10 rounded overflow-hidden bg-muted">
                            <img
                              src={coat.phenotypeImageUrl}
                              alt={`${coat.name} phenotype`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        {!coat.imageUrl && !coat.phenotypeImageUrl && (
                          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{coat.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{getCategoryName(coat.categoryId)}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {coat.genotype || coat.geneticBase || "—"}
                    </TableCell>
                    <TableCell>
                      {coat.geneDominance ? (
                        <Badge variant={getDominanceBadgeVariant(coat.geneDominance)}>
                          {coat.geneDominance}
                        </Badge>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>{coat.displayOrder}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(coat)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(coat.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No coats found. Create your first coat.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <CoatFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          editingCoat={editingCoat}
          categories={categories || []}
        />
      </div>
    </AdminLayout>
  );
}
