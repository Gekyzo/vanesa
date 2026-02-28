import { Navigation } from "@/components/Navigation";
import { useBreeds } from "@/hooks/use-breeds";
import { BreedCard } from "@/components/BreedCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Breeds() {
  const [location] = useLocation();
  const isSpanishPage = location === "/breeds-spanish";

  const [search, setSearch] = useState("");
  const [isSpanish, setIsSpanish] = useState(isSpanishPage);
  const [bloodType, setBloodType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Update filter when route changes
  useEffect(() => {
    setIsSpanish(isSpanishPage);
  }, [isSpanishPage]);

  // Pass filters to the hook - it handles the API query params
  const { data: breeds, isLoading, isError } = useBreeds({
    search: search || undefined,
    isSpanish: isSpanish || undefined,
    bloodType: bloodType === "all" ? undefined : bloodType,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="bg-primary/5 py-16">
        <div className="container">
          <SectionHeader
            title={isSpanishPage ? "Razas Españolas" : "Discover Breeds"}
            description={isSpanishPage
              ? "Explora las 17 razas de caballos autóctonas de España, desde el emblemático Pura Raza Española hasta el resistente Pottoka de los Pirineos."
              : "From the spirited Andalusian to the sturdy Clydesdale, explore our comprehensive database of horse breeds."
            }
          />
          
          {/* Search & Filter Bar */}
          <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl shadow-black/5 p-6 border border-border mt-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search breeds..." 
                  className="pl-10 h-12 text-lg bg-background"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="w-full md:w-auto h-12 gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border mt-6">
                    <div className="space-y-3">
                      <Label>Blood Type</Label>
                      <Select value={bloodType} onValueChange={setBloodType}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="All Blood Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="hot">Hot Blood (High energy)</SelectItem>
                          <SelectItem value="warm">Warm Blood (Sport)</SelectItem>
                          <SelectItem value="cold">Cold Blood (Draft)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background">
                      <div className="space-y-0.5">
                        <Label className="text-base">Spanish Breeds Only</Label>
                        <p className="text-sm text-muted-foreground">
                          Show only breeds from Spain
                        </p>
                      </div>
                      <Switch 
                        checked={isSpanish}
                        onCheckedChange={setIsSpanish}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="container py-16">
        {isLoading ? (
          <div className="space-y-6 max-w-95 mx-auto px-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-[240px] bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-destructive">Failed to load breeds</h3>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        ) : breeds?.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-muted-foreground">No breeds found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="space-y-6 max-w-95 mx-auto px-4">
            {breeds?.map((breed, index) => (
              <BreedCard key={breed.id} breed={breed} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
