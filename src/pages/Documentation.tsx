
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
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

  const webhookUrl = "https://n8n.mrprogrammer.info/webhook/sample";

  const examplePayload = {
    "message": "Hello from your app!",
    "title": "Notification Title",
    "data": {
      "key1": "value1",
      "key2": "value2"
    }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
          <p className="text-gray-600 mt-2">
            Learn how to integrate PushNotify with your applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Webhook URL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold break-all">{webhookUrl}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Your Auth Key</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold font-mono break-all">
                {userData?.authKey || 'Please login to view'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">POST</div>
              <p className="text-xs opacity-90 mt-1">JSON payload required</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Include your auth key in the Authorization header
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                Authorization: {userData?.authKey || 'YOUR_AUTH_KEY'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request Format</CardTitle>
              <CardDescription>
                Send a JSON payload with your notification data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Example Payload:</h4>
                  <div className="relative">
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                      {JSON.stringify(examplePayload, null, 2)}
                    </pre>
                    <Button
                      onClick={() => copyToClipboard(JSON.stringify(examplePayload, null, 2), 'Payload')}
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                    >
                      {copied === 'Payload' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Note:</h5>
                  <p className="text-blue-700 text-sm">
                    You can send any single-level JSON data. The system will forward your payload to the enabled notification channels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>
                Implementation examples in different programming languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2 flex items-center justify-between">
                    cURL
                    <Button
                      onClick={() => copyToClipboard(curlExample, 'cURL')}
                      variant="outline"
                      size="sm"
                    >
                      {copied === 'cURL' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </h4>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    {curlExample}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center justify-between">
                    JavaScript
                    <Button
                      onClick={() => copyToClipboard(jsExample, 'JavaScript')}
                      variant="outline"
                      size="sm"
                    >
                      {copied === 'JavaScript' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </h4>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    {jsExample}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center justify-between">
                    Python
                    <Button
                      onClick={() => copyToClipboard(pythonExample, 'Python')}
                      variant="outline"
                      size="sm"
                    >
                      {copied === 'Python' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </h4>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    {pythonExample}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Format</CardTitle>
              <CardDescription>
                Expected response from the webhook
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Success Response (200):</h4>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm">
{`{
  "success": true,
  "message": "Notifications sent successfully",
  "channels": ["telegram", "email"],
  "pointsUsed": 3
}`}
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Error Response (400/401):</h4>
                  <pre className="bg-gray-900 text-red-400 p-4 rounded-lg text-sm">
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
      </div>
    </div>
  );
};

export default Documentation;
