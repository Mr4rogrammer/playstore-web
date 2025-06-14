
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Award, Lightbulb } from 'lucide-react';

const AboutUs: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To simplify notification delivery for developers and businesses worldwide through reliable, easy-to-use APIs.'
    },
    {
      icon: Users,
      title: 'Our Team',
      description: 'A dedicated team of developers and engineers passionate about creating robust notification solutions.'
    },
    {
      icon: Award,
      title: 'Our Vision',
      description: 'To become the leading platform for multi-channel notification forwarding and communication automation.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology and user-focused solutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PushNotify</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make notification delivery simple, reliable, and accessible for everyone.
          </p>
        </div>

        {/* Company Story */}
        <section className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="text-lg leading-relaxed mb-4">
                PushNotify was born from a simple need: developers and businesses needed a reliable way to send notifications 
                across multiple channels without the complexity of managing multiple APIs and services.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Founded in 2024, we started as a solution to streamline notification delivery for web applications, 
                mobile apps, and business systems. Today, we serve thousands of developers and businesses worldwide, 
                helping them stay connected with their users through Telegram, Email, and WhatsApp.
              </p>
              <p className="text-lg leading-relaxed">
                Our platform is built with simplicity in mind - one API endpoint, multiple delivery channels, 
                and transparent pricing that scales with your needs.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">By the Numbers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
              <div className="text-gray-600">Notification Channels</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
