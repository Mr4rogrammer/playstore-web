
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Instagram, MapPin, Clock } from 'lucide-react';

const ContactUs: React.FC = () => {
  const contactEmail = 'krishnakumar.e.11022002@gmail.com';
  const instagramUrl = 'https://www.instagram.com/krishnakumar_eswaran/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <span>Email Support</span>
                </CardTitle>
                <CardDescription>
                  Get in touch with our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-2">Send us an email at:</p>
                    <p className="text-lg font-medium text-gray-900">{contactEmail}</p>
                  </div>
                  <Button 
                    onClick={() => window.location.href = `mailto:${contactEmail}`}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Instagram className="w-6 h-6 text-pink-600" />
                  <span>Social Media</span>
                </CardTitle>
                <CardDescription>
                  Follow us on social media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-2">Connect with us on Instagram:</p>
                    <p className="text-lg font-medium text-gray-900">@krishnakumar_eswaran</p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => window.open(instagramUrl, '_blank')}
                  >
                    Visit Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <span>Operating Address</span>
                </CardTitle>
                <CardDescription>
                  Our business location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600">
                  <p className="font-medium text-gray-900 mb-2">PushNotify</p>
                  <p>Chennai, Tamil Nadu</p>
                  <p>India</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <span>Response Time</span>
                </CardTitle>
                <CardDescription>
                  When you can expect to hear from us
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Support Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 4:00 PM IST</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Response Time</h4>
                    <p className="text-gray-600">We typically respond within 24 hours during business days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-blue-800">
                  <div>
                    <h4 className="font-medium mb-2">How do I get started?</h4>
                    <p className="text-sm">Sign up for an account, choose a plan, and start sending notifications through our API.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">What channels do you support?</h4>
                    <p className="text-sm">We support Telegram, Email, and WhatsApp notifications.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">How is pricing calculated?</h4>
                    <p className="text-sm">Pricing is based on notification points consumed per webhook call across enabled channels.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-900">Need Technical Support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-800 text-sm mb-4">
                  For technical issues, API questions, or integration support, please include:
                </p>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Your account email</li>
                  <li>• Description of the issue</li>
                  <li>• Error messages (if any)</li>
                  <li>• Steps to reproduce the problem</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
