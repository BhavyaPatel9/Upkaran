import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ucnasxinqweimswkzwgm.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

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
    title: "Hilti TE 3000 Demolition Hammer",
    description: "Professional demolition hammer with 30kg weight. Used for breaking concrete and rock.",
    category_id: "6",
    price_per_day: 500,
    security_deposit: 3000,
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