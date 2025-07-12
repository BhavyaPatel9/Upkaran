import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, MapPin, Phone, User, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RentalRequest {
  id: string;
  tool_id: string;
  renter_id: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  security_deposit: number;
  status: string;
  delivery_address: string;
  notes: string;
  created_at: string;
  tool: {
    title: string;
    images: string[];
  };
  renter_profile?: {
    full_name?: string;
  };
}

interface RentalRequestCardProps {
  rental: RentalRequest;
  onStatusUpdate: () => void;
}

export const RentalRequestCard: React.FC<RentalRequestCardProps> = ({ rental, onStatusUpdate }) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      // Update rental status to approved
      const { error: rentalError } = await supabase
        .from('rentals')
        .update({
          status: 'approved',
          approved_at: new Date().toISOString(),
          approved_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .eq('id', rental.id);

      if (rentalError) throw rentalError;

      // Add approval record
      const { error: approvalError } = await supabase
        .from('rental_approvals')
        .insert({
          rental_id: rental.id,
          action: 'approve',
          notes: 'Rental request approved',
          approved_by: (await supabase.auth.getUser()).data.user?.id,
        });

      if (approvalError) throw approvalError;

      toast({
        title: 'Request Approved',
        description: 'The rental request has been approved.',
      });

      onStatusUpdate();
    } catch (error) {
      console.error('Error approving rental:', error);
      toast({
        title: 'Approval Failed',
        description: 'Could not approve the rental request.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      // Update rental status to rejected
      const { error: rentalError } = await supabase
        .from('rentals')
        .update({
          status: 'rejected',
        })
        .eq('id', rental.id);

      if (rentalError) throw rentalError;

      // Add rejection record
      const { error: approvalError } = await supabase
        .from('rental_approvals')
        .insert({
          rental_id: rental.id,
          action: 'reject',
          notes: 'Rental request rejected',
          approved_by: (await supabase.auth.getUser()).data.user?.id,
        });

      if (approvalError) throw approvalError;

      toast({
        title: 'Request Rejected',
        description: 'The rental request has been rejected.',
      });

      onStatusUpdate();
    } catch (error) {
      console.error('Error rejecting rental:', error);
      toast({
        title: 'Rejection Failed',
        description: 'Could not reject the rental request.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
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

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{rental.tool.title}</CardTitle>
          {getStatusBadge(rental.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback>
              {rental.renter_profile?.full_name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">
              {rental.renter_profile?.full_name || 'Unknown User'}
            </p>
            <p className="text-sm text-muted-foreground">
              Requested on {format(new Date(rental.created_at), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>

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

        {rental.notes && (
          <div className="text-sm text-muted-foreground">
            <strong>Notes:</strong> {rental.notes}
          </div>
        )}

        {rental.status === 'pending_approval' && (
          <div className="flex gap-2">
            <Button
              onClick={handleApprove}
              disabled={loading}
              className="flex-1"
              size="sm"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {loading ? 'Approving...' : 'Approve'}
            </Button>
            <Button
              onClick={handleReject}
              disabled={loading}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <XCircle className="w-4 h-4 mr-2" />
              {loading ? 'Rejecting...' : 'Reject'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 