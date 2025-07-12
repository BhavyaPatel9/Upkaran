import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { RentalRequestCard } from "@/components/rental/rental-request-card";

interface Rental {
  id: string;
  tool_id: string;
  renter_id: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  security_deposit: number;
  status: string;
  created_at: string;
  delivery_address?: string;
  notes?: string;
  tool: {
    title: string;
    images: string[];
    price_per_day: number;
    location: string;
  };
  renter_profile?: {
    full_name?: string;
    email?: string;
  };
}

const OwnerDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      fetchRentals();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchRentals = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("rentals")
        .select(`
          *,
          tool:tools(title, images, price_per_day, location)
        `)
        .eq("owner_id", user.id)
        .in("status", ["pending_approval", "approved", "payment_completed", "active"])
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setRentals(data || []);
    } catch (error) {
      console.error("Error fetching rentals:", error);
      toast({ 
        title: "Error", 
        description: "Could not fetch rental requests. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = () => {
    fetchRentals();
  };

  // Show loading while auth is being determined
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center py-12">Loading...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show sign-in message if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
              <p className="text-muted-foreground mb-6">
                Please sign in to view your rental requests.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Owner Dashboard</h1>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">
                Pending Approval ({rentals.filter(r => r.status === 'pending_approval').length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({rentals.filter(r => r.status === 'approved').length})
              </TabsTrigger>
              <TabsTrigger value="payment">
                Payment Completed ({rentals.filter(r => r.status === 'payment_completed').length})
              </TabsTrigger>
              <TabsTrigger value="active">
                Active ({rentals.filter(r => r.status === 'active').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {rentals.filter(r => r.status === 'pending_approval').map((rental) => (
                <RentalRequestCard
                  key={rental.id}
                  rental={rental}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
              {rentals.filter(r => r.status === 'pending_approval').length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No pending approval requests.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {rentals.filter(r => r.status === 'approved').map((rental) => (
                <RentalRequestCard
                  key={rental.id}
                  rental={rental}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
              {rentals.filter(r => r.status === 'approved').length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No approved requests waiting for payment.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              {rentals.filter(r => r.status === 'payment_completed').map((rental) => (
                <RentalRequestCard
                  key={rental.id}
                  rental={rental}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
              {rentals.filter(r => r.status === 'payment_completed').length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No payments completed waiting for delivery.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {rentals.filter(r => r.status === 'active').map((rental) => (
                <RentalRequestCard
                  key={rental.id}
                  rental={rental}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
              {rentals.filter(r => r.status === 'active').length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No active rentals.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OwnerDashboard; 