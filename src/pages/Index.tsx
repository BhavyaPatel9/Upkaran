import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/hero-section";
import { CategoriesSection } from "@/components/categories-section";
import { FeaturedTools } from "@/components/featured-tools";
import { HowItWorks } from "@/components/how-it-works";
import { Footer } from "@/components/footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const Index = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    const { data, error } = await supabase
      .from("rentals")
      .select("*, tool:tools(title, images)")
      .eq("renter_id", user.id)
      .order("created_at", { ascending: false });
    if (!error) setBookings(data || []);
    setLoadingBookings(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {user && (
        <div className="container mx-auto px-4 pt-8 pb-2">
          <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
          {loadingBookings ? (
            <div className="text-muted-foreground">Loading your bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="text-muted-foreground">You have no bookings yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {bookings.map((rental) => (
                <Card key={rental.id}>
                  <CardContent className="flex gap-4 p-4 items-center">
                    <div className="w-20 h-16 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                      {rental.tool?.images?.[0] ? (
                        <img src={rental.tool.images[0]} alt={rental.tool.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-muted-foreground">No Image</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-base mb-1">{rental.tool?.title}</div>
                      <div className="text-xs text-muted-foreground mb-1">
                        {format(new Date(rental.start_date), "dd MMM yyyy")} - {format(new Date(rental.end_date), "dd MMM yyyy")}
                      </div>
                      <Badge className="capitalize" variant="secondary">{rental.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      <HeroSection />
      <CategoriesSection />
      <FeaturedTools />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
