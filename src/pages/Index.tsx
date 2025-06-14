
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, Mail, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleAccessClick = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: MessageSquare,
      title: "WhatsApp Integration",
      description: "Forward API payloads directly to WhatsApp chats",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Send,
      title: "Telegram Support",
      description: "Route payloads to Telegram channels and groups",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Forwarding",
      description: "Send API data to email addresses instantly",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
          <MessageSquare className="w-8 h-8 text-green-500/40" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}>
          <Send className="w-8 h-8 text-blue-500/40" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce" style={{ animationDelay: '3s', animationDuration: '5s' }}>
          <Mail className="w-8 h-8 text-purple-500/40" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="animate-fade-in flex items-center justify-center space-x-3 mb-8">
              <Sparkles className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PushNotify
              </h1>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Forward API Payloads
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-scale-in" style={{ animationDelay: '0.5s' }}>
                  Anywhere You Need
                </span>
              </h2>
            </div>
            
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              PushNotify is a micro-SaaS platform for developers and businesses to forward API payloads 
              to WhatsApp, Telegram, or Email based on user-defined preferences.
            </p>

            {/* Centered Access Button */}
            <div className="mb-16 animate-scale-in" style={{ animationDelay: '0.9s' }}>
              <Button 
                onClick={handleAccessClick} 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xl px-16 py-6 rounded-2xl transform transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl"
              >
                Access Dashboard
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${1.2 + index * 0.2}s` }}
              >
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-lg leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How It Works Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-3xl p-12 max-w-5xl mx-auto backdrop-blur-sm shadow-xl animate-scale-in" style={{ animationDelay: '2s' }}>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-6">How It Works</h3>
            <p className="text-slate-700 text-xl leading-relaxed">
              Configure your preferences once, and PushNotify automatically routes your API payloads 
              to the right destinations - whether that's WhatsApp for instant alerts, Telegram for team notifications, 
              or email for formal communications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
