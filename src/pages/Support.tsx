
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Mail, Instagram } from 'lucide-react';
import Navigation from '../components/Navigation';

const Support: React.FC = () => {
  const contactEmail = 'krishnakumar.e.11022002@gmail.com';
  const instagramUrl = 'https://www.instagram.com/krishnakumar_eswaran/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Support & Legal</h1>
          <p className="text-gray-600 mt-2">
            Find answers, policies, and contact information
          </p>
        </div>

        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="privacy">Service Description</TabsTrigger>
            <TabsTrigger value="terms">User Responsibilities</TabsTrigger>
            <TabsTrigger value="refund">Service Availability</TabsTrigger>
             <TabsTrigger value="shipping">Account Termination</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
           
          </TabsList>
          
          <TabsContent value="privacy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Description</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>Snappify is an API-based service that allows users to fetch Play Store app details using a package name and forward the data to platforms.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>Users must ensure the accuracy of the information they provide and use Snappify in a lawful and responsible manner. Misuse, abuse, or excessive use of the service may result in suspension or restriction of access.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="refund" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Availability</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>We aim to maintain a 99% uptime for Snappify. However, we do not guarantee uninterrupted access and occasional downtime may occur due to maintenance or external factors.
</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={() => window.location.href = `mailto:${contactEmail}`}
                    className="flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Support</span>
                  </Button>
                  <span className="text-gray-600">{contactEmail}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={() => window.open(instagramUrl, '_blank')}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </Button>
                  <span className="text-gray-600">@krishnakumar_eswaran</span>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Response Time</h4>
                  <p className="text-blue-700 text-sm">We typically respond to inquiries within 24 hours during business days.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Suspension & Termination</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>We reserve the right to suspend or terminate user accounts that violate our terms of service or engage in activities that compromise the integrity or reliability of Snappify.

</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Support;
