import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Breeds from "@/pages/Breeds";
import BreedDetail from "@/pages/BreedDetail";
import Coats from "@/pages/Coats";
import Culture from "@/pages/Culture";
import Media from "@/pages/Media";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminCoats from "@/pages/admin/Coats";
import CoatCategories from "@/pages/admin/CoatCategories";
import "./i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/breeds-spanish" component={Breeds} />
      <Route path="/breeds" component={Breeds} />
      <Route path="/breeds/:id" component={BreedDetail} />
      <Route path="/coats" component={Coats} />
      <Route path="/culture" component={Culture} />
      <Route path="/media" component={Media} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/coats" component={AdminCoats} />
      <Route path="/admin/coat-categories" component={CoatCategories} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
