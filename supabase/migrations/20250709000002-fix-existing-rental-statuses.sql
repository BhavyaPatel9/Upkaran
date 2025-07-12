-- First, update existing rental statuses to match the new constraint
UPDATE public.rentals 
SET status = 'pending_approval' 
WHERE status = 'pending';

UPDATE public.rentals 
SET status = 'approved' 
WHERE status = 'confirmed';

UPDATE public.rentals 
SET status = 'active' 
WHERE status IN ('active', 'completed');

-- Now apply the new constraint
ALTER TABLE public.rentals 
DROP CONSTRAINT IF EXISTS rentals_status_check;

ALTER TABLE public.rentals 
ADD CONSTRAINT rentals_status_check 
CHECK (status IN ('pending_approval', 'approved', 'payment_pending', 'payment_completed', 'active', 'completed', 'cancelled', 'rejected'));

-- Add approval fields
ALTER TABLE public.rentals 
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS approved_by UUID,
ADD COLUMN IF NOT EXISTS approval_notes TEXT,
ADD COLUMN IF NOT EXISTS payment_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS delivery_confirmed_at TIMESTAMP WITH TIME ZONE;

-- Create rental_approvals table for tracking approval history
CREATE TABLE IF NOT EXISTS public.rental_approvals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rental_id UUID NOT NULL REFERENCES public.rentals(id),
  action TEXT NOT NULL CHECK (action IN ('approve', 'reject', 'request_payment')),
  notes TEXT,
  approved_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for rental_approvals
ALTER TABLE public.rental_approvals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rental_approvals
CREATE POLICY "Users can view their rental approvals" ON public.rental_approvals 
FOR SELECT USING (
  auth.uid() IN (
    SELECT renter_id FROM public.rentals WHERE id = rental_id
    UNION
    SELECT owner_id FROM public.rentals WHERE id = rental_id
  )
);

CREATE POLICY "Owners can create rental approvals" ON public.rental_approvals 
FOR INSERT WITH CHECK (
  auth.uid() IN (
    SELECT owner_id FROM public.rentals WHERE id = rental_id
  )
); 