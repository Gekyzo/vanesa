import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useCreateCoat, useUpdateCoat } from "@/hooks/use-admin";
import { useToast } from "@/hooks/use-toast";
import type { Coat, CoatCategory, InsertCoat } from "@shared/schema";

interface CoatFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCoat: Coat | null;
  categories: CoatCategory[];
}

export function CoatFormDialog({
  open,
  onOpenChange,
  editingCoat,
  categories,
}: CoatFormDialogProps) {
  const createCoat = useCreateCoat();
  const updateCoat = useUpdateCoat();
  const { toast } = useToast();

  const [formData, setFormData] = useState<InsertCoat>({
    name: "",
    description: "",
    imageUrl: "",
    phenotypeImageUrl: "",
    geneticBase: "",
    genotype: "",
    geneDominance: "",
    categoryId: undefined,
    displayOrder: 0,
  });

  useEffect(() => {
    if (editingCoat) {
      setFormData({
        name: editingCoat.name,
        description: editingCoat.description,
        imageUrl: editingCoat.imageUrl,
        phenotypeImageUrl: editingCoat.phenotypeImageUrl || "",
        geneticBase: editingCoat.geneticBase || "",
        genotype: editingCoat.genotype || "",
        geneDominance: editingCoat.geneDominance || "",
        categoryId: editingCoat.categoryId || undefined,
        displayOrder: editingCoat.displayOrder,
      });
    } else {
      resetForm();
    }
  }, [editingCoat, open]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      phenotypeImageUrl: "",
      geneticBase: "",
      genotype: "",
      geneDominance: "",
      categoryId: undefined,
      displayOrder: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCoat) {
        await updateCoat.mutateAsync({ id: editingCoat.id, coat: formData });
        toast({ title: "Coat updated successfully" });
      } else {
        await createCoat.mutateAsync(formData);
        toast({ title: "Coat created successfully" });
      }
      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save coat",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingCoat ? "Edit Coat" : "Create Coat"}</DialogTitle>
          <DialogDescription>
            {editingCoat ? "Update coat details" : "Add a new horse coat"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.categoryId?.toString() || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, categoryId: value ? Number(value) : undefined })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order *</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData({ ...formData, displayOrder: Number(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="imageUrl">Coat Image URL *</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/coat-image.jpg"
                  required
                />
                {formData.imageUrl && (
                  <div className="mt-2 rounded border overflow-hidden w-32 h-32">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="phenotypeImageUrl">Phenotype Image URL</Label>
                <Input
                  id="phenotypeImageUrl"
                  type="url"
                  value={formData.phenotypeImageUrl || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phenotypeImageUrl: e.target.value })
                  }
                  placeholder="https://example.com/phenotype-image.jpg"
                />
                {formData.phenotypeImageUrl && (
                  <div className="mt-2 rounded border overflow-hidden w-32 h-32">
                    <img
                      src={formData.phenotypeImageUrl}
                      alt="Phenotype Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="genotype">Genotype</Label>
                <Input
                  id="genotype"
                  value={formData.genotype || ""}
                  onChange={(e) => setFormData({ ...formData, genotype: e.target.value })}
                  placeholder="e.g., EE, Ee, ee"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="geneDominance">Gene Dominance</Label>
                <Select
                  value={formData.geneDominance || ""}
                  onValueChange={(value) => setFormData({ ...formData, geneDominance: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select dominance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem value="dominant">Dominant</SelectItem>
                    <SelectItem value="recessive">Recessive</SelectItem>
                    <SelectItem value="co-dominant">Co-dominant</SelectItem>
                    <SelectItem value="incomplete-dominant">Incomplete Dominant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="geneticBase">Genetic Base Information</Label>
                <Textarea
                  id="geneticBase"
                  value={formData.geneticBase || ""}
                  onChange={(e) => setFormData({ ...formData, geneticBase: e.target.value })}
                  rows={2}
                  placeholder="Additional genetic notation or explanation"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createCoat.isPending || updateCoat.isPending}>
              {editingCoat ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
