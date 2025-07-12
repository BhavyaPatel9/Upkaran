import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import drillIcon from "@/assets/drill-icon.png";
import vacuumIcon from "@/assets/Vacuum_cleaner.png";
import sprayerIcon from "@/assets/Paint_spray.png";
import toolsIcon from "@/assets/power-tool.png";
import gardeningIcon from "@/assets/Gardening_tools.png";
import constructionIcon from "@/assets/Construction-tool.png";
import engineeringIcon from "@/assets/Engineering_Tools.png";
import weldingIcon from "@/assets/Welding_Equipment.png";
import plumbingIcon from "@/assets/Plumbing_Tools.png";
import electricalIcon from "@/assets/Electrical_tools.png";
import automotiveIcon from "@/assets/Automotive.png";
import woodworkingIcon from "@/assets/Woodworking_Tools.png";
import safetyIcon from "@/assets/Safety_Equipment.png";
import liftingIcon from "@/assets/Lifting_Equipment.png";
import surveyingIcon from "@/assets/Surveying_tools.png";
import hvacIcon from "@/assets/HVAC.png";

const categories = [
  {
    id: 1,
    name: "Power Drills",
    description: "Professional drilling machines for all materials",
    icon: drillIcon,
    count: "450+ tools",
    popular: true,
  },
  {
    id: 2,
    name: "Cleaning Equipment",
    description: "Vacuum cleaners, pressure washers & more",
    icon: vacuumIcon,
    count: "320+ tools",
    popular: false,
  },
  {
    id: 3,
    name: "Paint & Spray",
    description: "Spray guns, paint sprayers & accessories",
    icon: sprayerIcon,
    count: "180+ tools",
    popular: false,
  },
  {
    id: 4,
    name: "Power Tools",
    description: "Saws, grinders, sanders & workshop tools",
    icon: toolsIcon,
    count: "600+ tools",
    popular: true,
  },
  {
    id: 5,
    name: "Garden Tools",
    description: "Lawn mowers, trimmers & landscaping equipment",
    icon: gardeningIcon,
    count: "280+ tools",
    popular: false,
  },
  {
    id: 6,
    name: "Construction Tools",
    description: "Heavy machinery & construction equipment",
    icon: constructionIcon,
    count: "150+ tools",
    popular: false,
  },
  {
    id: 7,
    name: "Engineering Tools",
    description: "Precision measuring instruments & calipers",
    icon: engineeringIcon,
    count: "120+ tools",
    popular: false,
  },
  {
    id: 8,
    name: "Welding Equipment",
    description: "MIG, TIG, Arc welders & accessories",
    icon: weldingIcon,
    count: "90+ tools",
    popular: false,
  },
  {
    id: 9,
    name: "Plumbing Tools",
    description: "Pipe wrenches, cutters & soldering equipment",
    icon: plumbingIcon,
    count: "200+ tools",
    popular: false,
  },
  {
    id: 10,
    name: "Electrical Tools",
    description: "Multimeters, testers & electrical equipment",
    icon: electricalIcon,
    count: "180+ tools",
    popular: false,
  },
  {
    id: 11,
    name: "Automotive Tools",
    description: "Car diagnostic tools & repair equipment",
    icon: automotiveIcon,
    count: "140+ tools",
    popular: false,
  },
  {
    id: 12,
    name: "Woodworking Tools",
    description: "Chisels, planes & traditional hand tools",
    icon: woodworkingIcon,
    count: "160+ tools",
    popular: false,
  },
  {
    id: 13,
    name: "Safety Equipment",
    description: "Hard hats, gloves & protective gear",
    icon: safetyIcon,
    count: "100+ tools",
    popular: false,
  },
  {
    id: 14,
    name: "Lifting Equipment",
    description: "Cranes, hoists & material handling",
    icon: liftingIcon,
    count: "80+ tools",
    popular: false,
  },
  {
    id: 15,
    name: "Surveying Tools",
    description: "Laser levels, theodolites & measuring",
    icon: surveyingIcon,
    count: "70+ tools",
    popular: false,
  },
  {
    id: 16,
    name: "HVAC Equipment",
    description: "Air conditioners, heaters & climate control",
    icon: hvacIcon,
    count: "110+ tools",
    popular: false,
  },
];

export const CategoriesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Browse by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the right tools for your project. All equipment is verified and maintained by trusted owners.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.slice(0, 8).map((category) => (
            <Link key={category.id} to="/browse-tools">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden">
              {category.popular && (
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Popular
                </div>
              )}
              
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                  <div className="text-primary text-sm font-medium">
                    {category.count}
                  </div>
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

        <div className="text-center">
          <Link to="/categories">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Categories
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};