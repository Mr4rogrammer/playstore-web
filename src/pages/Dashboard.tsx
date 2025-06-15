import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Copy, Check, Eye, EyeOff, RefreshCw, Lock, Zap, Crown, Shield } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    phone: userData?.phone || '',
    telegramChatId: userData?.telegramChatId || '',
    notifications: {
      email: userData?.notifications?.email || false,
      telegram: userData?.notifications?.telegram || false,
      whatsapp: userData?.notifications?.whatsapp || false,
    }
  });

  // Show blocked account screen if user is blocked
  if (userData?.status === 'blocked') {
    return <BlockedAccount />;
  }

  const webhookUrl = "https://automation.mrprogrammer.info/webhook/pushNotify";

  // Determine available channels based on pack type
  const getAvailableChannels = () => {
    const packType = userData?.packType || 'none';
    switch (packType) {
      case 'mini':
        return ['telegram'];
      case 'pro':
        return ['telegram', 'email'];
      case 'promax':
        return ['telegram', 'email', 'whatsapp'];
      case 'none':
      default:
        return ['telegram']; // Telegram is available for free/none pack users
    }
  };

  const availableChannels = getAvailableChannels();

  const validateChannelRequirements = (channel: keyof typeof formData.notifications, enableValue: boolean) => {
    if (!enableValue) return true; // No validation needed when disabling
    
    // Only validate Telegram Chat ID requirement when enabling
    if (channel === 'telegram' && !formData.telegramChatId.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your Telegram Chat ID before enabling Telegram notifications.",
        variant: "destructive",
      });
      return false;
    }

    // For WhatsApp, allow enabling without phone number - user will add it after enabling
    return true;
  };

  const handleSave = async (field: 'phone' | 'telegramChatId') => {
    if (field === 'telegramChatId') {
      setTelegramLoading(true);
    } else {
      setWhatsappLoading(true);
    }
    
    try {
      await updateUserData({
        [field]: formData[field],
        notifications: formData.notifications
      });
      
      toast({
        title: "Settings saved successfully! ✅",
        description: `Your ${field === 'phone' ? 'WhatsApp' : 'Telegram'} settings have been updated.`,
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Error saving preferences",
        description: error.message,
        variant: "destructive",
      });
    }
    
    if (field === 'telegramChatId') {
      setTelegramLoading(false);
    } else {
      setWhatsappLoading(false);
    }
  };

  const handleNotificationToggle = async (channel: keyof typeof formData.notifications) => {
    // Show under development message for email and WhatsApp
    if (channel === 'email' || channel === 'whatsapp') {
      toast({
        title: "🚧 Under Development",
        description: `${channel.charAt(0).toUpperCase() + channel.slice(1)} notifications are currently under development and will be available soon!`,
        variant: "info",
      });
      return;
    }

    // Check if channel is available in current plan
    if (!availableChannels.includes(channel)) {
      toast({
        title: "Channel not available ⚠️",
        description: `${channel.charAt(0).toUpperCase() + channel.slice(1)} is not available in your current plan. Please upgrade to access this channel.`,
        variant: "warning",
      });
      return;
    }

    const newValue = !formData.notifications[channel];
    
    // Validate requirements before enabling
    if (!validateChannelRequirements(channel, newValue)) {
      return; // Don't change state if validation fails
    }

    const newNotifications = {
      ...formData.notifications,
      [channel]: newValue
    };
    
    // Update local state first
    setFormData(prev => ({
      ...prev,
      notifications: newNotifications
    }));

    try {
      // Update in database
      await updateUserData({
        notifications: newNotifications
      });
      
      toast({
        title: `${newValue ? '🎉 Channel enabled!' : 'Channel disabled'}`,
        description: `${channel.charAt(0).toUpperCase() + channel.slice(1)} notifications ${newValue ? 'enabled' : 'disabled'}.`,
        variant: newValue ? "success" : "info",
      });
    } catch (error: any) {
      // Revert the change if update fails
      setFormData(prev => ({
        ...prev,
        notifications: formData.notifications
      }));
      
      toast({
        title: "Error updating setting",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
            Manage your notification channels and configure your webhook settings with ease
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
                Credits for sending notifications
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
                Active Channels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {userData ? Object.values(userData.notifications).filter(Boolean).length : 0}
              </div>
              <p className="text-sm opacity-90">
                Notification channels enabled
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
              Use this endpoint to send notifications through your enabled channels
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

        {/* Enhanced Notification Channels */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50 border-b">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📱</span>
              </div>
              Notification Channels
            </CardTitle>
            <CardDescription className="text-base">
              Configure your preferred notification methods based on your plan
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Email Section */}
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-300 ${
                availableChannels.includes('email') 
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:border-purple-300 hover:shadow-md' 
                  : 'bg-gray-100 border-gray-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl">
                    📧
                  </div>
                  <div>
                    <div className="font-semibold text-lg flex items-center gap-2">
                      Email Notifications
                      {!availableChannels.includes('email') && (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {availableChannels.includes('email') 
                        ? `Receive notifications at ${userData?.email}` 
                        : 'Available in Pro and Pro Max plans'
                      }
                    </div>
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.email}
                  onCheckedChange={() => handleNotificationToggle('email')}
                  disabled={!availableChannels.includes('email')}
                  className="data-[state=checked]:bg-purple-500"
                />
              </div>
            </div>

            {/* Telegram Section */}
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-300 ${
                availableChannels.includes('telegram') 
                  ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 hover:border-blue-300 hover:shadow-md' 
                  : 'bg-gray-100 border-gray-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
                    ✈️
                  </div>
                  <div>
                    <div className="font-semibold text-lg flex items-center gap-2">
                      Telegram Notifications
                      {!availableChannels.includes('telegram') && (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {availableChannels.includes('telegram') 
                        ? 'Instant notifications via Telegram bot' 
                        : 'Available in all plans'
                      }
                    </div>
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.telegram}
                  onCheckedChange={() => handleNotificationToggle('telegram')}
                  disabled={!availableChannels.includes('telegram')}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>
              
              {/* Show Telegram Chat ID input only when telegram is enabled */}
              {formData.notifications.telegram && availableChannels.includes('telegram') && (
                <div className="ml-4 p-5 bg-white rounded-xl border-2 border-blue-200 shadow-sm">
                  <div className="space-y-4">
                    <Label htmlFor="telegram" className="text-sm font-semibold text-gray-700">
                      Telegram Chat ID *
                    </Label>
                    <div className="flex space-x-3">
                      <Input
                        id="telegram"
                        type="text"
                        placeholder="Enter your Telegram Chat ID"
                        value={formData.telegramChatId}
                        onChange={(e) => setFormData(prev => ({ ...prev, telegramChatId: e.target.value }))}
                        className="flex-1 border-2 focus:border-blue-400 transition-colors"
                        required
                      />
                      <Button 
                        onClick={() => handleSave('telegramChatId')} 
                        size="sm"
                        disabled={telegramLoading || !formData.telegramChatId.trim()}
                        className="bg-blue-600 hover:bg-blue-700 font-medium px-6"
                      >
                        {telegramLoading ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Section */}
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-300 ${
                availableChannels.includes('whatsapp') 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300 hover:shadow-md' 
                  : 'bg-gray-100 border-gray-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
                    📱
                  </div>
                  <div>
                    <div className="font-semibold text-lg flex items-center gap-2">
                      WhatsApp Notifications
                      {!availableChannels.includes('whatsapp') && (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {availableChannels.includes('whatsapp') 
                        ? 'Receive notifications via WhatsApp' 
                        : 'Available in Pro Max plan only'
                      }
                    </div>
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.whatsapp}
                  onCheckedChange={() => handleNotificationToggle('whatsapp')}
                  disabled={!availableChannels.includes('whatsapp')}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
              
              {formData.notifications.whatsapp && availableChannels.includes('whatsapp') && (
                <div className="ml-4 p-5 bg-white rounded-xl border-2 border-green-200 shadow-sm animate-fade-in">
                  <div className="space-y-4">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Phone Number (with country code) *
                    </Label>
                    <div className="flex space-x-3">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1234567890"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="flex-1 border-2 focus:border-green-400 transition-colors"
                        required
                      />
                      <Button 
                        onClick={() => handleSave('phone')} 
                        size="sm"
                        disabled={whatsappLoading || !formData.phone.trim()}
                        className="bg-green-600 hover:bg-green-700 font-medium px-6"
                      >
                        {whatsappLoading ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {(userData?.packType === 'none' || !userData?.packType) && (
              <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl">
                <div className="flex items-center gap-3 text-yellow-800 font-semibold mb-3">
                  <div className="w-8 h-8 bg-yellow-200 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  Free Plan - Limited Access
                </div>
                <p className="text-yellow-700 mb-4 leading-relaxed">
                  You're currently on the free plan with Telegram access. Upgrade to unlock Email and WhatsApp channels with advanced features.
                </p>
                <Button 
                  onClick={() => window.location.href = '/pricing'}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 font-medium"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Your Plan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
