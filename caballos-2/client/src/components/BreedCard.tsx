import { Breed } from "@shared/schema";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Activity, Flag, ThermometerSun, Ruler, Palette, Target, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface BreedCardProps {
  breed: Breed;
  index?: number;
}

export function BreedCard({ breed, index = 0 }: BreedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/breeds/${breed.id}`} className="group block h-full">
        <Card className="h-full overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left side: Title + Image */}
            <div className="w-full md:w-1/5 flex flex-col">
              <CardHeader className="p-5 pb-3">
                <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {breed.name}
                </h3>
                {breed.isSpanish && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0 font-medium w-fit mt-2">
                    🇪🇸 Raza Española
                  </Badge>
                )}
              </CardHeader>
              <div className="relative overflow-hidden flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                <img
                  src={breed.imageUrl}
                  alt={breed.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right side: Information only */}
            <div className="w-full md:w-4/5 flex flex-col">
              <CardContent className="p-5 space-y-3 flex-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Flag className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                    <span>{breed.country}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ThermometerSun className="mr-2 h-4 w-4 text-accent flex-shrink-0" />
                    <span className="capitalize">{breed.bloodType} Blood</span>
                  </div>
                  {breed.height && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Ruler className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                      <span>{breed.height}</span>
                    </div>
                  )}
                  {breed.typicalCoats && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Palette className="mr-2 h-4 w-4 text-accent flex-shrink-0" />
                      <span className="capitalize">{breed.typicalCoats}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Activity className="mr-2 h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="line-clamp-1">{breed.temperament}</span>
                  </div>
                  {breed.uses && (
                    <div className="flex items-start text-sm text-muted-foreground">
                      <Target className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{breed.uses}</span>
                    </div>
                  )}
                  <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">
                    {breed.description}
                  </p>
                  {breed.history && (
                    <div className="flex items-start text-sm text-muted-foreground">
                      <BookOpen className="mr-2 h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-3">{breed.history}</span>
                    </div>
                  )}
              </CardContent>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
