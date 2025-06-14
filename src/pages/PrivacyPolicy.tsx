
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="mb-4">
                When you create an account with PushNotify, we collect information you provide directly to us, including:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Name and email address</li>
                <li>• Phone number (for WhatsApp notifications)</li>
                <li>• Telegram chat ID (for Telegram notifications)</li>
                <li>• Payment information (processed securely through Razorpay)</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Information</h3>
              <p className="mb-4">
                We automatically collect certain information about your use of our service, including:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• API usage and webhook calls</li>
                <li>• Notification delivery status</li>
                <li>• Account activity and login information</li>
                <li>• Device and browser information</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="mb-4 space-y-1">
                <li>• Provide and maintain our notification forwarding service</li>
                <li>• Process payments and manage your account</li>
                <li>• Send notifications through your chosen channels</li>
                <li>• Provide customer support and respond to your inquiries</li>
                <li>• Monitor and analyze usage patterns to improve our service</li>
                <li>• Ensure security and prevent fraud</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• <strong>Service Providers:</strong> We may share information with trusted third-party service providers (like Razorpay for payments) who assist us in operating our service</li>
                <li>• <strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
                <li>• <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                <li>• <strong>Consent:</strong> We may share information with your explicit consent</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Data encryption during transmission and storage</li>
                <li>• Secure servers and databases with access controls</li>
                <li>• Regular security audits and updates</li>
                <li>• Authentication and authorization mechanisms</li>
              </ul>
              <p>
                While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Account information: Retained while your account is active</li>
                <li>• Usage data: Retained for up to 2 years for analytics and improvement</li>
                <li>• Payment records: Retained as required by law (typically 7 years)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">You have the right to:</p>
              <ul className="mb-4 space-y-1">
                <li>• Access and update your personal information</li>
                <li>• Request deletion of your personal information</li>
                <li>• Opt-out of certain communications</li>
                <li>• Request a copy of your data</li>
                <li>• Lodge a complaint with supervisory authorities</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at <a href="mailto:krishnakumar.e.11022002@gmail.com" className="text-blue-600 hover:underline">krishnakumar.e.11022002@gmail.com</a>.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> krishnakumar.e.11022002@gmail.com</p>
                <p><strong>Address:</strong> Chennai, Tamil Nadu, India</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
