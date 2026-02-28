import { Navigation } from "@/components/Navigation";
import { useBreed } from "@/hooks/use-breeds";
import { useRoute } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Activity, ThermometerSun, Ruler, History, Briefcase } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function BreedDetail() {
  const [, params] = useRoute("/breeds/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: breed, isLoading } = useBreed(id);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-primary">Loading breed details...</div>;
  }

  if (!breed) {
    return <div className="min-h-screen flex items-center justify-center">Breed not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img src={breed.imageUrl} alt={breed.name} className="w-full h-full object-cover" />
        
        <div className="absolute bottom-0 left-0 w-full z-20 p-8 md:p-16 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="container">
            <Link href="/breeds">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-6 pl-0">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Breeds
              </Button>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-3 mb-4">
                {breed.isSpanish && (
                  <Badge className="bg-accent text-accent-foreground text-sm font-bold border-0 px-3 py-1">Spanish Breed</Badge>
                )}
                <Badge variant="outline" className="text-white border-white/40 bg-black/20 text-sm backdrop-blur-md">
                  {breed.bloodType.charAt(0).toUpperCase() + breed.bloodType.slice(1)} Blood
                </Badge>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-2">{breed.name}</h1>
              <div className="flex items-center text-white/90 text-lg">
                <MapPin className="mr-2 h-5 w-5 text-accent" />
                {breed.country}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="font-display text-3xl font-bold text-primary mb-6 flex items-center">
                About the Breed
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {breed.description}
              </p>
            </section>

            {breed.history && (
              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4 flex items-center">
                  <History className="mr-3 h-6 w-6 text-secondary" /> History & Origins
                </h2>
                <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
                  <p className="leading-relaxed text-foreground/80">{breed.history}</p>
                </div>
              </section>
            )}

            {breed.uses && (
              <section>
                <h2 className="font-display text-2xl font-bold text-primary mb-4 flex items-center">
                  <Briefcase className="mr-3 h-6 w-6 text-secondary" /> Primary Uses
                </h2>
                <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
                  <p className="leading-relaxed text-foreground/80">{breed.uses}</p>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-lg sticky top-24">
              <h3 className="font-display text-xl font-bold text-primary mb-6 border-b border-border pb-4">
                Breed Traits
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-primary/10 rounded-lg mr-4 text-primary">
                    <Ruler className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Height</h4>
                    <p className="text-muted-foreground">{breed.height || "Varies"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-accent/10 rounded-lg mr-4 text-accent">
                    <ThermometerSun className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Blood Type</h4>
                    <p className="text-muted-foreground capitalize">{breed.bloodType} Blood</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-secondary/10 rounded-lg mr-4 text-secondary">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Temperament</h4>
                    <p className="text-muted-foreground">{breed.temperament}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-primary/10 rounded-lg mr-4 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Origin</h4>
                    <p className="text-muted-foreground">{breed.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
