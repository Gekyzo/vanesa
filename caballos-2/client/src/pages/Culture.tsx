import { Navigation } from "@/components/Navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { useCultureArticles } from "@/hooks/use-culture";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function Culture() {
  const { data: articles, isLoading } = useCultureArticles();

  const categories = ["All", "History", "Psychology", "Mythology"];

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <div className="bg-primary/5 py-16 mb-12">
        <div className="container">
          <SectionHeader 
            title="Horses in Culture" 
            description="Since the dawn of civilization, horses have shaped our history, myths, and souls."
          />
        </div>
      </div>

      <div className="container">
        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-muted p-1 rounded-full">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles
                  ?.filter(a => category === "All" || a.category.toLowerCase() === category.toLowerCase())
                  .map((article, idx) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all border-border/60 flex flex-col">
                        <div className="h-64 overflow-hidden relative">
                           <div className="absolute top-4 left-4 z-10">
                              <Badge className="bg-background/80 text-foreground hover:bg-background backdrop-blur-md">
                                {article.category}
                              </Badge>
                           </div>
                           <img 
                            src={article.imageUrl || "https://images.unsplash.com/photo-1551884831-bbf3ddd77535?w=800&auto=format&fit=crop&q=60"} 
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                           />
                        </div>
                        <CardHeader className="pb-2">
                          <h3 className="font-display text-2xl font-bold text-primary">{article.title}</h3>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <ScrollArea className="h-[200px] pr-4">
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                              {article.content}
                            </p>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
