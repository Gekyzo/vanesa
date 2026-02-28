import { Navigation } from "@/components/Navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { useMediaEntries } from "@/hooks/use-media";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function Media() {
  const { data: media, isLoading } = useMediaEntries();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <div className="bg-black text-white py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://pixabay.com/get/g6e0f8fb7316f79c8776f3451a6356d3cbf53450183cb8cb2f6f73d0696779a2e7cbcbb1caf49e1bc18cc7b28f44c39cb70b8ea142e7bd40df7f580c4c46a0431_1280.jpg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container relative z-10 text-center">
          <SectionHeader 
            title="Horses on Screen" 
            description="From legendary war horses to spirited mustangs, discover the equine stars of cinema and television."
            className="text-white [&>h2]:text-white [&>p]:text-white/80"
          />
        </div>
      </div>

      <div className="container">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {media?.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full bg-card border-border/50 hover:border-primary/50 transition-colors group overflow-hidden flex flex-col">
                  <div className="relative aspect-[2/3] overflow-hidden">
                     <img 
                      src={item.imageUrl || "https://images.unsplash.com/photo-1612140647190-264663a8637e?w=800&auto=format&fit=crop&q=60"} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute top-4 left-4">
                       <Badge variant="secondary" className="uppercase tracking-widest text-xs font-bold bg-black/60 text-white backdrop-blur-md border-0">
                         {item.type}
                       </Badge>
                     </div>
                     
                     {/* Hover Overlay */}
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {item.linkUrl && (
                          <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
                             <Button size="icon" className="h-16 w-16 rounded-full bg-white text-black hover:bg-white/90 hover:scale-110 transition-transform">
                                <PlayCircle className="h-8 w-8" />
                             </Button>
                          </a>
                        )}
                     </div>
                  </div>
                  
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
                      {item.description}
                    </p>
                    {item.linkUrl && (
                      <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="block mt-auto">
                        <Button variant="outline" className="w-full gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary">
                          Watch Trailer <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
