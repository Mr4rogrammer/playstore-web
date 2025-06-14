
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      id: 'mini',
      name: 'Mini Pack',
      icon: '🟢',
      price: 10,
      points: 100,
      costPerPoint: 0.10,
      bestFor: 'Light usage / testing',
      features: ['100 notification points', 'Telegram support', 'Email support', 'Basic API access'],
      channels: ['telegram', 'email']
    },
    {
      id: 'pro',
      name: 'Pro Pack',
      icon: '🔵',
      price: 50,
      points: 1000,
      costPerPoint: 0.05,
      bestFor: 'Startups, developers',
      features: ['1000 notification points', 'Telegram & Email support', 'Priority support', 'Advanced API features'],
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
      features: ['5000 notification points', 'All channels supported', 'Premium support', 'Custom integration help'],
      channels: ['telegram', 'email', 'whatsapp']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your notification needs. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                plan.popular ? 'border-blue-500 border-2 shadow-lg' : 'hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
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
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : ''
                  }`}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">How Point Usage Works</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 mb-4">
                Each notification uses points per webhook call. Points are deducted based on enabled channels:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl mb-2">✈️</div>
                  <div className="font-medium">Telegram</div>
                  <div className="text-blue-600 font-bold">1 point</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl mb-2">📧</div>
                  <div className="font-medium">Email</div>
                  <div className="text-blue-600 font-bold">2 points</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-blue-600 font-bold">2 points</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>Example:</strong> If all 3 channels are enabled, each webhook call uses 5 points (1+2+2). 
                  If only Telegram is enabled, each call uses 1 point.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All payments are secure and processed through Razorpay. Points are added instantly to your account.
          </p>
          <p className="text-sm text-gray-500">
            Need a custom plan? <a href="mailto:krishnakumar.e.11022002@gmail.com" className="text-blue-600 hover:underline">Contact us</a> for enterprise solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
