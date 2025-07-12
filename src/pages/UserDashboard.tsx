import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, CreditCard, Truck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { StripePaymentForm } from '@/components/payment/stripe-payment-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Rental {
  id: string;
  tool_id: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  security_deposit: number;
  status: string;
  delivery_address: string;
  notes: string;
  created_at: string;
  approved_at?: string;
  payment_completed_at?: string;
  delivery_confirmed_at?: string;
  tool: {
    title: string;
    images: string[];
    price_per_day: number;
    location: string;
  };
  owner_profile?: {
    full_name?: string;
  };
}

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

  useEffect(() => {
    if (user) {
      fetchRentals();
    }
  }, [user]);

  const fetchRentals = async () => {
    try {
      const { data, error } = await supabase
        .from('rentals')
        .select(`
          *,
          tool:tools(title, images, price_per_day, location)
        `)
        .eq('renter_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRentals(data || []);
    } catch (error) {
      console.error('Error fetching rentals:', error);
      toast({
        title: 'Error',
        description: 'Could not load your rentals.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    if (selectedRental) {
      try {
        // Update rental status to payment completed
        const { error } = await supabase
          .from('rentals')
          .update({
            status: 'payment_completed',
            payment_completed_at: new Date().toISOString(),
          })
          .eq('id', selectedRental.id);

        if (error) throw error;

        toast({
          title: 'Payment Successful!',
          description: 'Your payment has been processed. The owner will be notified.',
        });

        setShowPayment(false);
        setSelectedRental(null);
        fetchRentals(); // Refresh the list
      } catch (error) {
        console.error('Error updating rental status:', error);
        toast({
          title: 'Error',
          description: 'Payment completed but status update failed.',
          variant: 'destructive',
        });
      }
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setSelectedRental(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return <Badge variant="secondary">Pending Approval</Badge>;
      case 'approved':
        return <Badge variant="default">Approved</Badge>;
      case 'payment_pending':
        return <Badge variant="outline">Payment Pending</Badge>;
      case 'payment_completed':
        return <Badge variant="default">Payment Completed</Badge>;
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return 'Waiting for owner approval';
      case 'approved':
        return 'Approved by owner - payment required';
      case 'payment_pending':
        return 'Payment required to proceed';
      case 'payment_completed':
        return 'Payment completed - awaiting delivery';
      case 'active':
        return 'Rental is active';
      case 'completed':
        return 'Rental completed';
      case 'rejected':
        return 'Request was rejected';
      default:
        return 'Unknown status';
    }
  };

  const filteredRentals = (status: string) => {
    return rentals.filter(rental => rental.status === status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Rentals</h1>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({rentals.length})</TabsTrigger>
              <TabsTrigger value="pending_approval">
                Pending ({filteredRentals('pending_approval').length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({filteredRentals('approved').length})
              </TabsTrigger>
              <TabsTrigger value="active">
                Active ({filteredRentals('active').length + filteredRentals('payment_completed').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {rentals.map((rental) => (
                <RentalCard
                  key={rental.id}
                  rental={rental}
                  onPaymentClick={() => {
                    setSelectedRental(rental);
                    setShowPayment(true);
                  }}
                  getStatusBadge={getStatusBadge}
                  getStatusDescription={getStatusDescription}
                />
              ))}
            </TabsContent>

            <TabsContent value="pending_approval" className="space-y-4">
              {filteredRentals('pending_approval').map((rental) => (
                <RentalCard
                  key={rental.id}
                  rental={rental}
                  onPaymentClick={() => {
                    setSelectedRental(rental);
                    setShowPayment(true);
                  }}
                  getStatusBadge={getStatusBadge}
                  getStatusDescription={getStatusDescription}
                />
              ))}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {filteredRentals('approved').map((rental) => (
                <RentalCard
                  key={rental.id}
                  rental={rental}
                  onPaymentClick={() => {
                    setSelectedRental(rental);
                    setShowPayment(true);
                  }}
                  getStatusBadge={getStatusBadge}
                  getStatusDescription={getStatusDescription}
                />
              ))}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {[...filteredRentals('active'), ...filteredRentals('payment_completed')].map((rental) => (
                <RentalCard
                  key={rental.id}
                  rental={rental}
                  onPaymentClick={() => {
                    setSelectedRental(rental);
                    setShowPayment(true);
                  }}
                  getStatusBadge={getStatusBadge}
                  getStatusDescription={getStatusDescription}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>
          {selectedRental && (
            <StripePaymentForm
              amount={selectedRental.total_amount}
              rentalId={selectedRental.id}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
              currency="inr"
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

interface RentalCardProps {
  rental: Rental;
  onPaymentClick: () => void;
  getStatusBadge: (status: string) => React.ReactNode;
  getStatusDescription: (status: string) => string;
}

const RentalCard: React.FC<RentalCardProps> = ({ rental, onPaymentClick, getStatusBadge, getStatusDescription }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{rental.tool.title}</CardTitle>
          {getStatusBadge(rental.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {format(new Date(rental.start_date), 'MMM dd')} - {format(new Date(rental.end_date), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{rental.delivery_address}</span>
          </div>
        </div>

        <div className="bg-muted p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Amount:</span>
            <span className="font-bold">₹{rental.total_amount}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-muted-foreground">Security Deposit:</span>
            <span className="font-bold">₹{rental.security_deposit}</span>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          {getStatusDescription(rental.status)}
        </div>

        {rental.status === 'approved' && (
          <Button onClick={onPaymentClick} className="w-full">
            <CreditCard className="w-4 h-4 mr-2" />
            Pay Now
          </Button>
        )}

        {rental.status === 'payment_completed' && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="w-4 h-4" />
            <span>Payment completed - awaiting delivery confirmation</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDashboard; 