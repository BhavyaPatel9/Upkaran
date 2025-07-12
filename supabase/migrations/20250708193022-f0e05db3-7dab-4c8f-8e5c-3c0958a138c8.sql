-- Create storage buckets for the rental marketplace
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('tool-images', 'tool-images', true),
  ('verification-docs', 'verification-docs', false),
  ('user-avatars', 'user-avatars', true);

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  is_verified BOOLEAN DEFAULT false,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tools table for listing items
CREATE TABLE public.tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  title TEXT NOT NULL,
  description TEXT,
  price_per_day DECIMAL(10,2) NOT NULL,
  security_deposit DECIMAL(10,2) DEFAULT 0,
  images TEXT[],
  location TEXT,
  is_available BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending_approval')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rentals table for tracking rental transactions
CREATE TABLE public.rentals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID NOT NULL REFERENCES public.tools(id),
  renter_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  security_deposit DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
  delivery_address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table for payment tracking
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rental_id UUID NOT NULL REFERENCES public.rentals(id),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_type TEXT DEFAULT 'rental' CHECK (payment_type IN ('rental', 'security_deposit', 'late_fee')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create delivery tracking table
CREATE TABLE public.deliveries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rental_id UUID NOT NULL REFERENCES public.rentals(id),
  delivery_type TEXT NOT NULL CHECK (delivery_type IN ('pickup', 'return')),
  address TEXT NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  actual_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_transit', 'delivered', 'failed')),
  tracking_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);

-- RLS Policies for tools
CREATE POLICY "Anyone can view active tools" ON public.tools FOR SELECT USING (status = 'active');
CREATE POLICY "Owners can manage their tools" ON public.tools FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "Users can create tools" ON public.tools FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- RLS Policies for rentals
CREATE POLICY "Users can view their rentals" ON public.rentals FOR SELECT USING (auth.uid() = renter_id OR auth.uid() = owner_id);
CREATE POLICY "Users can create rentals" ON public.rentals FOR INSERT WITH CHECK (auth.uid() = renter_id);
CREATE POLICY "Owners and renters can update rentals" ON public.rentals FOR UPDATE USING (auth.uid() = renter_id OR auth.uid() = owner_id);

-- RLS Policies for payments
CREATE POLICY "Users can view their payments" ON public.payments FOR SELECT USING (
  auth.uid() IN (
    SELECT renter_id FROM public.rentals WHERE id = rental_id
    UNION
    SELECT owner_id FROM public.rentals WHERE id = rental_id
  )
);

-- RLS Policies for deliveries
CREATE POLICY "Users can view their deliveries" ON public.deliveries FOR SELECT USING (
  auth.uid() IN (
    SELECT renter_id FROM public.rentals WHERE id = rental_id
    UNION
    SELECT owner_id FROM public.rentals WHERE id = rental_id
  )
);

-- Storage policies for tool images (public bucket)
CREATE POLICY "Anyone can view tool images" ON storage.objects FOR SELECT USING (bucket_id = 'tool-images');
CREATE POLICY "Authenticated users can upload tool images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'tool-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update their tool images" ON storage.objects FOR UPDATE USING (bucket_id = 'tool-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for user avatars (public bucket)
CREATE POLICY "Anyone can view avatars" ON storage.objects FOR SELECT USING (bucket_id = 'user-avatars');
CREATE POLICY "Users can upload their avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for verification documents (private bucket)
CREATE POLICY "Users can upload their verification docs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'verification-docs' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view their verification docs" ON storage.objects FOR SELECT USING (bucket_id = 'verification-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON public.tools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rentals_updated_at BEFORE UPDATE ON public.rentals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_deliveries_updated_at BEFORE UPDATE ON public.deliveries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.categories (name, description) VALUES
  ('Drilling Tools', 'Power drills, hammer drills, and drilling accessories'),
  ('Cleaning Equipment', 'Vacuum cleaners, pressure washers, and cleaning tools'),
  ('Power Tools', 'Sanders, grinders, saws, and other power equipment'),
  ('Painting Tools', 'Spray guns, brushes, and painting equipment'),
  ('Garden Tools', 'Lawn mowers, trimmers, and gardening equipment'),
  ('Construction Tools', 'Heavy machinery and construction equipment');

-- Add owner_name to tools table
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS owner_name TEXT;