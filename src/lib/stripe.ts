import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here';

// Add logging to debug environment variable issues
if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
  console.warn('⚠️ VITE_STRIPE_PUBLISHABLE_KEY is not set. Using fallback key.');
}

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const formatAmountForStripe = (amount: number, currency: string = 'inr'): number => {
  // Convert to smallest currency unit (paise for INR, cents for USD)
  return Math.round(amount * 100);
};

export const formatAmountFromStripe = (amount: number, currency: string = 'inr'): number => {
  // Convert from smallest currency unit back to display amount
  return amount / 100;
}; 