
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, Zap, ArrowRight, Sparkles } from 'lucide-react';
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
      description: "Send messages directly to WhatsApp chats via webhook",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Send,
      title: "Telegram Support",
      description: "Instant delivery to Telegram channels and groups",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Email Notifications",
      description: "Reliable email delivery with webhook triggers",
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
          <Zap className="w-8 h-8 text-purple-500/40" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 animate-fade-in">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PushNotify
              </h1>
            </div>
            <Button 
              onClick={handleAccessClick} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform transition-all duration-300 hover:scale-105 shadow-lg animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              Access Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Powerful Push Notifications
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-scale-in" style={{ animationDelay: '0.5s' }}>
                  Made Simple
                </span>
              </h1>
            </div>
            
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              Engage your users with lightning-fast push notifications across all platforms (WhatsApp chat, 
              Telegram chat and email). Simple integration, powerful features, and reliable delivery guaranteed.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-8 max-w-4xl mx-auto mb-12 backdrop-blur-sm shadow-lg animate-scale-in" style={{ animationDelay: '0.9s' }}>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">How It Works</h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                When customers post data to your webhook, the body will be parsed and automatically sent to social media chat 
                platforms like Telegram, WhatsApp, and email notifications.
              </p>
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '2s' }}>
            <Button 
              onClick={handleAccessClick} 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-12 py-4 rounded-xl transform transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-12 py-4 rounded-xl border-2 border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
