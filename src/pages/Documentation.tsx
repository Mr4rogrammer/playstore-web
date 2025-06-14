import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Zap, Shield, Code, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import Navigation from '../components/Navigation';
import { useState } from 'react';

const Documentation: React.FC = () => {
  const { userData } = useAuth();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
      toast({
        title: "Copied to clipboard!",
        description: `${type} has been copied successfully.`,
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually.",
        variant: "destructive",
      });
    }
  };

  const webhookUrl = "https://automation.mrprogrammer.info/webhook/pushNotify";

  const examplePayload = {
    "message": "Hello from your app!",
    "title": "Notification Title",
    "priority": "high",
    "source": "webapp"
  };

  const curlExample = `curl -X POST ${webhookUrl} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: ${userData?.authKey || 'YOUR_AUTH_KEY'}" \\
  -d '${JSON.stringify(examplePayload, null, 2)}'`;

  const jsExample = `fetch('${webhookUrl}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '${userData?.authKey || 'YOUR_AUTH_KEY'}'
  },
  body: JSON.stringify(${JSON.stringify(examplePayload, null, 2)})
})
.then(response => response.json())
.then(data => console.log(data));`;

  const pythonExample = `import requests

url = "${webhookUrl}"
headers = {
    "Content-Type": "application/json",
    "Authorization": "${userData?.authKey || 'YOUR_AUTH_KEY'}"
}
data = ${JSON.stringify(examplePayload, null, 2)}

response = requests.post(url, headers=headers, json=data)
print(response.json())`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Seamlessly integrate PushNotify with your applications using our simple REST API
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <Globe className="w-6 h-6" />
                <CardTitle className="text-lg font-semibold">Webhook URL</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-mono break-all bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                {webhookUrl}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6" />
                <CardTitle className="text-lg font-semibold">Your Auth Key</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-mono break-all bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                {userData?.authKey || 'Please login to view'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6" />
                <CardTitle className="text-lg font-semibold">Method</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">POST</div>
              <p className="text-sm opacity-90">JSON payload required</p>
            </CardContent>
          </Card>
        </div>

        {/* Documentation Sections */}
        <div className="space-y-12">
          {/* Authentication */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
              <CardTitle className="text-2xl flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <span>Authentication</span>
              </CardTitle>
              <CardDescription className="text-lg">
                Secure your API requests with your unique auth key
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-green-400 p-6 rounded-xl font-mono text-lg shadow-inner">
                <span className="text-blue-400">Authorization:</span> {userData?.authKey || 'YOUR_AUTH_KEY'}
              </div>
            </CardContent>
          </Card>

          {/* Request Format */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="text-2xl flex items-center space-x-3">
                <Code className="w-6 h-6 text-blue-600" />
                <span>Request Format</span>
              </CardTitle>
              <CardDescription className="text-lg">
                Send single-level JSON data to trigger notifications across your enabled channels
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">Example Payload</h4>
                  <div className="relative group">
                    <pre className="bg-gradient-to-r from-gray-900 to-gray-800 text-green-400 p-6 rounded-xl text-sm overflow-x-auto shadow-inner border-l-4 border-green-400">
                      {JSON.stringify(examplePayload, null, 2)}
                    </pre>
                    <Button
                      onClick={() => copyToClipboard(JSON.stringify(examplePayload, null, 2), 'Payload')}
                      variant="secondary"
                      size="sm"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {copied === 'Payload' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-400">
                  <h5 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Important Note
                  </h5>
                  <p className="text-blue-800 leading-relaxed">
                    Send any single-level JSON data (no nested objects). The system automatically forwards your payload to all enabled notification channels (Email, Telegram, WhatsApp).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
              <CardTitle className="text-2xl flex items-center space-x-3">
                <Code className="w-6 h-6 text-purple-600" />
                <span>Code Examples</span>
              </CardTitle>
              <CardDescription className="text-lg">
                Ready-to-use implementation examples for popular programming languages
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* cURL */}
                <div className="group">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-800 flex items-center">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">$</span>
                      </div>
                      cURL
                    </h4>
                    <Button
                      onClick={() => copyToClipboard(curlExample, 'cURL')}
                      variant="outline"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {copied === 'cURL' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="bg-gradient-to-r from-gray-900 to-gray-800 text-green-400 p-6 rounded-xl text-sm overflow-x-auto shadow-inner border-l-4 border-orange-400">
                    {curlExample}
                  </pre>
                </div>

                {/* JavaScript */}
                <div className="group">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-800 flex items-center">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">JS</span>
                      </div>
                      JavaScript
                    </h4>
                    <Button
                      onClick={() => copyToClipboard(jsExample, 'JavaScript')}
                      variant="outline"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {copied === 'JavaScript' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="bg-gradient-to-r from-gray-900 to-gray-800 text-green-400 p-6 rounded-xl text-sm overflow-x-auto shadow-inner border-l-4 border-yellow-400">
                    {jsExample}
                  </pre>
                </div>

                {/* Python */}
                <div className="group">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-800 flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">PY</span>
                      </div>
                      Python
                    </h4>
                    <Button
                      onClick={() => copyToClipboard(pythonExample, 'Python')}
                      variant="outline"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {copied === 'Python' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="bg-gradient-to-r from-gray-900 to-gray-800 text-green-400 p-6 rounded-xl text-sm overflow-x-auto shadow-inner border-l-4 border-blue-400">
                    {pythonExample}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Format */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <CardTitle className="text-2xl flex items-center space-x-3">
                <Zap className="w-6 h-6 text-green-600" />
                <span>Response Format</span>
              </CardTitle>
              <CardDescription className="text-lg">
                Understand the API responses for successful and failed requests
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    Success Response (200)
                  </h4>
                  <pre className="bg-gradient-to-r from-gray-900 to-gray-800 text-green-400 p-6 rounded-xl text-sm shadow-inner border-l-4 border-green-400">
{`{
  "success": true,
  "message": "Notifications sent successfully",
  "channels": ["email", "telegram", "whatsapp"],
  "pointsUsed": 5
}`}
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">✗</span>
                    </div>
                    Error Response (400/401)
                  </h4>
                  <pre className="bg-gradient-to-r from-gray-900 to-gray-800 text-red-400 p-6 rounded-xl text-sm shadow-inner border-l-4 border-red-400">
{`{
  "success": false,
  "error": "Invalid auth key",
  "message": "Authentication failed"
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-lg opacity-90 mb-6">
              Copy your auth key and start sending notifications to your users instantly
            </p>
            <Button 
              onClick={() => copyToClipboard(userData?.authKey || '', 'Auth Key')}
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              {copied === 'Auth Key' ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
              Copy Auth Key
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
