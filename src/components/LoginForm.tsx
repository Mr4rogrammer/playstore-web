
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to PushNotify.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await register(email, password, name);
      toast({
        title: "Account created!",
        description: "Welcome to PushNotify! You've received 10 free points.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

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
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Forward API Payloads
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  Anywhere You Need
                </span>
              </h1>
            </div>
            
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              PushNotify is a micro-SaaS platform for developers and businesses to forward API payloads 
              to WhatsApp, Telegram, or Email based on user-defined preferences.
            </p>
          </div>

          {/* Login Form */}
          <div className="w-full max-w-md mx-auto animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to PushNotify
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to your account or create a new one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login" className="transition-all duration-200">Login</TabsTrigger>
                    <TabsTrigger value="register" className="transition-all duration-200">Register</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="animate-fade-in">
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 shadow-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Signing in...
                          </div>
                        ) : (
                          'Sign In'
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="register" className="animate-fade-in">
                    <form onSubmit={handleRegister} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-email" className="text-gray-700 font-medium">Email</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-password" className="text-gray-700 font-medium">Password</Label>
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="Choose a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="transition-all duration-200 focus:scale-105"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 shadow-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating account...
                          </div>
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <p className="text-gray-500 text-sm">
                Secure authentication powered by Firebase
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
