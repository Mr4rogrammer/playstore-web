import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import Navigation from '../components/Navigation';
import { useIsMobile } from '../hooks/use-mobile';

const Pricing: React.FC = () => {
  const { userData, updateUserData } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const plans = [
    {
      id: 'mini',
      name: 'Mini Pack',
      icon: '🟢',
      price: 10,
      points: 100,
      costPerPoint: 0.10,
      bestFor: 'Light usage / testing',
      features: [''],
      channels: ['']
    },
    {
      id: 'pro',
      name: 'Pro Pack',
      icon: '🔵',
      price: 50,
      points: 1000,
      costPerPoint: 0.05,
      bestFor: 'Startups, developers',
      features: [''],
      popular: true,
      channels: ['']
    },
    {
      id: 'promax',
      name: 'Pro Max Pack',
      icon: '🟣',
      price: 150,
      points: 5000,
      costPerPoint: 0.03,
      bestFor: 'Growing businesses / agencies',
      features: [''],
      channels: ['']
    }
  ];

  const handlePurchase = async (plan: any) => {
    setLoading(plan.id);
    
    try {
      // Initialize Razorpay with your test key
      const options = {
        key: 'rzp_live_wLTTqoJwhvOqfA', // Your actual test key
        amount: plan.price * 100, // Amount in paise
        currency: 'INR',
        name: 'Snappify',
        description: `${plan.name} - ${plan.points} Points`,
        handler: function (response: any) {
          // Payment successful
          console.log('Payment successful:', response);
          handlePaymentSuccess(plan, response);
        },
        prefill: {
          name: userData?.name || 'User',
          email: userData?.email || '',
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            setLoading(null);
          }
        },
        notes: {
          planId: plan.id,
          userId: userData?.uid || 'anonymous'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        toast({
          title: "Payment Failed",
          description: response.error.description || "Payment could not be processed. Please try again.",
          variant: "destructive",
        });
        setLoading(null);
      });
      
      rzp.open();
    } catch (error) {
      console.error('Razorpay initialization error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      setLoading(null);
    }
  };

  const handlePaymentSuccess = async (plan: any, paymentResponse: any) => {
    try {
      console.log('Processing payment success for plan:', plan.id);
      console.log('Payment response:', paymentResponse);
      
      // Update user points and pack type in Firebase
      const newPoints = (userData?.points || 0) + plan.points;
      
      await updateUserData({ 
        points: newPoints,
        packType: plan.id as 'mini' | 'pro' | 'promax',
        lastPayment: {
          paymentId: paymentResponse.razorpay_payment_id,
          amount: plan.price,
          timestamp: new Date().toISOString(),
          plan: plan.id
        }
      });
      
      toast({
        title: "Payment Successful! 🎉",
        description: `${plan.points} points have been added to your account and your pack has been upgraded to ${plan.name}!`,
      });
      
      setLoading(null);
    } catch (error) {
      console.error('Error updating user data after payment:', error);
      toast({
        title: "Payment Processing Error",
        description: "Payment was successful but there was an error updating your points. Please contact support with payment ID: " + paymentResponse.razorpay_payment_id,
        variant: "destructive",
      });
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-pink-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Navigation />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Select the perfect plan for your needs. Each plan includes different pricing.
          </p>
          {userData?.packType && userData.packType !== 'none' && (
            <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              Current Plan: {userData.packType.charAt(0).toUpperCase() + userData.packType.slice(1)} Pack
            </div>
          )}
        </div>

        <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-3 gap-8'} max-w-5xl mx-auto`}>
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                plan.popular ? 'border-blue-500 border-2 shadow-lg' : 'hover:shadow-lg'
              } ${userData?.packType === plan.id ? 'ring-2 ring-green-500 bg-green-50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              {userData?.packType === plan.id && (
                <div className="absolute -top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Current
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="text-3xl sm:text-4xl mb-2">{plan.icon}</div>
                <CardTitle className="text-xl sm:text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600 text-sm sm:text-base">{plan.bestFor}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-600 ml-2 text-sm sm:text-base">/ {plan.points} points</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  ₹{plan.costPerPoint.toFixed(2)} per point
                </div>
              </CardHeader>
              
              <CardContent>
                <Button 
                  onClick={() => handlePurchase(plan)}
                  disabled={loading === plan.id || userData?.packType === plan.id}
                  className={`w-full text-sm sm:text-base ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : ''
                  } ${userData?.packType === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {userData?.packType === plan.id 
                    ? 'Current Plan' 
                    : loading === plan.id 
                      ? 'Processing...' 
                      : `Buy ${plan.name}`
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 sm:mt-12 max-w-4xl mx-auto">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 text-lg sm:text-xl">Point Usage Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 mb-4 text-sm sm:text-base">
Each API call consumes 1 point per app metadata fetch.              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-600 text-sm sm:text-base px-4">
            All payments are secure and processed through Razorpay. Points are added instantly to your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
