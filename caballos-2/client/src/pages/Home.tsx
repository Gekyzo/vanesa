import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Music, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useBreeds } from "@/hooks/use-breeds";
import { BreedCard } from "@/components/BreedCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation(['pages', 'common']);
  const { data: breeds, isLoading } = useBreeds();

  // Show only first 3 featured breeds
  const featuredBreeds = breeds?.slice(0, 3);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background with Gradient overlay */}
        <div className="absolute inset-0 z-0">
          {/* beautiful horse running in field */}
          <img
            src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop"
            alt="Majestic Horse"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
          >
            {t('pages:home.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light"
          >
            {t('pages:home.hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/breeds">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 h-14 rounded-full font-display"
              >
                {t('common:buttons.explore')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Breeds */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={t('pages:home.featuredBreeds.title')}
            description={t('pages:home.featuredBreeds.subtitle')}
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[400px] bg-muted animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBreeds?.map((breed, index) => (
                <BreedCard key={breed.id} breed={breed} index={index} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/breeds">
              <Button variant="ghost" className="text-primary text-lg">
                {t('common:buttons.viewAllBreeds')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors text-center flex flex-col items-center">
              <div className="h-16 w-16 bg-accent rounded-2xl flex items-center justify-center shadow-xl">
                <Sparkles className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                {t('pages:home.features.horses.title')}
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                {t('pages:home.features.horses.description')}
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors text-center flex flex-col items-center">
              <div className="h-16 w-16 bg-accent rounded-2xl flex items-center justify-center shadow-xl">
                <Users className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                {t('pages:home.features.dance.title')}
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                {t('pages:home.features.dance.description')}
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
              <div className="h-16 w-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Music className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                {t('pages:home.features.music.title')}
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                {t('pages:home.features.music.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
