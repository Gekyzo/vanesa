import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Rabbit, Music, Users, Menu, ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavItem = {
  href?: string;
  labelKey: string;
  icon: any;
  subItems?: { href: string; labelKey: string }[];
};

const navItems: NavItem[] = [
  { href: "/", labelKey: "nav.home", icon: Rabbit },
  {
    labelKey: "nav.horses",
    icon: Rabbit,
    subItems: [
      { href: "/breeds-spanish", labelKey: "nav.spanishBreeds" },
      { href: "/breeds", labelKey: "nav.worldBreeds" },
      { href: "/coats", labelKey: "nav.coats" },
      { href: "/culture", labelKey: "nav.horsesInCulture" },
    ]
  },
  { href: "/dance", labelKey: "nav.dance", icon: Users },
  { href: "/music", labelKey: "nav.music", icon: Music },
  {
    labelKey: "nav.admin",
    icon: Settings,
    subItems: [
      { href: "/admin/coats", labelKey: "nav.manageCoats" },
      { href: "/admin/coat-categories", labelKey: "nav.manageCategories" },
    ]
  },
];

export function Navigation() {
  const { t } = useTranslation('common');
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  const isActiveItem = (item: NavItem) => {
    if (item.href) return location === item.href;
    if (item.subItems) {
      return item.subItems.some(subItem => location === subItem.href);
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-border/40">
      <div className="container flex h-20 items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Rabbit className="h-8 w-8 text-primary" />
            <span className="hidden font-display text-2xl font-bold sm:inline-block text-primary">
              {t('nav.logo')}
            </span>
          </Link>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <DropdownMenu key={item.labelKey}>
                    <DropdownMenuTrigger className={cn(
                      "transition-colors hover:text-primary/80 relative group py-2 flex items-center gap-1",
                      isActiveItem(item) ? "text-primary" : "text-muted-foreground"
                    )}>
                      {t(item.labelKey)}
                      <ChevronDown className="h-4 w-4" />
                      <span className={cn(
                        "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out",
                        isActiveItem(item) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#ffeace] backdrop-blur">
                      {item.subItems.map((subItem) => (
                        <DropdownMenuItem key={subItem.href} asChild>
                          <Link href={subItem.href} className="cursor-pointer">
                            {t(subItem.labelKey)}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "transition-colors hover:text-primary/80 relative group py-2",
                    location === item.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {t(item.labelKey)}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out",
                    location === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Logo */}
        <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Rabbit className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold text-primary">{t('nav.logo')}</span>
        </Link>

        {/* Language Switcher - Desktop */}
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6 text-primary" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 bg-background border-r-border/40">
            <div className="px-7 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
                <Rabbit className="h-8 w-8 text-primary" />
                <span className="font-display text-xl font-bold text-primary">{t('nav.logo')}</span>
              </Link>
              <LanguageSwitcher />
            </div>
            <div className="flex flex-col gap-4 py-8 px-6">
              {navItems.map((item) => {
                if (item.subItems) {
                  return (
                    <div key={item.labelKey} className="flex flex-col gap-2">
                      <button
                        onClick={() => setMobileSubmenuOpen(
                          mobileSubmenuOpen === item.labelKey ? null : item.labelKey
                        )}
                        className={cn(
                          "flex items-center justify-between text-lg font-medium transition-colors hover:text-primary",
                          isActiveItem(item) ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-4 h-5 w-5" />
                          {t(item.labelKey)}
                        </div>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform",
                          mobileSubmenuOpen === item.labelKey ? "rotate-180" : ""
                        )} />
                      </button>
                      {mobileSubmenuOpen === item.labelKey && (
                        <div className="flex flex-col gap-2 ml-9 mt-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "text-base font-medium transition-colors hover:text-primary",
                                location === subItem.href ? "text-primary" : "text-muted-foreground"
                              )}
                            >
                              {t(subItem.labelKey)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center text-lg font-medium transition-colors hover:text-primary",
                      location === item.href ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="mr-4 h-5 w-5" />
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
