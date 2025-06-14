
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Copy, Check, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import Navigation from '../components/Navigation';

const Dashboard: React.FC = () => {
  const { userData, updateUserData, regenerateAuthKey } = useAuth();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [authKeyCopied, setAuthKeyCopied] = useState(false);
  const [showAuthKey, setShowAuthKey] = useState(false);
  const [formData, setFormData] = useState({
    phone: userData?.phone || '',
    telegramChatId: userData?.telegramChatId || '',
    notifications: {
      whatsapp: userData?.notifications?.whatsapp || false,
      telegram: userData?.notifications?.telegram || false,
      email: userData?.notifications?.email || true,
    }
  });

  const webhookUrl = "https://n8n.mrprogrammer.info/webhook/sample";

  const handleSave = async (field: 'phone' | 'telegramChatId') => {
    setLoading(true);
    
    try {
      await updateUserData({
        [field]: formData[field],
        notifications: formData.notifications
      });
      
      toast({
        title: "Preferences saved successfully!",
        description: `Your ${field === 'phone' ? 'WhatsApp' : 'Telegram'} settings have been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error saving preferences",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleNotificationToggle = async (channel: keyof typeof formData.notifications) => {
    const newNotifications = {
      ...formData.notifications,
      [channel]: !formData.notifications[channel]
    };
    
    setFormData(prev => ({
      ...prev,
      notifications: newNotifications
    }));

    try {
      await updateUserData({
        notifications: newNotifications
      });
      
      toast({
        title: "Notification setting updated",
        description: `${channel.charAt(0).toUpperCase() + channel.slice(1)} notifications ${newNotifications[channel] ? 'enabled' : 'disabled'}.`,
      });
    } catch (error) {
      toast({
        title: "Error updating setting",
        description: "Please try again later.",
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
        title: "Copied to clipboard!",
        description: `${type === 'webhook' ? 'Webhook URL' : 'Auth Key'} has been copied successfully.`,
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
    try {
      await regenerateAuthKey();
      toast({
        title: "Auth Key regenerated!",
        description: "Your new auth key has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error regenerating auth key",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userData?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Configure your notification preferences and manage your account settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Available Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">💎 {userData?.points || 0}</div>
              <p className="text-xs opacity-90 mt-1">
                Use points to send notifications
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Account Name</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">👤 {userData?.name}</div>
              <p className="text-xs opacity-90 mt-1">
                Your account information
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Active Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                🔔 {userData ? Object.values(userData.notifications).filter(Boolean).length : 0}
              </div>
              <p className="text-xs opacity-90 mt-1">
                Notification channels enabled
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Webhook URL Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Webhook URL</CardTitle>
            <CardDescription>
              Use this URL to send notifications through your preferred channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200">
              <code className="flex-1 text-sm font-mono bg-white px-3 py-2 rounded border text-gray-800">
                {webhookUrl}
              </code>
              <Button
                onClick={() => copyToClipboard(webhookUrl, 'webhook')}
                variant="outline"
                size="sm"
                className={`min-w-[80px] transition-all duration-200 ${
                  copied 
                    ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100' 
                    : 'hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1 animate-scale-in" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Auth Key Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Auth Key</CardTitle>
            <CardDescription>
              Use this auth key to authenticate your webhook requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200">
              <code className="flex-1 text-sm font-mono bg-white px-3 py-2 rounded border text-gray-800">
                {showAuthKey ? userData?.authKey : userData?.authKey?.replace(/./g, '•')}
              </code>
              <Button
                onClick={() => setShowAuthKey(!showAuthKey)}
                variant="outline"
                size="sm"
                className="hover:bg-gray-100"
              >
                {showAuthKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                onClick={() => copyToClipboard(userData?.authKey || '', 'authkey')}
                variant="outline"
                size="sm"
                className={`min-w-[80px] transition-all duration-200 ${
                  authKeyCopied 
                    ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100' 
                    : 'hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                {authKeyCopied ? (
                  <>
                    <Check className="w-4 h-4 mr-1 animate-scale-in" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                onClick={handleRegenerateAuthKey}
                variant="outline"
                size="sm"
                className="hover:bg-orange-50 hover:border-orange-300"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
            <CardDescription>
              Enable or disable notification channels and configure your contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* WhatsApp Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📱</div>
                  <div>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-sm text-gray-500">Receive notifications via WhatsApp</div>
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.whatsapp}
                  onCheckedChange={() => handleNotificationToggle('whatsapp')}
                />
              </div>
              
              {formData.notifications.whatsapp && (
                <div className="ml-4 p-4 bg-white rounded-lg border border-green-200 animate-fade-in">
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number (with country code)
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1234567890"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => handleSave('phone')} 
                        size="sm"
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Telegram Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">✈️</div>
                  <div>
                    <div className="font-medium">Telegram</div>
                    <div className="text-sm text-gray-500">Receive notifications via Telegram</div>
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.telegram}
                  onCheckedChange={() => handleNotificationToggle('telegram')}
                />
              </div>
              
              {formData.notifications.telegram && (
                <div className="ml-4 p-4 bg-white rounded-lg border border-blue-200 animate-fade-in">
                  <div className="space-y-3">
                    <Label htmlFor="telegram" className="text-sm font-medium">
                      Telegram Chat ID
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="telegram"
                        type="text"
                        placeholder="Enter your Telegram Chat ID"
                        value={formData.telegramChatId}
                        onChange={(e) => setFormData(prev => ({ ...prev, telegramChatId: e.target.value }))}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => handleSave('telegramChatId')} 
                        size="sm"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Email Section */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📧</div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-gray-500">
                    Receive notifications via Email ({userData?.email})
                  </div>
                </div>
              </div>
              <Switch
                checked={formData.notifications.email}
                onCheckedChange={() => handleNotificationToggle('email')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
