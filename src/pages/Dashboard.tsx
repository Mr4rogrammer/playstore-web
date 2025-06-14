import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Copy, Key, Lock, MessageCircle, Mail, Phone, RefreshCw, Send, Heart, Star, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import Navigation from '../components/Navigation';

const Dashboard: React.FC = () => {
  const { userData, updateUserData, regenerateAuthKey } = useAuth();
  const [formData, setFormData] = useState({
    phone: userData?.phone || '',
    telegramChatId: userData?.telegramChatId || '',
  });
  const [loading, setLoading] = useState(false);
  const [testNotification, setTestNotification] = useState({
    message: '',
    sending: false
  });

  const getAvailableChannels = (packType: string) => {
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

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: message,
    })
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationToggle = async (channel: string, checked: boolean) => {
    if (!userData) return;

    try {
      await updateUserData({
        notifications: {
          ...userData.notifications,
          [channel]: checked,
        },
      });
      toast({
        title: "Notification settings updated!",
        description: `You will ${checked ? 'now' : 'no longer'} receive ${channel} notifications.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserData({
        phone: formData.phone,
        telegramChatId: formData.telegramChatId,
      });
      toast({
        title: "Profile updated!",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setLoading(true);
    try {
      await regenerateAuthKey();
      toast({
        title: "Auth Key Regenerated!",
        description: "Your Auth Key has been regenerated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate Auth Key.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestNotification = async (channel: string) => {
    setTestNotification({...testNotification, sending: true});
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData?.authKey}`
        },
        body: JSON.stringify({
          channel,
          message: testNotification.message || `This is a test notification via ${channel}.`
        })
      });

      if (response.ok) {
        toast({
          title: "Test notification sent!",
          description: `A test notification has been sent via ${channel}.`,
        })
      } else {
         const errorData = await response.json();
          toast({
            title: "Error",
            description: `Failed to send test notification via ${channel}. ${errorData.message || 'Please check your credentials.'}`,
            variant: "destructive",
          });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to send test notification via ${channel}. ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setTestNotification({...testNotification, sending: false});
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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your profile, notification settings, and API key.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Profile</CardTitle>
              <CardDescription>Manage your profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={userData?.name} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={userData?.email} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <Button onClick={handleSave} disabled={loading} className="w-full">
                {loading ? <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : 'Update Profile'}
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getAvailableChannels(userData?.packType || 'none').map((channel) => (
                <div key={channel} className="flex items-center justify-between">
                  <Label htmlFor={channel} className="capitalize">{channel} Notifications</Label>
                  <Switch
                    id={channel}
                    checked={userData?.notifications[channel] || false}
                    onCheckedChange={(checked) => handleNotificationToggle(channel, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Telegram Settings Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Telegram Settings</CardTitle>
              <CardDescription>Configure your Telegram Chat ID to receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="telegramChatId">Telegram Chat ID</Label>
                <div className="flex items-center">
                  <Input
                    id="telegramChatId"
                    name="telegramChatId"
                    type="text"
                    placeholder="Enter your Telegram Chat ID"
                    value={formData.telegramChatId}
                    onChange={handleInputChange}
                  />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(formData.telegramChatId, 'Telegram Chat ID copied to clipboard.')}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  To find your Telegram Chat ID, talk to the <a href="https://t.me/username_to_id_bot" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@username_to_id_bot</a> on Telegram.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Authentication Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Authentication</CardTitle>
              <CardDescription>Manage your API key and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="authKey">API Key</Label>
                <div className="flex items-center">
                  <Input id="authKey" value={userData?.authKey} readOnly />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(userData?.authKey || '', 'API Key copied to clipboard.')}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleRegenerate} disabled={loading} className="w-full">
                {loading ? <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Regenerating...</> : 'Regenerate API Key'}
              </Button>
            </CardContent>
          </Card>

          {/* Test Notification Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Test Notifications</CardTitle>
              <CardDescription>Send test notifications to ensure your settings are correct.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testMessage">Message</Label>
                <Input
                  id="testMessage"
                  type="text"
                  placeholder="Enter your test message"
                  value={testNotification.message}
                  onChange={(e) => setTestNotification({...testNotification, message: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getAvailableChannels(userData?.packType || 'none').map((channel) => (
                  <Button
                    key={channel}
                    onClick={() => handleTestNotification(channel)}
                    disabled={testNotification.sending}
                  >
                    {testNotification.sending ? <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : `Send ${channel} Test`}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
