import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Copy, Eye, EyeOff, RefreshCw, Send, Bell, MessageSquare, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { userData, updateUserData, regenerateAuthKey } = useAuth();
  const [telegramLoading, setTelegramLoading] = useState(false);
  const [whatsappLoading, setWhatsappLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [authKeyCopied, setAuthKeyCopied] = useState(false);
  const [showAuthKey, setShowAuthKey] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    phone: userData?.phone || '',
    telegramChatId: userData?.telegramChatId || '',
    notifications: {
      telegram: userData?.notifications?.telegram || false,
      whatsapp: userData?.notifications?.whatsapp || false,
    }
  });

  const [testNotification, setTestNotification] = useState({
    message: '',
    title: '',
    priority: 'medium',
    source: 'webapp'
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        phone: userData.phone || '',
        telegramChatId: userData.telegramChatId || '',
        notifications: {
          telegram: userData.notifications?.telegram || false,
          whatsapp: userData.notifications?.whatsapp || false,
        }
      });
    }
  }, [userData]);

  const handleSendNotification = async () => {
    if (!testNotification.message || !testNotification.title) {
      toast({
        title: "Error",
        description: "Please fill in both message and title fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Restructure the payload according to the new format
      const payload = {
        title: "information data",
        data: {
          message: testNotification.message,
          title: testNotification.title,
          priority: testNotification.priority,
          source: testNotification.source
        }
      };

      console.log('Sending notification with payload:', payload);
      
      toast({
        title: "Notification Sent",
        description: "Test notification has been sent successfully",
        variant: "success",
      });

      // Clear the form
      setTestNotification({
        message: '',
        title: '',
        priority: 'medium',
        source: 'webapp'
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (field: 'phone' | 'telegramChatId') => {
    if (field === 'telegramChatId') {
      setTelegramLoading(true);
    } else {
      setWhatsappLoading(true);
    }
    
    try {
      await updateUserData({
        [field]: formData[field]
      });
      
      toast({
        title: "Success",
        description: `${field === 'phone' ? 'WhatsApp' : 'Telegram'} settings saved successfully`,
        variant: "success",
      });
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
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
    const newValue = !formData.notifications[channel];
    
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [channel]: newValue
      }
    }));

    try {
      await updateUserData({
        notifications: {
          ...formData.notifications,
          [channel]: newValue
        }
      });
      
      toast({
        title: "Success",
        description: `${channel} notifications ${newValue ? 'enabled' : 'disabled'}`,
        variant: "success",
      });
    } catch (error) {
      console.error('Error updating notification settings:', error);
      toast({
        title: "Error",
        description: "Failed to update notification settings",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (text: string, type: 'auth' | 'webhook') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'auth') {
        setAuthKeyCopied(true);
        setTimeout(() => setAuthKeyCopied(false), 2000);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      
      toast({
        title: "Copied!",
        description: `${type === 'auth' ? 'Auth key' : 'Webhook URL'} copied to clipboard`,
        variant: "success",
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleRegenerateAuthKey = async () => {
    try {
      await regenerateAuthKey();
      toast({
        title: "Success",
        description: "Auth key regenerated successfully",
        variant: "success",
      });
    } catch (error) {
      console.error('Error regenerating auth key:', error);
      toast({
        title: "Error",
        description: "Failed to regenerate auth key",
        variant: "destructive",
      });
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const webhookUrl = `https://api.pushnotify.app/webhook/${userData.authKey}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your notification settings and test your setup</p>
          </div>

          <div className="grid gap-6">
            {/* API Configuration */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="webhook-url" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Webhook URL
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="webhook-url"
                      value={webhookUrl}
                      readOnly
                      className="font-mono text-sm bg-gray-50 border-gray-200"
                    />
                    <Button
                      onClick={() => copyToClipboard(webhookUrl, 'webhook')}
                      variant="outline"
                      size="sm"
                      className="px-3"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-sm text-green-600 mt-1 font-medium">✓ Copied to clipboard!</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="auth-key" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Auth Key
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="auth-key"
                        type={showAuthKey ? "text" : "password"}
                        value={userData.authKey || ''}
                        readOnly
                        className="font-mono text-sm bg-gray-50 border-gray-200 pr-10"
                      />
                      <Button
                        onClick={() => setShowAuthKey(!showAuthKey)}
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
                      >
                        {showAuthKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(userData.authKey || '', 'auth')}
                      variant="outline"
                      size="sm"
                      className="px-3"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleRegenerateAuthKey}
                      variant="outline"
                      size="sm"
                      className="px-3"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                  {authKeyCopied && (
                    <p className="text-sm text-green-600 mt-1 font-medium">✓ Copied to clipboard!</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notification Channels */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Telegram Configuration */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Telegram
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="telegram-enabled" className="text-sm font-semibold text-gray-700">
                      Enable Telegram Notifications
                    </Label>
                    <Switch
                      id="telegram-enabled"
                      checked={formData.notifications.telegram}
                      onCheckedChange={() => handleNotificationToggle('telegram')}
                    />
                  </div>
                  
                  {formData.notifications.telegram && (
                    <div className="space-y-3 pt-2 border-t border-gray-100">
                      <Label htmlFor="telegram-chat-id" className="text-sm font-semibold text-gray-700">
                        Chat ID
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="telegram-chat-id"
                          value={formData.telegramChatId}
                          onChange={(e) => setFormData(prev => ({ ...prev, telegramChatId: e.target.value }))}
                          placeholder="Enter your Telegram Chat ID"
                          className="flex-1"
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
                      <p className="text-xs text-gray-500">
                        Send /start to @PushNotifyBot to get your Chat ID
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* WhatsApp Configuration */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="whatsapp-enabled" className="text-sm font-semibold text-gray-700">
                      Enable WhatsApp Notifications
                    </Label>
                    <Switch
                      id="whatsapp-enabled"
                      checked={formData.notifications.whatsapp}
                      onCheckedChange={() => handleNotificationToggle('whatsapp')}
                    />
                  </div>
                  
                  {formData.notifications.whatsapp && (
                    <div className="space-y-3 pt-2 border-t border-gray-100">
                      <Label htmlFor="phone-number" className="text-sm font-semibold text-gray-700">
                        Phone Number
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="phone-number"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number"
                          className="flex-1"
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
                      <p className="text-xs text-gray-500">
                        Include country code (e.g., +1234567890)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Test Notification */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Test Notification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="test-title" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Title
                    </Label>
                    <Input
                      id="test-title"
                      value={testNotification.title}
                      onChange={(e) => setTestNotification(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Notification title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="test-message" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Message
                    </Label>
                    <Input
                      id="test-message"
                      value={testNotification.message}
                      onChange={(e) => setTestNotification(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Test message"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="test-priority" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Priority
                    </Label>
                    <select
                      id="test-priority"
                      value={testNotification.priority}
                      onChange={(e) => setTestNotification(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="test-source" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Source
                    </Label>
                    <Input
                      id="test-source"
                      value={testNotification.source}
                      onChange={(e) => setTestNotification(prev => ({ ...prev, source: e.target.value }))}
                      placeholder="webapp"
                    />
                  </div>
                </div>

                <Separator />
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSendNotification}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-medium px-8"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Test Notification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
