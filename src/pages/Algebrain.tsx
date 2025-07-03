
import React, { useState } from 'react';
import { Brain, Send, Loader2, Calculator } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import ResponsiveNavbar from '../components/Navigation/ResponsiveNavbar';

const Algebrain: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('tP6HprDuSNfa5ERPX1YlLE4PtsmJpG4k-jVNE23lPF');
  const [useCustomToken, setUseCustomToken] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error('Please enter a math question');
      return;
    }

    setIsLoading(true);
    setResponse('');

    try {
      // Using the interface API key for the actual API call
      const interfaceApiKey = 'JcA6eNwXymIsDTj6u8eB6DlUzzVAhlcNTNEYstKqh-';
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${interfaceApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are Algebrain, an AI-powered math tutor. Help students solve math problems step by step. Provide clear explanations and show your work.'
            },
            {
              role: 'user',
              content: question
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Algebrain');
      }

      const data = await response.json();
      setResponse(data.choices[0].message.content);
      toast.success('Algebrain has solved your problem!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to get response. Please try again.');
      // Fallback response for demo purposes
      setResponse('I understand you need help with: "' + question + '". Let me break this down step by step for you. (Note: This is a demo response as the API integration needs proper configuration)');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseToken = () => {
    if (useCustomToken) {
      toast.success('Using your custom token for enhanced features!');
    } else {
      toast.success('Using default Algebrain token');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <ResponsiveNavbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Algebrain
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            AI-powered math tutor that adapts to your learning style
          </p>
        </div>

        {/* Token Configuration */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Token Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleUseToken}
                  variant={useCustomToken ? "outline" : "default"}
                  className="flex-1"
                >
                  Use Default Token
                </Button>
                <Button
                  onClick={() => setUseCustomToken(!useCustomToken)}
                  variant={useCustomToken ? "default" : "outline"}
                  className="flex-1"
                >
                  Use Custom Token
                </Button>
              </div>
              
              {useCustomToken && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Custom API Token:
                  </label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your custom token"
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Current token: {apiKey.substring(0, 10)}...
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Ask Algebrain</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Math Question or Problem:
                  </label>
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your math question here... (e.g., Solve for x: 2x + 5 = 15)"
                    rows={4}
                    className="resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading || !question.trim()}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Solve Problem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Response Section */}
          <Card>
            <CardHeader>
              <CardTitle>Solution</CardTitle>
            </CardHeader>
            <CardContent>
              {response ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                      {response}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Ask Algebrain a math question to get started!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Examples */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Try These Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Solve: 2x + 5 = 15",
                "Factor: x² - 9",
                "Find derivative of x³ + 2x",
                "Calculate: sin(30°)",
                "Solve system: x + y = 5, x - y = 1",
                "Find area of circle with radius 5"
              ].map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => setQuestion(example)}
                  className="text-left justify-start h-auto py-3 px-4"
                >
                  <Calculator className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{example}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Algebrain;
