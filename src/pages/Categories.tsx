import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import drillIcon from "@/assets/drill-icon.png";
import vacuumIcon from "@/assets/Vacuum_cleaner.png";
import sprayerIcon from "@/assets/Paint_spray.png";
import toolsIcon from "@/assets/power-tool.png";
import gardeningIcon from "@/assets/Gardening_tools.png";
import constructionIcon from "@/assets/Construction-tool.png";
import engineeringIcon from "@/assets/Engineering_Tools.jpeg";
import weldingIcon from "@/assets/Welding_Equipment.jpeg";
import plumbingIcon from "@/assets/Plumbing_Tools.jpeg";
import electricalIcon from "@/assets/Electrical_tools.jpeg";
import automotiveIcon from "@/assets/Automotive.jpeg";
import woodworkingIcon from "@/assets/Woodworking_Tools.jpeg";
import safetyIcon from "@/assets/Safety_Equipment.jpeg";
import liftingIcon from "@/assets/Lifting_Equipment.jpeg";
import surveyingIcon from "@/assets/Surveying_tools.jpeg";
import hvacIcon from "@/assets/HVAC.jpeg";

interface Category {
  id: string;
  name: string;
  description: string;
  icon_url: string;
}

const categoryIcons: Record<string, string> = {
  "Drilling Tools": drillIcon,
  "Cleaning Equipment": vacuumIcon,
  "Painting Tools": sprayerIcon,
  "Power Tools": toolsIcon,
  "Garden Tools": gardeningIcon,
  "Construction Tools": constructionIcon,
  "Engineering Tools": engineeringIcon,
  "Welding Equipment": weldingIcon,
  "Plumbing Tools": plumbingIcon,
  "Electrical Tools": electricalIcon,
  "Automotive Tools": automotiveIcon,
  "Woodworking Tools": woodworkingIcon,
  "Safety Equipment": safetyIcon,
  "Lifting Equipment": liftingIcon,
  "Surveying Tools": surveyingIcon,
  "HVAC Equipment": hvacIcon,
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">Loading categories...</div>
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
          <h1 className="text-3xl font-bold mb-4">All Categories</h1>
          <p className="text-muted-foreground">
            Browse tools by category to find exactly what you need.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <img
                      src={categoryIcons[category.name] || category.icon_url}
                      alt={category.name}
                      className="w-15 h-15 object-contain"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-muted-foreground text-sm">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 w-full"
                  >
                    Browse Tools
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories found.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Categories;