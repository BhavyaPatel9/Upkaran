-- Add Stripe-specific fields to payments table
ALTER TABLE public.payments 
ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_payment_method_id TEXT,
ADD COLUMN IF NOT EXISTS payment_provider TEXT DEFAULT 'razorpay' CHECK (payment_provider IN ('razorpay', 'stripe'));

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_payments_stripe_intent ON public.payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payments_provider ON public.payments(payment_provider); 