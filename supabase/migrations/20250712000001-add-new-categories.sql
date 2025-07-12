-- Add new categories for Upkaran tool rental platform
-- This migration adds Engineering Tools and other relevant categories

-- Insert new categories
INSERT INTO public.categories (name, description) VALUES
  ('Engineering Tools', 'Precision measuring instruments, calipers, micrometers, and engineering equipment'),
  ('Welding Equipment', 'Arc welders, MIG welders, TIG welders, and welding accessories'),
  ('Plumbing Tools', 'Pipe wrenches, pipe cutters, soldering equipment, and plumbing accessories'),
  ('Electrical Tools', 'Multimeters, wire strippers, crimping tools, and electrical testing equipment'),
  ('Automotive Tools', 'Car diagnostic tools, jacks, impact wrenches, and automotive repair equipment'),
  ('Woodworking Tools', 'Chisels, planes, routers, and traditional woodworking hand tools'),
  ('Safety Equipment', 'Hard hats, safety glasses, gloves, harnesses, and protective gear'),
  ('Lifting Equipment', 'Cranes, hoists, jacks, and material handling equipment'),
  ('Surveying Tools', 'Laser levels, theodolites, measuring tapes, and surveying equipment'),
  ('HVAC Equipment', 'Air conditioners, heaters, ventilation systems, and climate control tools');

-- Add sample tools for Engineering Tools category
INSERT INTO public.tools (title, description, category_id, price_per_day, security_deposit, location, images, owner_id, is_available, status, owner_name) VALUES
('Mitutoyo Digital Caliper', 'Professional digital caliper with 0.01mm accuracy. Perfect for precision measurements in engineering and manufacturing.', 
 (SELECT id FROM public.categories WHERE name = 'Engineering Tools' LIMIT 1), 120, 800, 'Mumbai, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Dr. Rajesh Kumar'),

