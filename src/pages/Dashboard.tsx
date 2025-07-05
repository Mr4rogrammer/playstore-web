import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Copy, Check, Eye, EyeOff, RefreshCw, Lock, Zap, Crown, Shield, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import Navigation from '../components/Navigation';
import BlockedAccount from '../components/BlockedAccount';

const Dashboard: React.FC = () => {
  const { userData, updateUserData, regenerateAuthKey } = useAuth();
  const [telegramLoading, setTelegramLoading] = useState(false);
  const [whatsappLoading, setWhatsappLoading] = useState(false);
  const [regenerateLoading, setRegenerateLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [authKeyCopied, setAuthKeyCopied] = useState(false);
  const [showAuthKey, setShowAuthKey] = useState(false);

  // Show blocked account screen if user is blocked
  if (userData?.status === 'blocked') {
    return <BlockedAccount />;
  }

  const webhookUrl = "https://automation.mrprogrammer.info/webhook/snappify";

  const copyToClipboard = async (text: string, type: 'webhook' | 'authkey') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'webhook') {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        setAuthKeyCopied(true);
        setTimeout(() => setAuthKeyCopied(false), 2000);
      }
      toast({
        title: "📋 Copied to clipboard!",
        description: `${type === 'webhook' ? 'Webhook URL' : 'Auth Key'} has been copied successfully.`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually.",
        variant: "destructive",
      });
    }
  };

  const handleRegenerateAuthKey = async () => {
    setRegenerateLoading(true);
    try {
      await regenerateAuthKey();
      toast({
        title: "🔄 Auth Key regenerated!",
        description: "Your new auth key has been generated successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error regenerating auth key",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setRegenerateLoading(false);
    }
  };

  const getPackDisplayName = (packType: string) => {
    switch (packType) {
      case 'mini': return 'Mini Pack';
      case 'pro': return 'Pro Pack';
      case 'promax': return 'Pro Max Pack';
      default: return 'Free Plan';
    }
  };

  const getPackIcon = (packType: string) => {
    switch (packType) {
      case 'mini': return <Zap className="w-6 h-6" />;
      case 'pro': return <Crown className="w-6 h-6" />;
      case 'promax': return <Shield className="w-6 h-6" />;
      default: return <div className="w-6 h-6 bg-gray-300 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Navigation />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Welcome back, {userData?.name}! 
            <span 
              className="inline-block text-6xl ml-4 animate-bounce select-none"
              style={{ 
                animationDuration: '2s',
                animationIterationCount: 'infinite',
                transformOrigin: '50% 100%',
                textShadow: '0 0 10px rgba(255,255,255,0.8)',
                filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))'
              }}
            >
              👋
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
Manage your package lookups and configure your API endpoints with ease.

          </p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  💎
                </div>
                Available Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{userData?.points || 0}</div>
              <p className="text-sm opacity-90">
                Credits for fetching data
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-green-700 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  {getPackIcon(userData?.packType || 'none')}
                </div>
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{getPackDisplayName(userData?.packType || 'none')}</div>
              <p className="text-sm opacity-90">
                Your active subscription
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-500 to-indigo-700 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  🔔
                </div>
                Number Of Calls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
              {userData ? Object.values(userData.totalCalls.toString()) : 0}
              </div>
              <p className="text-sm opacity-90">
                API calls done
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Webhook URL Section */}
        <Card className="mb-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🔗</span>
              </div>
              Your Webhook URL
            </CardTitle>
            <CardDescription className="text-base">
              Use this endpoint to fetch app information using packagename.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all duration-300">
              <code className="flex-1 text-sm font-mono bg-white px-4 py-3 rounded-lg border shadow-sm text-gray-800 break-all">
                {webhookUrl}
              </code>
              <Button
                onClick={() => copyToClipboard(webhookUrl, 'webhook')}
                variant="outline"
                size="sm"
                className={`min-w-[100px] transition-all duration-300 font-medium ${
                  copied 
                    ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100 shadow-md' 
                    : 'hover:bg-blue-50 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 animate-scale-in" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy URL
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Auth Key Section */}
        <Card className="mb-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-orange-50 border-b">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🔐</span>
              </div>
              Authentication Key
            </CardTitle>
            <CardDescription className="text-base">
              Secure key required for webhook authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 p-5 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border-2 border-dashed border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-md">
              <code className="flex-1 text-sm font-mono bg-white px-4 py-3 rounded-lg border shadow-sm text-gray-800">
                {showAuthKey ? userData?.authKey : userData?.authKey?.replace(/./g, '•')}
              </code>
              <Button
                onClick={() => setShowAuthKey(!showAuthKey)}
                variant="outline"
                size="sm"
                className="hover:bg-gray-100 hover:shadow-md transition-all duration-300"
              >
                {showAuthKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                onClick={() => copyToClipboard(userData?.authKey || '', 'authkey')}
                variant="outline"
                size="sm"
                className={`min-w-[100px] transition-all duration-300 font-medium ${
                  authKeyCopied 
                    ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100 shadow-md' 
                    : 'hover:bg-blue-50 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {authKeyCopied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 animate-scale-in" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Key
                  </>
                )}
              </Button>
              <Button
                onClick={handleRegenerateAuthKey}
                variant="outline"
                size="sm"
                disabled={regenerateLoading}
                className="hover:bg-orange-50 hover:border-orange-300 hover:shadow-md transition-all duration-300 font-medium"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${regenerateLoading ? 'animate-spin' : ''}`} />
                {regenerateLoading ? 'Generating...' : 'Regenerate'}
              </Button>
            </div>
          </CardContent>
        </Card>

        
      </div>
    </div>
  );
};

export default Dashboard;
