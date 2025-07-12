import { supabase } from '@/integrations/supabase/client';
import { formatAmountForStripe } from './stripe';

export interface PaymentIntentRequest {
  amount: number;
  currency?: string;
  rental_id?: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  error?: string;
}

export class PaymentService {
  static async createPaymentIntent(data: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    try {
      console.log('Creating payment intent with data:', data);
      
      const { data: response, error } = await supabase.functions.invoke('create-stripe-payment', {
        body: {
          amount: data.amount,
          currency: data.currency || 'inr',
          metadata: data.metadata || {},
        },
      });

      console.log('Supabase function response:', { response, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to create payment intent');
      }

      if (!response || !response.clientSecret) {
        console.error('Invalid response from payment function:', response);
        throw new Error('Invalid response from payment service');
      }

      return response as PaymentIntentResponse;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  static async confirmPayment(paymentIntentId: string, paymentMethodId: string) {
    // This would typically be handled by Stripe Elements
    // The actual confirmation happens on the client side
    return { success: true, paymentIntentId };
  }

  static async savePaymentRecord(rentalId: string, amount: number, stripePaymentIntentId: string) {
    try {
      const { error } = await supabase
        .from('payments')
        .insert({
          rental_id: rentalId,
          amount: amount,
          currency: 'INR',
          status: 'completed',
          payment_type: 'rental',
          payment_provider: 'stripe',
          stripe_payment_intent_id: stripePaymentIntentId,
        });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error saving payment record:', error);
      throw error;
    }
  }
} 