('Starrett Micrometer Set', 'Complete micrometer set with 0-25mm, 25-50mm, and 50-75mm ranges. Essential for precision engineering work.', 
 (SELECT id FROM public.categories WHERE name = 'Engineering Tools' LIMIT 1), 200, 1500, 'Delhi, NCR', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Prof. Meera Singh'),

('Fluke Multimeter', 'Professional digital multimeter with true RMS measurement. Ideal for electrical and electronic testing.', 
 (SELECT id FROM public.categories WHERE name = 'Engineering Tools' LIMIT 1), 150, 1000, 'Bangalore, Karnataka', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Arun Patel'),

('WEN Laser Level', 'Self-leveling laser level with 360-degree coverage. Perfect for construction and alignment projects.', 
 (SELECT id FROM public.categories WHERE name = 'Engineering Tools' LIMIT 1), 100, 600, 'Chennai, Tamil Nadu', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Suresh Iyer'),

('Bosch Laser Distance Meter', 'Professional laser distance meter with 165ft range. Essential for surveying and construction measurements.', 
 (SELECT id FROM public.categories WHERE name = 'Engineering Tools' LIMIT 1), 80, 500, 'Hyderabad, Telangana', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Kiran Reddy'),

('DeWalt Angle Finder', 'Digital angle finder with magnetic base. Perfect for precise angle measurements in woodworking and metalwork.', 
 (SELECT id FROM public.categories WHERE name = 'Engineering Tools' LIMIT 1), 60, 300, 'Pune, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Vikram Malhotra');

-- Add sample tools for Welding Equipment category
INSERT INTO public.tools (title, description, category_id, price_per_day, security_deposit, location, images, owner_id, is_available, status, owner_name) VALUES
('Lincoln Electric MIG Welder', 'Professional MIG welder with 140A output. Perfect for automotive and fabrication work.', 
 (SELECT id FROM public.categories WHERE name = 'Welding Equipment' LIMIT 1), 300, 2000, 'Mumbai, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Ramesh Sharma'),

('Miller TIG Welder', 'Precision TIG welder with foot pedal control. Ideal for aluminum and stainless steel welding.', 
 (SELECT id FROM public.categories WHERE name = 'Welding Equipment' LIMIT 1), 400, 2500, 'Delhi, NCR', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Amit Kumar'),

('Hobart Arc Welder', 'Heavy-duty arc welder with 225A output. Perfect for construction and industrial welding.', 
 (SELECT id FROM public.categories WHERE name = 'Welding Equipment' LIMIT 1), 250, 1500, 'Bangalore, Karnataka', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Prakash Das'),

('ESAB Plasma Cutter', 'Professional plasma cutter with 40A output. Ideal for cutting steel, aluminum, and other metals.', 
 (SELECT id FROM public.categories WHERE name = 'Welding Equipment' LIMIT 1), 350, 2200, 'Chennai, Tamil Nadu', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Senthil Kumar'),

('Hypertherm Oxy-Fuel Torch', 'Complete oxy-fuel cutting setup with tanks and regulators. Essential for heavy metal cutting.', 
 (SELECT id FROM public.categories WHERE name = 'Welding Equipment' LIMIT 1), 200, 1200, 'Hyderabad, Telangana', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Ravi Teja'),

('Forney Welding Helmet', 'Auto-darkening welding helmet with solar power. Professional protection for all welding applications.', 
 (SELECT id FROM public.categories WHERE name = 'Welding Equipment' LIMIT 1), 50, 300, 'Pune, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Naresh Gupta');

-- Add sample tools for Plumbing Tools category
INSERT INTO public.tools (title, description, category_id, price_per_day, security_deposit, location, images, owner_id, is_available, status, owner_name) VALUES
('Ridgid Pipe Wrench Set', 'Complete set of pipe wrenches from 8" to 24". Essential for plumbing installation and repair.', 
 (SELECT id FROM public.categories WHERE name = 'Plumbing Tools' LIMIT 1), 80, 500, 'Mumbai, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Sanjay Patel'),

('Milwaukee PEX Crimper', 'Professional PEX crimping tool with multiple jaw sizes. Perfect for modern plumbing installations.', 
 (SELECT id FROM public.categories WHERE name = 'Plumbing Tools' LIMIT 1), 120, 800, 'Delhi, NCR', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Rajesh Verma'),

('Weller Soldering Station', 'Professional soldering station with temperature control. Ideal for copper pipe soldering.', 
 (SELECT id FROM public.categories WHERE name = 'Plumbing Tools' LIMIT 1), 100, 600, 'Bangalore, Karnataka', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Mohan Reddy'),

('Roto-Rooter Drain Snake', 'Heavy-duty drain snake with 50ft cable. Perfect for clearing clogged drains and pipes.', 
 (SELECT id FROM public.categories WHERE name = 'Plumbing Tools' LIMIT 1), 150, 1000, 'Chennai, Tamil Nadu', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Karthik Iyer'),

('Klein Pipe Cutter', 'Professional pipe cutter for copper, PVC, and PEX pipes. Clean cuts for perfect fittings.', 
 (SELECT id FROM public.categories WHERE name = 'Plumbing Tools' LIMIT 1), 60, 400, 'Hyderabad, Telangana', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Srinivas Rao'),

('Ridgid Threading Machine', 'Heavy-duty pipe threading machine for steel pipes. Essential for industrial plumbing work.', 
 (SELECT id FROM public.categories WHERE name = 'Plumbing Tools' LIMIT 1), 200, 1500, 'Pune, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Anand Deshmukh');

-- Add sample tools for Electrical Tools category
INSERT INTO public.tools (title, description, category_id, price_per_day, security_deposit, location, images, owner_id, is_available, status, owner_name) VALUES
('Fluke Clamp Meter', 'Professional clamp meter with true RMS measurement. Perfect for electrical troubleshooting.', 
 (SELECT id FROM public.categories WHERE name = 'Electrical Tools' LIMIT 1), 150, 1000, 'Mumbai, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Vikram Singh'),

('Klein Wire Stripper Set', 'Complete wire stripper set with crimping capabilities. Essential for electrical installations.', 
 (SELECT id FROM public.categories WHERE name = 'Electrical Tools' LIMIT 1), 80, 500, 'Delhi, NCR', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Rahul Sharma'),

('Milwaukee Cable Tester', 'Professional cable tester for network and electrical cables. Ideal for IT and electrical work.', 
 (SELECT id FROM public.categories WHERE name = 'Electrical Tools' LIMIT 1), 100, 600, 'Bangalore, Karnataka', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Arun Kumar'),

('DeWalt Circuit Tracer', 'Professional circuit tracer for finding breakers and tracing electrical circuits.', 
 (SELECT id FROM public.categories WHERE name = 'Electrical Tools' LIMIT 1), 120, 800, 'Chennai, Tamil Nadu', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Suresh Iyer'),

('Klein Voltage Tester', 'Non-contact voltage tester with LED indicators. Safe and reliable electrical testing.', 
 (SELECT id FROM public.categories WHERE name = 'Electrical Tools' LIMIT 1), 50, 300, 'Hyderabad, Telangana', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Kiran Reddy'),

('Ridgid Conduit Bender', 'Professional conduit bender for electrical installations. Perfect for commercial electrical work.', 
 (SELECT id FROM public.categories WHERE name = 'Electrical Tools' LIMIT 1), 180, 1200, 'Pune, Maharashtra', 
 ARRAY['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'], 
 '00000000-0000-0000-0000-000000000000', true, 'active', 'Prakash Joshi'); 