
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import Navigation from '../components/Navigation';

const Pricing: React.FC = () => {
  const { userData, updateUserData } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      id: 'mini',
      name: 'Mini Pack',
      icon: '🟢',
      price: 10,
      points: 100,
      costPerPoint: 0.10,
      bestFor: 'Light usage / testing',
      features: ['100 notification points', 'Telegram support only'],
      channels: ['telegram']
    },
    {
      id: 'pro',
      name: 'Pro Pack',
      icon: '🔵',
      price: 50,
      points: 1000,
      costPerPoint: 0.05,
      bestFor: 'Startups, developers',
      features: ['1000 notification points', 'Telegram & Email support'],
      popular: true,
      channels: ['telegram', 'email']
    },
    {
      id: 'promax',
      name: 'Pro Max Pack',
      icon: '🟣',
      price: 150,
      points: 5000,
      costPerPoint: 0.03,
      bestFor: 'Growing businesses / agencies',
      features: ['5000 notification points', 'All channels supported'],
      channels: ['telegram', 'whatsapp', 'email']
    }
  ];

  const handlePurchase = async (plan: any) => {
    setLoading(plan.id);
    
    try {
      // Initialize Razorpay
      const options = {
        key: 'rzp_test_9999999999', // Replace with your Razorpay key
        amount: plan.price * 100, // Amount in paise
        currency: 'INR',
        name: 'PushNotify',
        description: `${plan.name} - ${plan.points} Points`,
        handler: function (response: any) {
          // Payment successful
          handlePaymentSuccess(plan, response);
        },
        prefill: {
          name: userData?.name,
          email: userData?.email,
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: function() {
            setLoading(null);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
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
      // Update user points and pack type in Firebase
      const newPoints = (userData?.points || 0) + plan.points;
      
      await updateUserData({ 
        points: newPoints,
        packType: plan.id as 'mini' | 'pro' | 'promax'
      });
      
      toast({
        title: "Payment Successful! 🎉",
        description: `${plan.points} points have been added to your account and your pack has been upgraded!`,
      });
      
      setLoading(null);
    } catch (error) {
      toast({
        title: "Payment Processing Error",
        description: "Payment was successful but there was an error updating your points. Please contact support.",
        variant: "destructive",
      });
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Navigation />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your notification needs. Each plan includes different channel access.
          </p>
          {userData?.packType && userData.packType !== 'none' && (
            <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              Current Plan: {userData.packType.charAt(0).toUpperCase() + userData.packType.slice(1)} Pack
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                <div className="text-4xl mb-2">{plan.icon}</div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.bestFor}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-600 ml-2">/ {plan.points} points</span>
                </div>
                <div className="text-sm text-gray-500">
                  ₹{plan.costPerPoint.toFixed(2)} per point
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handlePurchase(plan)}
                  disabled={loading === plan.id || userData?.packType === plan.id}
                  className={`w-full ${
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
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            All payments are secure and processed through Razorpay. Points are added instantly to your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
