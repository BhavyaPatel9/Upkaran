-- Seed data for Upkaran tool rental marketplace
-- This script adds 5-6 tools per category for all six categories

-- Drilling Tools (Category 1)
INSERT INTO public.tools (title, description, category_id, price_per_day, security_deposit, location, images, owner_id, is_available, status, owner_name) VALUES
('Bosch India Professional Drill', 'Heavy-duty 20V MAX cordless drill with hammer function. Perfect for construction and DIY projects. Includes 2 batteries and charger.', 
 (SELECT id FROM public.categories WHERE name = 'Drilling Tools' LIMIT 1), 150, 1000, 'Mumbai, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Amit Sharma'),

('Tata Power Hammer Drill', 'Professional grade hammer drill with SDS-plus chuck. Ideal for concrete drilling and heavy construction work.', 
 (SELECT id FROM public.categories WHERE name = 'Drilling Tools' LIMIT 1), 200, 1500, 'Delhi, NCR', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Priya Verma'),

('Godrej Cordless Drill Set', 'Complete 18V drill set with multiple attachments. Great for home renovation and furniture assembly.', 
 (SELECT id FROM public.categories WHERE name = 'Drilling Tools' LIMIT 1), 120, 800, 'Bangalore, Karnataka', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Rahul Nair'),

('Crompton Impact Driver', 'Compact impact driver perfect for driving screws and bolts. Lightweight and easy to handle.', 
 (SELECT id FROM public.categories WHERE name = 'Drilling Tools' LIMIT 1), 100, 600, 'Chennai, Tamil Nadu', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Sneha Iyer'),

('Bajaj Drill Driver Combo', '2-in-1 drill and driver set with LED work light. Perfect for weekend DIY projects.', 
 (SELECT id FROM public.categories WHERE name = 'Drilling Tools' LIMIT 1), 80, 500, 'Hyderabad, Telangana', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Karan Singh'),

('JK Files Hammer Drill', 'Professional demolition hammer drill. Used for breaking concrete and masonry work.', 
 (SELECT id FROM public.categories WHERE name = 'Drilling Tools' LIMIT 1), 300, 2000, 'Pune, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Meera Joshi');

-- Cleaning Equipment (Category 2)
INSERT INTO public.tools (title, description, category_id, price_per_day, security_deposit, location, images, owner_id, is_available, status, owner_name) VALUES
('Eureka Forbes Vacuum Cleaner', 'Cordless stick vacuum with laser dust detection. HEPA filtration and 60-minute runtime.', 
 (SELECT id FROM public.categories WHERE name = 'Cleaning Equipment' LIMIT 1), 180, 1200, 'Mumbai, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Rohan Patel'),

('Karcher India Pressure Washer', 'Professional pressure washer with 2000 PSI. Perfect for cleaning driveways, patios, and vehicles.', 
 (SELECT id FROM public.categories WHERE name = 'Cleaning Equipment' LIMIT 1), 250, 1500, 'Delhi, NCR', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Anjali Deshmukh'),

('Prestige Wet & Dry Vacuum', 'Upright vacuum with lift-away technology. Great for deep cleaning carpets and hard floors.', 
 (SELECT id FROM public.categories WHERE name = 'Cleaning Equipment' LIMIT 1), 120, 800, 'Bangalore, Karnataka', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Suresh Kumar'),

('Inalsa Carpet Cleaner', 'Professional carpet and upholstery cleaner. Removes deep stains and odors.', 
 (SELECT id FROM public.categories WHERE name = 'Cleaning Equipment' LIMIT 1), 200, 1000, 'Chennai, Tamil Nadu', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Pooja Shah'),

('Crompton Mighty Mite Vacuum', 'Compact canister vacuum perfect for small spaces and detailed cleaning.', 
 (SELECT id FROM public.categories WHERE name = 'Cleaning Equipment' LIMIT 1), 80, 400, 'Hyderabad, Telangana', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Deepak Gupta'),

('Bajaj Steamer Carpet Cleaner', 'Commercial grade steam cleaner for carpets, upholstery, and hard surfaces.', 
 (SELECT id FROM public.categories WHERE name = 'Cleaning Equipment' LIMIT 1), 300, 1800, 'Pune, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Kavita Menon');

-- Power Tools (Category 3)
INSERT INTO public.tools (title, description, category_id, price_per_day, security_deposit, location, images, owner_id, is_available, status, owner_name) VALUES
('Bosch India Circular Saw', '18V cordless circular saw with 6-1/2 inch blade. Perfect for cutting wood and plywood.', 
 (SELECT id FROM public.categories WHERE name = 'Power Tools' LIMIT 1), 200, 1200, 'Mumbai, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Arjun Reddy'),

('Tata Orbital Sander', '5-inch random orbital sander with variable speed. Great for wood finishing and paint preparation.', 
 (SELECT id FROM public.categories WHERE name = 'Power Tools' LIMIT 1), 150, 800, 'Delhi, NCR', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Neha Sinha'),

('Godrej Angle Grinder', '4-1/2 inch angle grinder with 11,000 RPM. Perfect for metal cutting and grinding.', 
 (SELECT id FROM public.categories WHERE name = 'Power Tools' LIMIT 1), 180, 1000, 'Bangalore, Karnataka', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Sunil Pillai'),

('Crompton Jigsaw', 'Professional jigsaw with orbital action. Ideal for curved cuts and detailed woodworking.', 
 (SELECT id FROM public.categories WHERE name = 'Power Tools' LIMIT 1), 120, 700, 'Chennai, Tamil Nadu', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Ritu Agarwal'),

('Bajaj Reciprocating Saw', 'Cordless reciprocating saw with variable speed trigger. Great for demolition and cutting pipes.', 
 (SELECT id FROM public.categories WHERE name = 'Power Tools' LIMIT 1), 160, 900, 'Hyderabad, Telangana', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Manish Jain'),

('JK Files Miter Saw', '10-inch compound miter saw with laser guide. Perfect for precise angle cuts and trim work.', 
 (SELECT id FROM public.categories WHERE name = 'Power Tools' LIMIT 1), 250, 1500, 'Pune, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Shalini Rao');

-- Painting Tools (Category 4)
INSERT INTO public.tools (title, description, category_id, price_per_day, security_deposit, location, images, owner_id, is_available, status, owner_name) VALUES
('Asian Paints Sprayer', 'Professional HVLP paint sprayer with adjustable pressure. Perfect for walls, furniture, and automotive painting.', 
 (SELECT id FROM public.categories WHERE name = 'Painting Tools' LIMIT 1), 180, 1000, 'Mumbai, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Rajesh Gupta'),

('Berger Airless Paint Sprayer', 'Commercial grade airless paint sprayer. Ideal for large painting projects and exterior work.', 
 (SELECT id FROM public.categories WHERE name = 'Painting Tools' LIMIT 1), 300, 2000, 'Delhi, NCR', 
 ARRAY['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Swati Mishra'),

('Pidilite Paint Brush Set', 'Professional paint brush set with various sizes. High-quality bristles for smooth finish.', 
 (SELECT id FROM public.categories WHERE name = 'Painting Tools' LIMIT 1), 50, 200, 'Bangalore, Karnataka', 
 ARRAY['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Gaurav Mehta'),

('Nerolac Paint Roller Set', 'Complete paint roller set with extension pole. Includes various nap sizes for different surfaces.', 
 (SELECT id FROM public.categories WHERE name = 'Painting Tools' LIMIT 1), 80, 300, 'Chennai, Tamil Nadu', 
 ARRAY['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Ananya Sen'),

('Crompton HVLP Spray System', 'Professional HVLP spray system with turbine. Perfect for fine finish painting and staining.', 
 (SELECT id FROM public.categories WHERE name = 'Painting Tools' LIMIT 1), 250, 1500, 'Hyderabad, Telangana', 
 ARRAY['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Sandeep Yadav'),

('Berger Paint Mixer', '5-gallon paint mixer attachment for drills. Ensures consistent color mixing and smooth application.', 
 (SELECT id FROM public.categories WHERE name = 'Painting Tools' LIMIT 1), 60, 250, 'Pune, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Rakesh Bansal');

-- Garden Tools (Category 5)
INSERT INTO public.tools (title, description, category_id, price_per_day, security_deposit, location, images, owner_id, is_available, status, owner_name) VALUES
('Falcon Lawn Mower', 'Self-propelled lawn mower with 21-inch cutting deck. Perfect for medium to large lawns.', 
 (SELECT id FROM public.categories WHERE name = 'Garden Tools' LIMIT 1), 200, 1200, 'Mumbai, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Vinod Shetty'),

('Makita Hedge Trimmer', 'Professional hedge trimmer with 24-inch blade. Ideal for shaping bushes and hedges.', 
 (SELECT id FROM public.categories WHERE name = 'Garden Tools' LIMIT 1), 150, 800, 'Delhi, NCR', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Shreya Kapoor'),

('Godrej String Trimmer', 'Gas-powered string trimmer with 21cc engine. Great for edging and trimming grass.', 
 (SELECT id FROM public.categories WHERE name = 'Garden Tools' LIMIT 1), 120, 600, 'Bangalore, Karnataka', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Ajay Malhotra'),

('Crompton Leaf Blower', 'Cordless leaf blower with 20V battery. Perfect for clearing leaves and debris from driveways.', 
 (SELECT id FROM public.categories WHERE name = 'Garden Tools' LIMIT 1), 100, 400, 'Chennai, Tamil Nadu', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Rina Dutta'),

('Bajaj Chainsaw', '16-inch electric chainsaw with automatic oiler. Safe and easy to use for tree trimming.', 
 (SELECT id FROM public.categories WHERE name = 'Garden Tools' LIMIT 1), 180, 1000, 'Hyderabad, Telangana', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Saurabh Chatterjee'),

('Falcon Sprinkler System', 'Automatic sprinkler system with timer. Covers up to 3000 sq ft for efficient lawn watering.', 
 (SELECT id FROM public.categories WHERE name = 'Garden Tools' LIMIT 1), 80, 500, 'Pune, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Nisha Rathi');

-- Construction Tools (Category 6)
INSERT INTO public.tools (title, description, category_id, price_per_day, security_deposit, location, images, owner_id, is_available, status, owner_name) VALUES
('Tata Mini Excavator', '1.5-ton mini excavator with hydraulic thumb. Perfect for small digging projects and landscaping.', 
 (SELECT id FROM public.categories WHERE name = 'Construction Tools' LIMIT 1), 2500, 15000, 'Mumbai, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Prakash Jha'),

('JCB Skid Steer', 'Compact track loader with various attachments. Ideal for construction and material handling.', 
 (SELECT id FROM public.categories WHERE name = 'Construction Tools' LIMIT 1), 3000, 20000, 'Delhi, NCR', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Sheetal Pandey'),

('Godrej Concrete Mixer', 'Portable concrete mixer with 3.5 cubic feet capacity. Perfect for small concrete projects.', 
 (SELECT id FROM public.categories WHERE name = 'Construction Tools' LIMIT 1), 400, 2000, 'Bangalore, Karnataka', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Mohan Das'),

('Bosch India Concrete Saw', '14-inch concrete saw with diamond blade. Used for cutting concrete slabs and masonry.', 
 (SELECT id FROM public.categories WHERE name = 'Construction Tools' LIMIT 1), 350, 1800, 'Chennai, Tamil Nadu', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Farhan Ali'),

('Crompton Rebar Cutter', 'Heavy-duty rebar cutter with 5/8 inch capacity. Essential for construction and reinforcement work.', 
 (SELECT id FROM public.categories WHERE name = 'Construction Tools' LIMIT 1), 200, 1000, 'Hyderabad, Telangana', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Rakesh Singh'),

('JK Files Demolition Hammer', 'Professional demolition hammer with 30kg weight. Used for breaking concrete and rock.', 
 (SELECT id FROM public.categories WHERE name = 'Construction Tools' LIMIT 1), 500, 3000, 'Pune, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Leena Fernandes'); 