# Stripe Integration Guide

This guide explains how to complete the Stripe payment integration for the ToolHive Rentals Hub.

## Prerequisites

1. **Stripe Account**: Create a Stripe account at [stripe.com](https://stripe.com)
2. **Stripe Keys**: Get your publishable and secret keys from the Stripe Dashboard
3. **Supabase Project**: Ensure your Supabase project is set up and running

## Setup Steps

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### 2. Supabase Environment Variables

In your Supabase Dashboard:
1. Go to Settings → Environment variables
2. Add the following variables:
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (starts with `sk_test_` or `sk_live_`)

### 3. Deploy Supabase Functions

```bash
# Deploy the Stripe payment function
supabase functions deploy create-stripe-payment

# Or deploy all functions
supabase functions deploy
```

### 4. Database Migration

Run the database migration to add Stripe-specific fields:

```bash
supabase db push
```

## How It Works

### Frontend Flow
1. User selects tool and dates
2. User fills contact information
3. User clicks "Proceed to Payment"
4. Rental record is created with "pending" status
5. Stripe payment form opens
6. User enters card details and completes payment
7. Payment record is saved to database
8. Rental status is updated to "confirmed"

### Backend Flow
1. Frontend calls Supabase Edge Function `create-stripe-payment`
2. Function creates Stripe Payment Intent
3. Function returns client secret to frontend
4. Frontend confirms payment with Stripe
5. Payment record is saved to database

## Testing

### Test Cards (Stripe Test Mode)
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

### Test Mode vs Live Mode
- Use test keys for development
- Switch to live keys for production
- Test cards only work in test mode

## Security Considerations

1. **Never expose secret keys** in frontend code
2. **Always use HTTPS** in production
3. **Validate payment amounts** on the server
4. **Handle webhooks** for payment confirmations (optional)
5. **Implement proper error handling**

## Troubleshooting

### Common Issues

1. **"Invalid API key"**: Check your Stripe keys are correct
2. **"Payment failed"**: Ensure you're using test cards in test mode
3. **"Function not found"**: Deploy the Supabase function
4. **"Environment variable not set"**: Add STRIPE_SECRET_KEY to Supabase

### Debug Steps

1. Check browser console for errors
2. Check Supabase function logs
3. Verify environment variables are set
4. Test with Stripe's test cards

## Production Deployment

1. **Switch to live keys** in production
2. **Set up webhooks** for payment confirmations
3. **Configure proper error handling**
4. **Test thoroughly** with small amounts first
5. **Monitor payments** in Stripe Dashboard

## Files Modified/Created

- `src/lib/stripe.ts` - Stripe configuration
- `src/lib/payment-service.ts` - Payment service
- `src/components/payment/stripe-payment-form.tsx` - Payment form component
- `src/pages/ToolDetail.tsx` - Updated to include payment flow
- `supabase/functions/create-stripe-payment/index.ts` - Backend payment function
- `supabase/migrations/20250709000000-add-stripe-payment-fields.sql` - Database migration

## Next Steps

1. Set up webhooks for payment confirmations
2. Add payment history to user dashboard
3. Implement refund functionality
4. Add payment analytics
5. Set up automated testing 