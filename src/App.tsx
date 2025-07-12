import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocationProvider } from "@/contexts/location-context";
import Index from "./pages/Index";
import BrowseTools from "./pages/BrowseTools";
import ListTool from "./pages/ListTool";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import NotFound from "./pages/NotFound";
import ToolDetail from "./pages/ToolDetail";
import OwnerDashboard from "./pages/OwnerDashboard";
import UserDashboard from "./pages/UserDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/browse-tools" element={<BrowseTools />} />
            <Route path="/list-tool" element={<ListTool />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId" element={<CategoryDetail />} />
            <Route path="/tool/:toolId" element={<ToolDetail />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
