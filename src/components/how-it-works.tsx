import { Card, CardContent } from "@/components/ui/card";
import { Search, Shield, Truck, RotateCcw } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Search & Browse",
    description: "Find the perfect tool for your project. Filter by location, price, and availability.",
    icon: Search,
    color: "from-primary to-primary/80"
  },
  {
    id: 2,
    title: "Verify & Book",
    description: "Choose from verified tools and owners. Secure booking with transparent pricing.",
    icon: Shield,
    color: "from-accent to-accent/80"
  },
  {
    id: 3,
    title: "Get Delivered",
    description: "Tools delivered to your location. Track delivery in real-time.",
    icon: Truck,
    color: "from-success to-success/80"
  },
  {
    id: 4,
    title: "Return Easily",
    description: "Scheduled pickup when you're done. Rate your experience and owner.",
    icon: RotateCcw,
    color: "from-warning to-warning/80"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            How{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Rent professional tools in 4 simple steps. Safe, verified, and delivered to your doorstep.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center space-y-4">
                  {/* Step number */}
                  <div className="relative">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.id}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Connector arrow - only show between steps, not after last */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                    <div className="w-0 h-0 border-l-4 border-l-accent border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-muted-foreground">Verified Tools</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-muted-foreground">Customer Support</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">₹0</div>
            <div className="text-muted-foreground">Hidden Charges</div>
          </div>
        </div>
      </div>
    </section>
  );
};