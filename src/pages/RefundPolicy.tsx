
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancellation and Refund Policy</h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Refund Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                We want you to be satisfied with our service. Refunds may be available under the following conditions:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• <strong>Unused Points:</strong> Refunds are only available for completely unused notification points</li>
                <li>• <strong>Time Limit:</strong> Refund requests must be made within 7 days of purchase</li>
                <li>• <strong>Service Issues:</strong> If our service fails to deliver notifications due to technical issues on our end</li>
                <li>• <strong>Billing Errors:</strong> If you were charged incorrectly due to a system error</li>
              </ul>
              <p className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
                <strong>Important:</strong> Once notification points have been used to send messages, they cannot be refunded.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Non-Refundable Items</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                The following are not eligible for refunds:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Used notification points (points that have been consumed for sending notifications)</li>
                <li>• Points purchased more than 7 days ago</li>
                <li>• Service fees or processing charges</li>
                <li>• Points used for failed notifications due to invalid recipient information</li>
                <li>• Points consumed due to user configuration errors</li>
                <li>• Points used during trial or testing phases</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Request a Refund</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                To request a refund, please follow these steps:
              </p>
              <ol className="mb-4 space-y-2">
                <li>1. <strong>Contact Support:</strong> Email us at krishnakumar.e.11022002@gmail.com</li>
                <li>2. <strong>Provide Details:</strong> Include your account email, order details, and reason for refund</li>
                <li>3. <strong>Include Information:</strong> Attach payment confirmation and any relevant screenshots</li>
                <li>4. <strong>Wait for Review:</strong> We will review your request within 2-3 business days</li>
              </ol>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Required Information for Refund Requests:</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Your registered email address</li>
                  <li>• Payment transaction ID or order number</li>
                  <li>• Reason for requesting the refund</li>
                  <li>• Date of purchase</li>
                  <li>• Current point balance (screenshot)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refund Processing</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Review Process</h3>
              <p className="mb-4">
                Once we receive your refund request:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• We will review your account and usage history</li>
                <li>• Verify that the points are indeed unused</li>
                <li>• Check if the request meets our refund criteria</li>
                <li>• Respond to your request within 2-3 business days</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Processing Time</h3>
              <p className="mb-4">
                If your refund is approved:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Razorpay refunds: 3-5 business days</li>
                <li>• Bank transfers: 5-7 business days</li>
                <li>• Credit cards: 7-10 business days (varies by bank)</li>
                <li>• UPI/Wallet refunds: 1-3 business days</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cancellation Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Cancellation</h3>
              <p className="mb-4">
                You may cancel your account at any time:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Contact our support team to request account closure</li>
                <li>• All remaining unused points will be forfeited upon cancellation</li>
                <li>• Data will be retained as per our Privacy Policy</li>
                <li>• Account reactivation may not be possible after cancellation</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Cancellation by Us</h3>
              <p className="mb-4">
                We may cancel your service if:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Terms of service are violated</li>
                <li>• Account shows suspicious or fraudulent activity</li>
                <li>• Payment issues remain unresolved</li>
                <li>• Service is discontinued (with 30 days notice)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partial Refunds</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                In certain circumstances, we may offer partial refunds:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• Service outages that prevent notification delivery</li>
                <li>• Technical issues on our end that affect service quality</li>
                <li>• Billing discrepancies or system errors</li>
              </ul>
              <p>
                Partial refunds will be calculated based on the unused portion of your points and the impact of the service issue.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                If you disagree with our refund decision:
              </p>
              <ul className="mb-4 space-y-1">
                <li>• You may request a review by providing additional information</li>
                <li>• Escalate the matter to our management team</li>
                <li>• For payment disputes, contact your bank or Razorpay directly</li>
              </ul>
              <p>
                We are committed to resolving all disputes fairly and transparently.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact for Refunds</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p className="mb-4">
                For all refund-related inquiries, please contact:
              </p>
              <div className="space-y-2 mb-4">
                <p><strong>Email:</strong> krishnakumar.e.11022002@gmail.com</p>
                <p><strong>Subject Line:</strong> "Refund Request - [Your Account Email]"</p>
                <p><strong>Response Time:</strong> 2-3 business days</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Quick Tips for Faster Processing:</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Include all required information in your first email</li>
                  <li>• Use clear and specific subject lines</li>
                  <li>• Attach relevant screenshots or documents</li>
                  <li>• Be patient during the review process</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600">
              <p>
                This refund policy may be updated from time to time. Changes will be posted on this page with an updated revision date. Continued use of our service after changes constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
