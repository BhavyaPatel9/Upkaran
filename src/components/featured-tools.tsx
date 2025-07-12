import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, MapPin, Clock } from "lucide-react";

const featuredTools = [
  {
    id: 1,
    name: "Professional Hammer Drill",
    description: "Heavy-duty SDS-Plus rotary hammer drill perfect for concrete and masonry work",
    price: "₹150",
    originalPrice: "₹200",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
    location: "Bangalore, KA",
    owner: "Raj Kumar",
    verified: true,
    available: true,
    delivery: "Same day"
  },
  {
    id: 2,
    name: "Industrial Vacuum Cleaner",
    description: "High-power wet/dry vacuum with HEPA filter for construction cleanup",
    price: "₹80",
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    location: "Mumbai, MH",
    owner: "Priya Singh",
    verified: true,
    available: true,
    delivery: "2 hours"
  },
  {
    id: 3,
    name: "Paint Spray Gun Kit",
    description: "Professional airless paint sprayer with multiple nozzles and hose",
    price: "₹120",
    originalPrice: "₹160",
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    location: "Delhi, DL",
    owner: "Amit Patel",
    verified: true,
    available: false,
    delivery: "Next day"
  },
  {
    id: 4,
    name: "Circular Saw",
    description: "7-1/4 inch circular saw with laser guide and adjustable depth",
    price: "₹100",
    originalPrice: null,
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
    location: "Chennai, TN",
    owner: "Deepa Reddy",
    verified: true,
    available: true,
    delivery: "Same day"
  }
];

export const FeaturedTools = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tools
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Top-rated tools from verified owners. All equipment comes with delivery and pickup service.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map((tool) => (
            <Card
              key={tool.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              <div className="relative">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Status badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {tool.verified && (
                    <Badge className="bg-success text-success-foreground">
                      Verified
                    </Badge>
                  )}
                  {!tool.available && (
                    <Badge variant="destructive">
                      Unavailable
                    </Badge>
                  )}
                </div>

                {/* Favorite button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>

                {/* Delivery badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {tool.delivery}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{tool.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">({tool.reviews})</span>
                </div>

                {/* Owner info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {tool.location}
                  </div>
                  <span className="text-muted-foreground">by {tool.owner}</span>
                </div>

                {/* Price and action */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="space-x-2">
                    <span className="text-lg font-bold text-primary">{tool.price}</span>
                    <span className="text-muted-foreground">/day</span>
                    {tool.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {tool.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    size="sm" 
                    disabled={!tool.available}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    {tool.available ? "Rent Now" : "Unavailable"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View All Tools
          </Button>
        </div>
      </div>
    </section>
  );
};