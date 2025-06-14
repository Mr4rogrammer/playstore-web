
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
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
            <TabsTrigger value="refund">Refund</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          
          <TabsContent value="privacy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
                <CardDescription>How we collect, use, and protect your data</CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>Information We Collect</h3>
                <p>We collect information you provide when you create an account, including your name, email address, phone number, and Telegram chat ID.</p>
                
                <h3>How We Use Your Information</h3>
                <p>We use your information to provide notification services, process payments, and improve our platform.</p>
                
                <h3>Data Security</h3>
                <p>We use Firebase for secure data storage and authentication. Your data is encrypted and protected.</p>
                
                <h3>Contact Information</h3>
                <p>For privacy-related inquiries, contact us at {contactEmail}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
                <CardDescription>Terms of service for using PushNotify</CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>Service Description</h3>
                <p>PushNotify is a notification forwarding service that sends API payloads to WhatsApp, Telegram, or Email.</p>
                
                <h3>User Obligations</h3>
                <p>Users must provide accurate information and use the service responsibly. Abuse or excessive usage may result in account suspension.</p>
                
                <h3>Service Availability</h3>
                <p>We strive for 99% uptime but cannot guarantee uninterrupted service.</p>
                
                <h3>Account Termination</h3>
                <p>We reserve the right to terminate accounts that violate our terms of service.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="refund" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cancellation and Refund Policy</CardTitle>
                <CardDescription>Information about refunds and cancellations</CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>Refund Eligibility</h3>
                <p>Refunds are available within 7 days of purchase if the service has not been used.</p>
                
                <h3>Non-Refundable Items</h3>
                <p>Used notification points cannot be refunded. Only unused points are eligible for refund.</p>
                
                <h3>Refund Process</h3>
                <p>To request a refund, contact us at {contactEmail} with your order details.</p>
                
                <h3>Processing Time</h3>
                <p>Refunds are processed within 5-7 business days after approval.</p>
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
                <CardTitle>Shipping and Delivery</CardTitle>
                <CardDescription>Information about our digital service delivery</CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>Digital Service</h3>
                <p>PushNotify is a digital service. There are no physical products to ship.</p>
                
                <h3>Service Activation</h3>
                <p>Your notification points are activated immediately after successful payment.</p>
                
                <h3>Access</h3>
                <p>You can access your account and services instantly through our web platform.</p>
                
                <h3>Service Delivery</h3>
                <p>Notifications are delivered in real-time when your webhook is triggered.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Support;
