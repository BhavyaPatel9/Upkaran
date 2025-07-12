# Upkaran - Tool Rental Platform

A modern tool rental platform built with React, Supabase, and Stripe payments. Rent power tools, construction equipment, and DIY tools from verified owners in your area.

## 🚀 Features

- **Tool Browsing**: Browse tools by category (Drilling, Cleaning, Power Tools, Painting, Gardening, Construction, Engineering, Welding, Plumbing, Electrical, Automotive, Woodworking, Safety, Lifting, Surveying, HVAC)
- **User Authentication**: Secure login/signup with Supabase Auth
- **Rental Workflow**: Request → Approve → Pay → Deliver workflow
- **Stripe Payments**: Secure payment processing with Stripe
- **Owner Dashboard**: Manage tools, approve rentals, track earnings
- **User Dashboard**: View rental history, manage bookings
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Payments**: Stripe
- **Deployment**: Vercel/Netlify ready

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account (for payments)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/BhavyaPatel9/Upkaran.git
cd Upkaran
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🗄️ Database Setup

### 1. Supabase Setup
1. Create a new Supabase project
2. Run the migration files in `supabase/migrations/`
3. Set up environment variables in your Supabase dashboard

### 2. Seed Sample Data
To populate your database with sample tools:

1. **Open your Supabase Dashboard**
2. **Go to SQL Editor**
3. **Copy and paste the contents** of `supabase/seed-data.sql`
4. **Run the SQL script**

This will add 36 sample tools (6 per category) with realistic data including:
- Professional tool names and descriptions
- Realistic pricing (₹50 - ₹3000 per day)
- Security deposits
- Location data across major Indian cities
- Sample images from Unsplash

## 💳 Payment Setup

### Stripe Configuration
1. Create a Stripe account
2. Get your API keys from Stripe Dashboard
3. Set `STRIPE_SECRET_KEY` in Supabase Edge Functions environment
4. Deploy the Edge Function: `supabase functions deploy create-stripe-payment`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your GitHub repository
2. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
3. Deploy

### Backend (Supabase)
1. Deploy migrations: `supabase db push`
2. Deploy Edge Functions: `supabase functions deploy`
3. Set environment variables in Supabase Dashboard

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── payment/        # Payment components
│   ├── tools/          # Tool-related components
│   └── ui/             # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
└── lib/                # Utility functions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.


---

**Upkaran** - Making tool rental simple and accessible for everyone.
