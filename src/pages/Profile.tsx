
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import Navigation from '../components/Navigation';

const Profile: React.FC = () => {
  const { userData, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: userData?.phone || '',
    telegramChatId: userData?.telegramChatId || '',
    email: userData?.email || '',
    notifications: {
      whatsapp: userData?.notifications?.whatsapp || false,
      telegram: userData?.notifications?.telegram || false,
      email: userData?.notifications?.email || true,
    }
  });

  const handleSave = async () => {
    setLoading(true);
    
    try {
      await updateUserData({
        phone: formData.phone,
        telegramChatId: formData.telegramChatId,
        notifications: formData.notifications
      });
      
      toast({
        title: "Preferences saved successfully!",
        description: "Your notification settings have been updated.",
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

  const handleNotificationToggle = (channel: keyof typeof formData.notifications) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [channel]: !prev.notifications[channel]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure your notification preferences and contact details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Enable or disable notification channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📧</div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-gray-500">Receive notifications via Email</div>
                  </div>
                </div>
                <Switch
                  checked={formData.notifications.email}
                  onCheckedChange={() => handleNotificationToggle('email')}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>
                Update your contact information for notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (with country code)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!formData.notifications.whatsapp}
                />
                {!formData.notifications.whatsapp && (
                  <p className="text-xs text-gray-500">Enable WhatsApp notifications to edit</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telegram">Telegram Chat ID</Label>
                <Input
                  id="telegram"
                  type="text"
                  placeholder="Enter your Telegram Chat ID"
                  value={formData.telegramChatId}
                  onChange={(e) => setFormData(prev => ({ ...prev, telegramChatId: e.target.value }))}
                  disabled={!formData.notifications.telegram}
                />
                {!formData.notifications.telegram && (
                  <p className="text-xs text-gray-500">Enable Telegram notifications to edit</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!formData.notifications.email}
                />
                {!formData.notifications.email && (
                  <p className="text-xs text-gray-500">Enable Email notifications to edit</p>
                )}
              </div>

              <Button 
                onClick={handleSave} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Preferences'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your account details and usage statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userData?.points || 0}</div>
                <div className="text-sm text-gray-600">Available Points</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userData?.name}</div>
                <div className="text-sm text-gray-600">Account Name</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {userData ? Object.values(userData.notifications).filter(Boolean).length : 0}/3
                </div>
                <div className="text-sm text-gray-600">Active Channels</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
