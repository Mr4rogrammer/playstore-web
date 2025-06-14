
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                By accessing and using PushNotify ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                These Terms and Conditions ("Terms") govern your use of our notification forwarding service operated by PushNotify ("us", "we", or "our").
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                PushNotify is a notification forwarding service that allows users to send API payloads to multiple communication channels including:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Telegram messaging</li>
                <li>• Email notifications</li>
                <li>• WhatsApp messaging (where available)</li>
              </ul>
              <p>
                The service operates on a point-based system where each notification consumes points based on the enabled channels.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Accounts and Registration</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                To use our service, you must:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Create an account with accurate and complete information</li>
                <li>• Maintain the security of your account credentials</li>
                <li>• Be at least 18 years old or have parental consent</li>
                <li>• Accept responsibility for all activities under your account</li>
              </ul>
              <p>
                You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acceptable Use Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">You agree not to use the service to:</p>
              <ul className="mb-4 space-y-1">
                <li>• Send spam, unsolicited, or bulk messages</li>
                <li>• Transmit harmful, threatening, or abusive content</li>
                <li>• Violate any applicable laws or regulations</li>
                <li>• Impersonate others or provide false information</li>
                <li>• Interfere with or disrupt the service or servers</li>
                <li>• Attempt to gain unauthorized access to our systems</li>
                <li>• Use the service for any illegal or unauthorized purpose</li>
              </ul>
              <p>
                Violation of this policy may result in immediate account termination.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                Our service operates on a prepaid point system:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Points must be purchased before using notification services</li>
                <li>• All payments are processed securely through Razorpay</li>
                <li>• Prices are displayed in Indian Rupees (INR)</li>
                <li>• Points are non-transferable and non-refundable once used</li>
                <li>• We reserve the right to change pricing with 30 days notice</li>
              </ul>
              <p>
                Payment failures or chargebacks may result in account suspension until resolved.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                We strive to maintain high service availability but cannot guarantee uninterrupted service:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• We aim for 99.9% uptime but do not guarantee it</li>
                <li>• Scheduled maintenance will be announced in advance</li>
                <li>• Service interruptions may occur due to factors beyond our control</li>
                <li>• We are not liable for any losses due to service interruptions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Our liability is limited to the amount you paid for the service</li>
                <li>• We are not liable for indirect, incidental, or consequential damages</li>
                <li>• We do not guarantee delivery of all notifications</li>
                <li>• Third-party service failures are beyond our control</li>
              </ul>
              <p>
                The service is provided "as is" without warranties of any kind.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                We reserve the right to terminate or suspend accounts:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• For violation of these terms</li>
                <li>• For suspicious or fraudulent activity</li>
                <li>• For non-payment of fees</li>
                <li>• At our sole discretion with reasonable notice</li>
              </ul>
              <p>
                Upon termination, your right to use the service ceases immediately. Unused points may be forfeited.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                The service and its original content remain the property of PushNotify:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• All trademarks and service marks belong to their respective owners</li>
                <li>• You may not copy, modify, or distribute our content without permission</li>
                <li>• User-generated content remains your property but you grant us usage rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                We reserve the right to modify these terms at any time:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Changes will be posted on this page</li>
                <li>• Significant changes will be communicated via email</li>
                <li>• Continued use constitutes acceptance of new terms</li>
                <li>• If you disagree with changes, you may terminate your account</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
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

export default TermsConditions;
