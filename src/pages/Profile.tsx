
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import Navigation from '../components/Navigation';

const Profile: React.FC = () => {
  const { userData, updateUserEmail } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailUpdate, setShowEmailUpdate] = useState(false);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !password) return;
    
    setLoading(true);
    try {
      await updateUserEmail(newEmail, password);
      toast({
        title: "Email updated successfully!",
        description: "Your email has been changed.",
      });
      setNewEmail('');
      setPassword('');
      setShowEmailUpdate(false);
    } catch (error: any) {
      toast({
        title: "Email update failed",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">
            Your account information and settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Your usage and account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{userData?.points || 0}</div>
                  <div className="text-sm text-gray-600">Available Points</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">{userData?.name}</div>
                  <div className="text-sm text-gray-600">Account Name</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {userData ? Object.values(userData.notifications).filter(Boolean).length : 0}/3
                  </div>
                  <div className="text-sm text-gray-600">Active Channels</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">Email</Label>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{userData?.email}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowEmailUpdate(!showEmailUpdate)}
                  >
                    Change
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-gray-600">Pack Type</Label>
                <div className="font-medium capitalize">
                  {userData?.packType === 'none' ? 'Free Plan' : `${userData?.packType} Pack`}
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-gray-600">Auth ID</Label>
                <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                  {userData?.authId}
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-gray-600">Account Status</Label>
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  userData?.status === 'blocked' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {userData?.status === 'blocked' ? 'Blocked' : 'Active'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {showEmailUpdate && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Update Email Address</CardTitle>
              <CardDescription>
                Enter your new email and current password to update
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="newEmail">New Email</Label>
                  <Input
                    id="newEmail"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter new email address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Current Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your current password"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Email'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowEmailUpdate(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
