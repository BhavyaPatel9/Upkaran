import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Shield, Clock, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (location) params.set("location", location);
    navigate(`/browse-tools?${params.toString()}`);
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Verified Tool Marketplace
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Rent Power Tools &{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Engineering Equipment
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Access professional-grade tools when you need them. From drilling machines to cleaning equipment - rent verified tools from trusted owners in your area.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-card rounded-2xl shadow-lg border border-border">
              <div className="flex items-center flex-1 px-4 py-3 bg-background rounded-xl">
                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                <input
                  type="text"
                  placeholder="What tools do you need?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center px-4 py-3 bg-background rounded-xl sm:w-auto">
                <MapPin className="w-5 h-5 text-muted-foreground mr-3" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="outline-none bg-transparent text-foreground placeholder:text-muted-foreground w-full sm:w-32"
                />
              </div>
              <Button 
                size="lg" 
                onClick={handleSearch}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-8"
              >
                Search Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">2,500+</div>
                <div className="text-muted-foreground">Verified Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">1,200+</div>
                <div className="text-muted-foreground">Trusted Owners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-muted-foreground">Cities</div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center text-muted-foreground">
                <Shield className="w-5 h-5 text-success mr-2" />
                <span>Verified Owners</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-5 h-5 text-success mr-2" />
                <span>Same Day Delivery</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-5 h-5 text-success mr-2" />
                <span>Track Your Rental</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Professional power tools and engineering equipment"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium">Verified</div>
                  <div className="text-xs text-muted-foreground">All tools checked</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium">Fast Delivery</div>
                  <div className="text-xs text-muted-foreground">Within 2 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};