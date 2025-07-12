import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PaymentService } from '@/lib/payment-service';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const PaymentDebug: React.FC = () => {
  const { toast } = useToast();

  const testPaymentIntent = async () => {
    try {
      console.log('Testing payment intent creation...');
      
      const response = await PaymentService.createPaymentIntent({
        amount: 1000, // ₹10.00
        currency: 'inr',
        metadata: {
          test: 'true',
          type: 'debug_test'
        }
      });

      console.log('Test payment intent response:', response);
      
      toast({
        title: 'Test Successful',
        description: 'Payment intent created successfully',
      });
    } catch (error: any) {
      console.error('Test payment intent failed:', error);
      toast({
        title: 'Test Failed',
        description: error.message || 'Payment intent creation failed',
        variant: 'destructive'
      });
    }
  };

  const testSupabaseConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      
      // Test basic Supabase connection
      const { data, error } = await supabase.from('tools').select('count').limit(1);
      
      if (error) {
        throw error;
      }
      
      console.log('Supabase connection successful:', data);
      toast({
        title: 'Connection Test',
        description: 'Supabase connection is working',
      });
    } catch (error: any) {
      console.error('Supabase connection failed:', error);
      toast({
        title: 'Connection Failed',
        description: error.message || 'Supabase connection failed',
        variant: 'destructive'
      });
    }
  };

  const testFunctionDirectly = async () => {
    try {
      console.log('Testing function directly...');
      
      const { data, error } = await supabase.functions.invoke('create-stripe-payment', {
        body: {
          amount: 1000,
          currency: 'inr',
        },
      });

      console.log('Direct function response:', { data, error });

      if (error) {
        throw error;
      }

      toast({
        title: 'Function Test',
        description: 'Function is working correctly',
      });
    } catch (error: any) {
      console.error('Direct function test failed:', error);
      toast({
        title: 'Function Test Failed',
        description: error.message || 'Function test failed',
        variant: 'destructive'
      });
    }
  };

  const checkEnvironment = () => {
    const envVars = {
      'VITE_STRIPE_PUBLISHABLE_KEY': import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      'SUPABASE_URL': import.meta.env.VITE_SUPABASE_URL,
      'SUPABASE_ANON_KEY': import.meta.env.VITE_SUPABASE_ANON_KEY,
    };

    console.log('Environment variables:', envVars);
    
    const missingVars = Object.entries(envVars)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      toast({
        title: 'Missing Environment Variables',
        description: `Missing: ${missingVars.join(', ')}`,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Environment Check',
        description: 'All environment variables are set',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Debug Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button onClick={checkEnvironment} variant="outline" className="w-full">
            Check Environment Variables
          </Button>
          <Button onClick={testSupabaseConnection} variant="outline" className="w-full">
            Test Supabase Connection
          </Button>
          <Button onClick={testFunctionDirectly} variant="outline" className="w-full">
            Test Function Directly
          </Button>
          <Button onClick={testPaymentIntent} variant="outline" className="w-full">
            Test Payment Intent Creation
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          Check browser console for detailed logs
        </div>
      </CardContent>
    </Card>
  );
}; 