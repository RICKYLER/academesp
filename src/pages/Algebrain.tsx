
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Send, User, Bot, Calculator, BookOpen, Trophy, Lightbulb, Key, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Algebrain = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Algebrain, your AI-powered math tutor. I can help you solve equations, understand concepts, and work through problems step-by-step. What math topic would you like to explore today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_api_key') || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('openai_api_key', apiKey);
    }
  }, [apiKey]);

  const quickExamples = [
    { icon: Calculator, text: 'Solve: 2x + 5 = 13', category: 'Algebra' },
    { icon: BookOpen, text: 'Explain derivatives', category: 'Calculus' },
    { icon: Trophy, text: 'Pythagorean theorem', category: 'Geometry' },
    { icon: Lightbulb, text: 'Factor: x² - 5x + 6', category: 'Algebra' }
  ];

  const handleQuickExample = (example: string) => {
    setInput(example);
  };

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: 'API Key Required',
        description: 'Please enter your OpenAI API key to use Algebrain.',
        variant: 'destructive',
      });
      return;
    }
    setShowApiKeyInput(false);
    toast({
      title: 'API Key Saved',
      description: 'Your API key has been saved locally. You can now chat with Algebrain!',
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!apiKey) {
      toast({
        title: 'API Key Required',
        description: 'Please enter your OpenAI API key first.',
        variant: 'destructive',
      });
      setShowApiKeyInput(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are Algebrain, an expert AI math tutor. Help students understand mathematical concepts by providing clear, step-by-step explanations. Always be encouraging and patient. Format your responses to be educational and easy to follow. You can help with any topic - math, science, programming, or general questions.'
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: currentInput
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from AI');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I couldn\'t process that request.';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to get response from Algebrain. Please check your API key and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showApiKeyInput) {
        handleApiKeySubmit();
      } else {
        sendMessage();
      }
    }
  };

  const clearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('openai_api_key');
    setShowApiKeyInput(true);
    toast({
      title: 'API Key Cleared',
      description: 'Your API key has been removed.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Algebrain
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your AI-powered tutor that can help with any topic
          </p>
        </div>

        {/* API Key Setup */}
        {showApiKeyInput && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200">
                <Key className="w-5 h-5 mr-2" />
                OpenAI API Key Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
                To use Algebrain, you need to provide your OpenAI API key. Get one at{' '}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                  platform.openai.com/api-keys
                </a>
              </p>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="sk-..."
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <Button onClick={handleApiKeySubmit} disabled={!apiKey.trim()}>
                  Save Key
                </Button>
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                Your API key is stored locally in your browser and never sent to our servers.
              </p>
            </CardContent>
          </Card>
        )}

        {/* API Key Status */}
        {!showApiKeyInput && apiKey && (
          <Card className="mb-6 border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800">
            <CardContent className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-green-700 dark:text-green-300">
                  <Key className="w-4 h-4 mr-2" />
                  <span className="text-sm">API Key configured</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKeyInput(true)}
                  >
                    Change Key
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearApiKey}
                  >
                    Clear Key
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Examples */}
        {!showApiKeyInput && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Start Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickExamples.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 text-left justify-start hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={() => handleQuickExample(example.text)}
                    disabled={!apiKey}
                  >
                    <example.icon className="w-5 h-5 mr-3 text-green-600" />
                    <div>
                      <div className="font-medium">{example.text}</div>
                      <div className="text-xs text-gray-500 mt-1">{example.category}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Interface */}
        {!showApiKeyInput && (
          <Card className="h-[500px] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-green-600" />
                Chat with Algebrain
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-blue-500' 
                          : 'bg-gradient-to-r from-green-400 to-blue-500'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className={`text-xs mt-1 opacity-70 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything - math, science, programming, or general questions..."
                    disabled={isLoading || !apiKey}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={isLoading || !input.trim() || !apiKey}
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get help with any topic using advanced AI technology
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Calculator className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Step-by-Step</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Breaks down complex problems into manageable steps
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
              <h3 className="font-semibold mb-2">Instant Help</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get immediate assistance with any question
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Algebrain;
