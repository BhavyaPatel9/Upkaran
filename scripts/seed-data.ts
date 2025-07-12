import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://ucnasxinqweimswkzwgm.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!SUPABASE_SERVICE_KEY) {
  console.warn("Warning: SUPABASE_SERVICE_ROLE_KEY not found in environment variables. Some operations may fail.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const sampleTools = [
  // Drilling Tools (Category 1)
  {
    title: "Professional DeWalt Drill Machine",
    description: "Heavy-duty 20V MAX cordless drill with hammer function. Perfect for construction and DIY projects. Includes 2 batteries and charger.",
    category_id: "1", // Will be replaced with actual UUID
    price_per_day: 150,
    security_deposit: 1000,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop&crop=center"
    ]
  },
  {
    title: "Bosch Hammer Drill",
    description: "Professional grade hammer drill with SDS-plus chuck. Ideal for concrete drilling and heavy construction work.",
    category_id: "1",
    price_per_day: 200,
    security_deposit: 1500,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Makita Cordless Drill Set",
    description: "Complete 18V drill set with multiple attachments. Great for home renovation and furniture assembly.",
    category_id: "1",
    price_per_day: 120,
    security_deposit: 800,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Black & Decker Impact Driver",
    description: "Compact impact driver perfect for driving screws and bolts. Lightweight and easy to handle.",
    category_id: "1",
    price_per_day: 100,
    security_deposit: 600,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Ryobi Drill Driver Combo",
    description: "2-in-1 drill and driver set with LED work light. Perfect for weekend DIY projects.",
    category_id: "1",
    price_per_day: 80,
    security_deposit: 500,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Hilti TE 2-A22 Hammer Drill",
    description: "Professional demolition hammer drill. Used for breaking concrete and masonry work.",
    category_id: "1",
    price_per_day: 300,
    security_deposit: 2000,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // Cleaning Equipment (Category 2)
  {
    title: "Dyson V15 Detect Vacuum Cleaner",
    description: "Cordless stick vacuum with laser dust detection. HEPA filtration and 60-minute runtime.",
    category_id: "2",
    price_per_day: 180,
    security_deposit: 1200,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Karcher Pressure Washer",
    description: "Professional pressure washer with 2000 PSI. Perfect for cleaning driveways, patios, and vehicles.",
    category_id: "2",
    price_per_day: 250,
    security_deposit: 1500,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Shark Navigator Vacuum",
    description: "Upright vacuum with lift-away technology. Great for deep cleaning carpets and hard floors.",
    category_id: "2",
    price_per_day: 120,
    security_deposit: 800,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Bissell Carpet Cleaner",
    description: "Professional carpet and upholstery cleaner. Removes deep stains and odors.",
    category_id: "2",
    price_per_day: 200,
    security_deposit: 1000,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Eureka Mighty Mite Vacuum",
    description: "Compact canister vacuum perfect for small spaces and detailed cleaning.",
    category_id: "2",
    price_per_day: 80,
    security_deposit: 400,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Stanley Steamer Carpet Cleaner",
    description: "Commercial grade steam cleaner for carpets, upholstery, and hard surfaces.",
    category_id: "2",
    price_per_day: 300,
    security_deposit: 1800,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },

  // Power Tools (Category 3)
  {
    title: "Milwaukee M18 Circular Saw",
    description: "18V cordless circular saw with 6-1/2 inch blade. Perfect for cutting wood and plywood.",
    category_id: "3",
    price_per_day: 200,
    security_deposit: 1200,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "DeWalt Random Orbital Sander",
    description: "5-inch random orbital sander with variable speed. Great for wood finishing and paint preparation.",
    category_id: "3",
    price_per_day: 150,
    security_deposit: 800,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Makita Angle Grinder",
    description: "4-1/2 inch angle grinder with 11,000 RPM. Perfect for metal cutting and grinding.",
    category_id: "3",
    price_per_day: 180,
    security_deposit: 1000,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Bosch Jigsaw",
    description: "Professional jigsaw with orbital action. Ideal for curved cuts and detailed woodworking.",
    category_id: "3",
    price_per_day: 120,
    security_deposit: 700,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Ryobi Reciprocating Saw",
    description: "Cordless reciprocating saw with variable speed trigger. Great for demolition and cutting pipes.",
    category_id: "3",
    price_per_day: 160,
    security_deposit: 900,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Hitachi Miter Saw",
    description: "10-inch compound miter saw with laser guide. Perfect for precise angle cuts and trim work.",
    category_id: "3",
    price_per_day: 250,
    security_deposit: 1500,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // Painting Tools (Category 4)
  {
    title: "Wagner Paint Sprayer",
    description: "Professional HVLP paint sprayer with adjustable pressure. Perfect for walls, furniture, and automotive painting.",
    category_id: "4",
    price_per_day: 180,
    security_deposit: 1000,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Graco Airless Paint Sprayer",
    description: "Commercial grade airless paint sprayer. Ideal for large painting projects and exterior work.",
    category_id: "4",
    price_per_day: 300,
    security_deposit: 2000,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Purdy Paint Brush Set",
    description: "Professional paint brush set with various sizes. High-quality bristles for smooth finish.",
    category_id: "4",
    price_per_day: 50,
    security_deposit: 200,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Wooster Paint Roller Set",
    description: "Complete paint roller set with extension pole. Includes various nap sizes for different surfaces.",
    category_id: "4",
    price_per_day: 80,
    security_deposit: 300,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Fuji Semi-PRO 2 HVLP",
    description: "Professional HVLP spray system with turbine. Perfect for fine finish painting and staining.",
    category_id: "4",
    price_per_day: 250,
    security_deposit: 1500,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Sherwin-Williams Paint Mixer",
    description: "5-gallon paint mixer attachment for drills. Ensures consistent color mixing and smooth application.",
    category_id: "4",
    price_per_day: 60,
    security_deposit: 250,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop"
    ]
  },

  // Garden Tools (Category 5)
  {
    title: "Honda Lawn Mower",
    description: "Self-propelled lawn mower with 21-inch cutting deck. Perfect for medium to large lawns.",
    category_id: "5",
    price_per_day: 200,
    security_deposit: 1200,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Stihl Hedge Trimmer",
    description: "Professional hedge trimmer with 24-inch blade. Ideal for shaping bushes and hedges.",
    category_id: "5",
    price_per_day: 150,
    security_deposit: 800,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Echo String Trimmer",
    description: "Gas-powered string trimmer with 21cc engine. Great for edging and trimming grass.",
    category_id: "5",
    price_per_day: 120,
    security_deposit: 600,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Black & Decker Leaf Blower",
    description: "Cordless leaf blower with 20V battery. Perfect for clearing leaves and debris from driveways.",
    category_id: "5",
    price_per_day: 100,
    security_deposit: 400,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Makita Chainsaw",
    description: "16-inch electric chainsaw with automatic oiler. Safe and easy to use for tree trimming.",
    category_id: "5",
    price_per_day: 180,
    security_deposit: 1000,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Toro Sprinkler System",
    description: "Automatic sprinkler system with timer. Covers up to 3000 sq ft for efficient lawn watering.",
    category_id: "5",
    price_per_day: 80,
    security_deposit: 500,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    ]
  },

  // Construction Tools (Category 6)
  {
    title: "JCB Mini Excavator",
    description: "1.5-ton mini excavator with hydraulic thumb. Perfect for small digging projects and landscaping.",
    category_id: "6",
    price_per_day: 2500,
    security_deposit: 15000,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Caterpillar Skid Steer",
    description: "Compact track loader with various attachments. Ideal for construction and material handling.",
    category_id: "6",
    price_per_day: 3000,
    security_deposit: 20000,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Bobcat Concrete Mixer",
    description: "Portable concrete mixer with 3.5 cubic feet capacity. Perfect for small concrete projects.",
    category_id: "6",
    price_per_day: 400,
    security_deposit: 2000,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "DeWalt Concrete Saw",
    description: "14-inch concrete saw with diamond blade. Used for cutting concrete slabs and masonry.",
    category_id: "6",
    price_per_day: 350,
    security_deposit: 1800,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Milwaukee Rebar Cutter",
    description: "Heavy-duty rebar cutter with 5/8 inch capacity. Essential for construction and reinforcement work.",
    category_id: "6",
    price_per_day: 200,
    security_deposit: 1000,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Hilti Demolition Hammer",
    description: "Professional demolition hammer with 30kg weight. Used for breaking concrete and rock.",
    category_id: "6",
    price_per_day: 500,
    security_deposit: 3000,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // Engineering Tools (Category 7)
  {
    title: "Mitutoyo Digital Caliper",
    description: "Professional digital caliper with 0.01mm accuracy. Perfect for precision measurements in engineering and manufacturing.",
    category_id: "7",
    price_per_day: 120,
    security_deposit: 800,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Starrett Micrometer Set",
    description: "Complete micrometer set with 0-25mm, 25-50mm, and 50-75mm ranges. Essential for precision engineering work.",
    category_id: "7",
    price_per_day: 200,
    security_deposit: 1500,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Fluke Multimeter",
    description: "Professional digital multimeter with true RMS measurement. Ideal for electrical and electronic testing.",
    category_id: "7",
    price_per_day: 150,
    security_deposit: 1000,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "WEN Laser Level",
    description: "Self-leveling laser level with 360-degree coverage. Perfect for construction and alignment projects.",
    category_id: "7",
    price_per_day: 100,
    security_deposit: 600,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Bosch Laser Distance Meter",
    description: "Professional laser distance meter with 165ft range. Essential for surveying and construction measurements.",
    category_id: "7",
    price_per_day: 80,
    security_deposit: 500,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "DeWalt Angle Finder",
    description: "Digital angle finder with magnetic base. Perfect for precise angle measurements in woodworking and metalwork.",
    category_id: "7",
    price_per_day: 60,
    security_deposit: 300,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // Welding Equipment (Category 8)
  {
    title: "Lincoln Electric MIG Welder",
    description: "Professional MIG welder with 140A output. Perfect for automotive and fabrication work.",
    category_id: "8",
    price_per_day: 300,
    security_deposit: 2000,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Miller TIG Welder",
    description: "Precision TIG welder with foot pedal control. Ideal for aluminum and stainless steel welding.",
    category_id: "8",
    price_per_day: 400,
    security_deposit: 2500,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Hobart Arc Welder",
    description: "Heavy-duty arc welder with 225A output. Perfect for construction and industrial welding.",
    category_id: "8",
    price_per_day: 250,
    security_deposit: 1500,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "ESAB Plasma Cutter",
    description: "Professional plasma cutter with 40A output. Ideal for cutting steel, aluminum, and other metals.",
    category_id: "8",
    price_per_day: 350,
    security_deposit: 2200,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Hypertherm Oxy-Fuel Torch",
    description: "Complete oxy-fuel cutting setup with tanks and regulators. Essential for heavy metal cutting.",
    category_id: "8",
    price_per_day: 200,
    security_deposit: 1200,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Forney Welding Helmet",
    description: "Auto-darkening welding helmet with solar power. Professional protection for all welding applications.",
    category_id: "8",
    price_per_day: 50,
    security_deposit: 300,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // Plumbing Tools (Category 9)
  {
    title: "Ridgid Pipe Wrench Set",
    description: "Complete set of pipe wrenches from 8\" to 24\". Essential for plumbing installation and repair.",
    category_id: "9",
    price_per_day: 80,
    security_deposit: 500,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Milwaukee PEX Crimper",
    description: "Professional PEX crimping tool with multiple jaw sizes. Perfect for modern plumbing installations.",
    category_id: "9",
    price_per_day: 120,
    security_deposit: 800,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Weller Soldering Station",
    description: "Professional soldering station with temperature control. Ideal for copper pipe soldering.",
    category_id: "9",
    price_per_day: 100,
    security_deposit: 600,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Roto-Rooter Drain Snake",
    description: "Heavy-duty drain snake with 50ft cable. Perfect for clearing clogged drains and pipes.",
    category_id: "9",
    price_per_day: 150,
    security_deposit: 1000,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Klein Pipe Cutter",
    description: "Professional pipe cutter for copper, PVC, and PEX pipes. Clean cuts for perfect fittings.",
    category_id: "9",
    price_per_day: 60,
    security_deposit: 400,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Ridgid Threading Machine",
    description: "Heavy-duty pipe threading machine for steel pipes. Essential for industrial plumbing work.",
    category_id: "9",
    price_per_day: 200,
    security_deposit: 1500,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // Electrical Tools (Category 10)
  {
    title: "Fluke Clamp Meter",
    description: "Professional clamp meter with true RMS measurement. Perfect for electrical troubleshooting.",
    category_id: "10",
    price_per_day: 150,
    security_deposit: 1000,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Klein Wire Stripper Set",
    description: "Complete wire stripper set with crimping capabilities. Essential for electrical installations.",
    category_id: "10",
    price_per_day: 80,
    security_deposit: 500,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Milwaukee Cable Tester",
    description: "Professional cable tester for network and electrical cables. Ideal for IT and electrical work.",
    category_id: "10",
    price_per_day: 100,
    security_deposit: 600,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "DeWalt Circuit Tracer",
    description: "Professional circuit tracer for finding breakers and tracing electrical circuits.",
    category_id: "10",
    price_per_day: 120,
    security_deposit: 800,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Klein Voltage Tester",
    description: "Non-contact voltage tester with LED indicators. Safe and reliable electrical testing.",
    category_id: "10",
    price_per_day: 50,
    security_deposit: 300,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Ridgid Conduit Bender",
    description: "Professional conduit bender for electrical installations. Perfect for commercial electrical work.",
    category_id: "10",
    price_per_day: 180,
    security_deposit: 1200,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // Automotive Tools (Category 11)
  {
    title: "Autel MaxiCOM Scanner",
    description: "Professional OBD2 scanner with full system diagnostics. Perfect for automotive troubleshooting.",
    category_id: "11",
    price_per_day: 200,
    security_deposit: 1500,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Milwaukee Impact Wrench",
    description: "Heavy-duty impact wrench with 1/2 inch drive. Essential for automotive repair work.",
    category_id: "11",
    price_per_day: 150,
    security_deposit: 1000,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Harbor Freight Engine Hoist",
    description: "2-ton engine hoist with hydraulic lift. Perfect for engine removal and installation.",
    category_id: "11",
    price_per_day: 300,
    security_deposit: 2000,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "DeWalt Battery Tester",
    description: "Professional battery tester for automotive and marine batteries. Essential for diagnostics.",
    category_id: "11",
    price_per_day: 80,
    security_deposit: 500,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Klein Brake Bleeder",
    description: "Professional brake bleeder kit for automotive brake system maintenance.",
    category_id: "11",
    price_per_day: 100,
    security_deposit: 600,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Ridgid Transmission Jack",
    description: "Heavy-duty transmission jack with safety lock. Essential for transmission work.",
    category_id: "11",
    price_per_day: 250,
    security_deposit: 1500,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // Woodworking Tools (Category 12)
  {
    title: "Stanley Chisel Set",
    description: "Professional chisel set with 8 different sizes. Essential for traditional woodworking.",
    category_id: "12",
    price_per_day: 60,
    security_deposit: 400,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "DeWalt Router Set",
    description: "Complete router set with multiple bits and templates. Perfect for detailed woodworking.",
    category_id: "12",
    price_per_day: 120,
    security_deposit: 800,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Lie-Nielsen Plane Set",
    description: "Professional hand plane set for fine woodworking. Traditional craftsmanship tools.",
    category_id: "12",
    price_per_day: 150,
    security_deposit: 1000,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Festool Domino Joiner",
    description: "Precision domino joiner for perfect wood joints. Professional woodworking equipment.",
    category_id: "12",
    price_per_day: 200,
    security_deposit: 1500,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Veritas Dovetail Jig",
    description: "Professional dovetail jig for perfect joinery. Essential for fine woodworking.",
    category_id: "12",
    price_per_day: 100,
    security_deposit: 600,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Bosch Biscuit Joiner",
    description: "Professional biscuit joiner for strong wood joints. Perfect for cabinet making.",
    category_id: "12",
    price_per_day: 80,
    security_deposit: 500,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // Safety Equipment (Category 13)
  {
    title: "3M Hard Hat Set",
    description: "Professional hard hat set with chin straps. Essential for construction safety.",
    category_id: "13",
    price_per_day: 30,
    security_deposit: 200,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Honeywell Safety Glasses",
    description: "Professional safety glasses with UV protection. Perfect for all work environments.",
    category_id: "13",
    price_per_day: 20,
    security_deposit: 100,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Ansell Safety Gloves",
    description: "Heavy-duty safety gloves for various applications. Essential for hand protection.",
    category_id: "13",
    price_per_day: 25,
    security_deposit: 150,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Miller Fall Protection Harness",
    description: "Professional fall protection harness with lanyard. Essential for height work.",
    category_id: "13",
    price_per_day: 80,
    security_deposit: 500,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "3M Respirator Set",
    description: "Professional respirator set with filters. Essential for dust and chemical protection.",
    category_id: "13",
    price_per_day: 40,
    security_deposit: 250,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Honeywell Safety Vest",
    description: "High-visibility safety vest with reflective strips. Essential for construction sites.",
    category_id: "13",
    price_per_day: 15,
    security_deposit: 100,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // Lifting Equipment (Category 14)
  {
    title: "Genie Scissor Lift",
    description: "Professional scissor lift with 19ft working height. Perfect for construction and maintenance.",
    category_id: "14",
    price_per_day: 800,
    security_deposit: 5000,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "JLG Boom Lift",
    description: "Articulating boom lift with 40ft reach. Essential for high-rise construction work.",
    category_id: "14",
    price_per_day: 1200,
    security_deposit: 8000,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Harbor Freight Engine Hoist",
    description: "2-ton engine hoist with hydraulic lift. Perfect for automotive and industrial lifting.",
    category_id: "14",
    price_per_day: 150,
    security_deposit: 1000,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Milwaukee Chain Hoist",
    description: "Heavy-duty chain hoist with 2-ton capacity. Essential for material handling.",
    category_id: "14",
    price_per_day: 100,
    security_deposit: 600,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "DeWalt Pallet Jack",
    description: "Heavy-duty pallet jack with 5000lb capacity. Perfect for warehouse operations.",
    category_id: "14",
    price_per_day: 60,
    security_deposit: 400,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Ridgid Pipe Jack",
    description: "Professional pipe jack for heavy pipe handling. Essential for plumbing and construction.",
    category_id: "14",
    price_per_day: 80,
    security_deposit: 500,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // Surveying Tools (Category 15)
  {
    title: "Leica Total Station",
    description: "Professional total station for precise surveying. Essential for construction layout.",
    category_id: "15",
    price_per_day: 500,
    security_deposit: 3000,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Topcon Laser Level",
    description: "Professional laser level with automatic leveling. Perfect for construction alignment.",
    category_id: "15",
    price_per_day: 200,
    security_deposit: 1200,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Stanley Measuring Tape Set",
    description: "Professional measuring tape set with various lengths. Essential for all construction work.",
    category_id: "15",
    price_per_day: 30,
    security_deposit: 200,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "DeWalt Theodolite",
    description: "Professional theodolite for angle measurements. Essential for surveying work.",
    category_id: "15",
    price_per_day: 300,
    security_deposit: 2000,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Bosch Distance Meter",
    description: "Professional laser distance meter with 165ft range. Perfect for quick measurements.",
    category_id: "15",
    price_per_day: 80,
    security_deposit: 500,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Milwaukee Level Set",
    description: "Professional level set with various sizes. Essential for construction alignment.",
    category_id: "15",
    price_per_day: 50,
    security_deposit: 300,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },

  // HVAC Equipment (Category 16)
  {
    title: "Carrier Air Conditioner",
    description: "Professional air conditioner with 2-ton capacity. Perfect for commercial installations.",
    category_id: "16",
    price_per_day: 300,
    security_deposit: 2000,
    location: "Mumbai, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Trane Heat Pump",
    description: "Professional heat pump system for year-round climate control.",
    category_id: "16",
    price_per_day: 400,
    security_deposit: 2500,
    location: "Delhi, NCR",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Lennox Furnace",
    description: "Professional gas furnace with high efficiency rating. Essential for heating systems.",
    category_id: "16",
    price_per_day: 250,
    security_deposit: 1500,
    location: "Bangalore, Karnataka",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Rheem Water Heater",
    description: "Professional water heater with 50-gallon capacity. Perfect for commercial use.",
    category_id: "16",
    price_per_day: 150,
    security_deposit: 1000,
    location: "Chennai, Tamil Nadu",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Goodman Ventilation System",
    description: "Professional ventilation system for air quality control. Essential for commercial buildings.",
    category_id: "16",
    price_per_day: 200,
    security_deposit: 1200,
    location: "Hyderabad, Telangana",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "York Dehumidifier",
    description: "Professional dehumidifier for moisture control. Perfect for basements and storage areas.",
    category_id: "16",
    price_per_day: 100,
    security_deposit: 600,
    location: "Pune, Maharashtra",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop"
    ]
  }
];

async function seedData() {
  try {
    console.log('Starting data seeding...');

    // First, get the actual category IDs
    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .select('id, name')
      .order('name');

    if (categoryError) {
      throw categoryError;
    }

    console.log('Found categories:', categories);

    // Create a mapping of category names to IDs
    const categoryMap: { [key: string]: string } = {};
    categories.forEach((cat, index) => {
      categoryMap[String(index + 1)] = cat.id;
    });

    // Insert tools with proper category IDs
    for (const tool of sampleTools) {
      const toolData = {
        ...tool,
        category_id: categoryMap[tool.category_id],
        owner_id: '00000000-0000-0000-0000-000000000000', // Placeholder owner ID
        is_available: true,
        status: 'active'
      };

      const { error } = await supabase
        .from('tools')
        .insert([toolData]);

      if (error) {
        console.error(`Error inserting tool "${tool.title}":`, error);
      } else {
        console.log(`✅ Inserted: ${tool.title}`);
      }
    }

    console.log('Data seeding completed!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seedData(); 