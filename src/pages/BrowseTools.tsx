import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { ToolCard } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, ArrowLeft, Navigation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/contexts/location-context";
import { LocationDialog } from "@/components/location-dialog";

interface Tool {
  id: string;
  title: string;
  description: string;
  price_per_day: number;
  security_deposit: number;
  images: string[];
  location: string;
  owner_name?: string;
  category?: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

const BrowseTools = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState("");
  const { toast } = useToast();
  const { currentLocation } = useLocation();

  useEffect(() => {
    fetchTools();
    fetchCategories();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const fetchTools = async () => {
    try {
      const { data, error } = await supabase
        .from("tools")
        .select(`
          *,
          category:categories(name)
        `)
        .eq("status", "active")
        .eq("is_available", true);

      if (error) throw error;
      setTools(data || []);
    } catch (error) {
      console.error("Error fetching tools:", error);
      toast({
        title: "Error",
        description: "Failed to load tools. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category?.name === selectedCategory;
    const matchesLocation = !locationFilter || tool.location?.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Sort tools by distance if location is set
  const sortedTools = currentLocation ? 
    [...filteredTools].sort((a, b) => {
      // Simple distance calculation (you can implement more sophisticated distance calculation)
      const aDistance = a.location?.toLowerCase().includes(currentLocation.address?.toLowerCase() || '') ? 0 : 1;
      const bDistance = b.location?.toLowerCase().includes(currentLocation.address?.toLowerCase() || '') ? 0 : 1;
      return aDistance - bDistance;
    }) : filteredTools;

  const handleRent = (toolId: string) => {
    // Navigate to tool detail page for booking
    window.location.href = `/tool/${toolId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">Loading tools...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Browse Tools</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Find the perfect tools for your project from verified owners.
          </p>

          {/* Search and Filter Section */}
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={currentLocation ? currentLocation.address?.split(',')[0] : "Location"}
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>

              <LocationDialog>
                <Button variant="outline" className="w-full">
                  <Navigation className="w-4 h-4 mr-2" />
                  {currentLocation ? "Change Location" : "Set Location"}
                </Button>
              </LocationDialog>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {sortedTools.length} tools found
            </p>
            {currentLocation && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Showing results near {currentLocation.address?.split(',')[0]}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tools Grid */}
        {sortedTools.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onRent={handleRent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No tools found matching your criteria.</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setLocationFilter("");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BrowseTools;