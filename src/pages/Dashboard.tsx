
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Navigation from '../components/Navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WebhookUsage {
  id: string;
  timestamp: any;
  channel: string;
  pointCost: number;
  payloadSummary: string;
}

const Dashboard: React.FC = () => {
  const { user, userData } = useAuth();
  const [webhookUsages, setWebhookUsages] = useState<WebhookUsage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebhookUsages = async () => {
      if (!user) return;
      
      try {
        const webhooksRef = collection(db, 'users', user.uid, 'webhooks');
        const q = query(webhooksRef, orderBy('timestamp', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        
        const usages: WebhookUsage[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as WebhookUsage[];
        
        setWebhookUsages(usages);
      } catch (error) {
        console.error('Error fetching webhook usages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebhookUsages();
  }, [user]);

  const chartData = [
    { name: 'WhatsApp', usage: webhookUsages.filter(w => w.channel === 'whatsapp').length },
    { name: 'Telegram', usage: webhookUsages.filter(w => w.channel === 'telegram').length },
    { name: 'Email', usage: webhookUsages.filter(w => w.channel === 'email').length },
  ];

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return 'bg-green-500';
      case 'telegram': return 'bg-blue-500';
      case 'email': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return '📱';
      case 'telegram': return '✈️';
      case 'email': return '📧';
      default: return '📨';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userData?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor your webhook usage and manage your notifications
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

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Webhooks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">📊 {webhookUsages.length}</div>
              <p className="text-xs opacity-90 mt-1">
                Notifications sent this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>
                Breakdown of notifications by channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Webhook Usage</CardTitle>
              <CardDescription>
                Latest notification deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : webhookUsages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>No webhook usage yet</p>
                  <p className="text-sm">Start sending notifications to see your activity here</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {webhookUsages.map((usage) => (
                    <div key={usage.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-lg">
                          {getChannelIcon(usage.channel)}
                        </div>
                        <div>
                          <div className="font-medium capitalize">{usage.channel}</div>
                          <div className="text-sm text-gray-500">
                            {usage.payloadSummary || 'Notification sent'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">-{usage.pointCost} pts</Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {usage.timestamp?.toDate?.()?.toLocaleDateString() || 'Recent'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
