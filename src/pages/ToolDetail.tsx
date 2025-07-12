import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, ArrowLeft, Calendar, Phone, User, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ImageGallery } from "@/components/ui/image-gallery";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { useAuth } from "@/hooks/use-auth";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { StripePaymentForm } from "@/components/payment/stripe-payment-form";

interface Tool {
  id: string;
  title: string;
  description: string;
  price_per_day: number;
  security_deposit: number;
  images: string[];
  location: string;
  owner_name?: string;
  owner_id?: string;
  category?: {
    name: string;
  };
}

type DateRange = { from: Date | undefined; to: Date | undefined };

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const ToolDetail = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    phoneNumber: "",
    deliveryAddress: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [currentRentalId, setCurrentRentalId] = useState<string | null>(null);

  useEffect(() => {
    if (toolId) fetchTool();
    // eslint-disable-next-line
  }, [toolId]);

  const fetchTool = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tools")
        .select(`*, category:categories(name)`)
        .eq("id", toolId)
        .single();
      if (error) throw error;
      setTool(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not load tool details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const days = dateRange.from && dateRange.to ? differenceInCalendarDays(dateRange.to, dateRange.from) + 1 : 0;
  const total = tool && days > 0 ? (days * Number(tool.price_per_day) + Number(tool.security_deposit)) : 0;

  const handleRequestRental = async () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to request this tool.", variant: "destructive" });
      return;
    }
    if (!dateRange.from || !dateRange.to) {
      toast({ title: "Select dates", description: "Please select rental start and end dates.", variant: "destructive" });
      return;
    }
    if (!contactInfo.fullName.trim() || !contactInfo.phoneNumber.trim() || !contactInfo.deliveryAddress.trim()) {
      toast({ title: "Missing information", description: "Please fill in all contact details.", variant: "destructive" });
      return;
    }
    setBooking(true);
    try {
      const { data, error } = await supabase.from("rentals").insert([
        {
          tool_id: tool!.id,
          renter_id: user.id,
          owner_id: tool!.owner_id,
          start_date: format(dateRange.from, "yyyy-MM-dd"),
          end_date: format(dateRange.to, "yyyy-MM-dd"),
          total_amount: total,
          security_deposit: tool!.security_deposit,
          status: "pending_approval",
          delivery_address: contactInfo.deliveryAddress,
          notes: `Contact: ${contactInfo.fullName} | Phone: ${contactInfo.phoneNumber}`,
        },
      ]).select();
      
      if (error) throw error;
      
      toast({ 
        title: "Rental Request Sent!", 
        description: "Your request has been sent to the owner for approval. You'll be notified once approved." 
      });
      
      // Reset form
      setDateRange({ from: undefined, to: undefined });
      setContactInfo({ fullName: "", phoneNumber: "", deliveryAddress: "" });
    } catch (error) {
      toast({ title: "Request failed", description: "Could not send rental request. Please try again.", variant: "destructive" });
    } finally {
      setBooking(false);
    }
  };

  const handlePaymentSuccess = (paymentId: string) => {
    toast({ 
      title: "Payment Successful!", 
      description: "Your rental has been confirmed and payment processed." 
    });
    setShowPayment(false);
    setCurrentRentalId(null);
    setDateRange({ from: undefined, to: undefined });
    setContactInfo({ fullName: "", phoneNumber: "", deliveryAddress: "" });
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setCurrentRentalId(null);
  };

  // Remove OTP state and modal related code
  // const handleVerifyOtp = async () => {
  //   setVerifyingOtp(true);
  //   // Simulate OTP check (use 123456 as correct OTP for demo)
  //   if (otp === "123456") {
  //     setOtpError("");
  //     setOtpModalOpen(false);
  //     // Proceed with booking
  //     setBooking(true);
  //     try {
  //       const { error } = await supabase.from("rentals").insert([
  //         {
  //           tool_id: tool!.id,
  //           renter_id: user.id,
  //           owner_id: tool!.owner_id,
  //           start_date: format(dateRange.from, "yyyy-MM-dd"),
  //           end_date: format(dateRange.to, "yyyy-MM-dd"),
  //           total_amount: total,
  //           security_deposit: tool!.security_deposit,
  //           status: "pending",
  //           delivery_address: contactInfo.deliveryAddress,
  //           notes: `Contact: ${contactInfo.fullName} | Phone: ${contactInfo.phoneNumber}`,
  //         },
  //       ]);
  //       if (error) throw error;
  //       toast({ title: "Booking successful!", description: "Your rental request has been placed." });
  //       setDateRange({ from: undefined, to: undefined });
  //       setContactInfo({ fullName: "", phoneNumber: "", deliveryAddress: "" });
  //     } catch (error) {
  //       toast({ title: "Booking failed", description: "Could not book this tool. Please try again.", variant: "destructive" });
  //     } finally {
  //       setBooking(false);
  //     }
  //   } else {
  //     setOtpError("Invalid OTP. Please try again. (Hint: 123456)");
  //   }
  //   setVerifyingOtp(false);
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">Tool not found.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-2xl font-bold">{tool.title}</h1>
            {tool.category?.name && (
              <Badge className="ml-2" variant="secondary">{tool.category.name}</Badge>
            )}
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <ImageGallery images={tool.images || []} title={tool.title} />
                </div>
                <div className="space-y-8">
                  <section className="border rounded-lg p-4 bg-muted/30">
                    <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="fullName" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          value={contactInfo.fullName}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Enter your full name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number *
                        </Label>
                        <Input
                          id="phoneNumber"
                          value={contactInfo.phoneNumber}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                          placeholder="Enter your phone number"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="deliveryAddress" className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Delivery Address *
                        </Label>
                        <Textarea
                          id="deliveryAddress"
                          value={contactInfo.deliveryAddress}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                          placeholder="Enter your complete delivery address"
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  </section>
                  <section className="border rounded-lg p-4 bg-muted/10">
                    <h3 className="font-semibold text-lg mb-4">Booking Details</h3>
                    <div className="mb-4">
                      <div className="font-medium mb-1">Select Rental Dates</div>
                      <DatePicker
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange as any}
                        numberOfMonths={1}
                        disabled={(date) => date < new Date()}
                        className="max-w-xs mb-4"
                      />
                    </div>
                    {days > 0 && (
                      <div className="mb-2 text-sm">
                        <span className="font-medium">{days}</span> day(s) × ₹{tool.price_per_day} + Deposit ₹{tool.security_deposit} =
                        <span className="font-bold text-primary"> ₹{total}</span>
                      </div>
                    )}
                    <Button
                      className="w-full"
                      onClick={handleRequestRental}
                      disabled={booking || !user || !dateRange.from || !dateRange.to || !contactInfo.fullName.trim() || !contactInfo.phoneNumber.trim() || !contactInfo.deliveryAddress.trim()}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {booking ? "Sending Request..." : "Request Rental"}
                    </Button>
                    {!user && <div className="text-xs text-destructive mt-2">Sign in to request this tool.</div>}
                  </section>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Payment Dialog */}
          <Dialog open={showPayment} onOpenChange={setShowPayment}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Complete Payment
                </DialogTitle>
              </DialogHeader>
              {currentRentalId && (
                <StripePaymentForm
                  amount={total}
                  rentalId={currentRentalId}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handlePaymentCancel}
                  currency="inr"
                />
              )}
            </DialogContent>
          </Dialog>


        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ToolDetail; 