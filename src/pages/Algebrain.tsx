import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Send, User, Bot, Calculator, BookOpen, Trophy, Lightbulb, RefreshCw } from 'lucide-react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const apiKey = import.meta.env.VITE_VENICE_AI_TOKEN;
  let baseUrl = import.meta.env.VITE_VENICE_AI_BASE_URL;
  if (baseUrl && baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickExamples = [
    { icon: Calculator, text: 'Solve: 2x + 5 = 13', category: 'Algebra' },
    { icon: BookOpen, text: 'Explain derivatives', category: 'Calculus' },
    { icon: Trophy, text: 'Pythagorean theorem', category: 'Geometry' },
    { icon: Lightbulb, text: 'Factor: x² - 5x + 6', category: 'Algebra' }
  ];

  const handleQuickExample = (example: string) => {
    setInput(example);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m Algebrain, your AI-powered math tutor. I can help you solve equations, understand concepts, and work through problems step-by-step. What math topic would you like to explore today?',
        timestamp: new Date()
      }
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

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
      if (!apiKey || !baseUrl) {
        toast({
          title: 'Configuration Error',
          description: 'Venice AI API key or base URL is not set. Please check your .env file.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      const url = `${baseUrl}/inference`;
      console.log('Sending request to Venice AI with input:', currentInput, 'URL:', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are Algebrain, an expert AI math tutor. Help students understand mathematical concepts by providing clear, step-by-step explanations. Always be encouraging and patient. Format your responses to be educational and easy to follow. Focus on mathematics, algebra, calculus, geometry, and related topics. Use proper mathematical notation when needed.'
            },
            ...messages.map(msg => ({
              role: msg.role === 'assistant' ? 'assistant' : 'user',
              content: msg.content
            })),
            {
              role: 'user',
              content: currentInput
            }
          ],
          max_tokens: 1500,
          temperature: 0.7,
          stream: false
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      const aiResponse = data.choices?.[0]?.message?.content || data.message?.content || 'Sorry, I couldn\'t process that request.';

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
        title: 'Connection Error',
        description: 'Failed to connect to Venice AI. Please check your internet connection and try again.',
        variant: 'destructive',
      });
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I\'m having trouble connecting to the AI service right now. Please check your internet connection and try again in a moment. If the problem persists, the Venice AI service might be temporarily unavailable.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
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
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Your AI-powered math tutor powered by Venice AI
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Connected to Venice AI</span>
          </div>
        </div>

        {/* Quick Examples */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Quick Start Examples
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearChat}
                className="text-xs"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Clear Chat
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickExamples.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                  onClick={() => handleQuickExample(example.text)}
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

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col shadow-lg">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-green-600" />
                Math Tutoring Session
              </div>
              <div className="text-sm text-gray-500">
                {messages.length - 1} messages
              </div>
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
                  <div className={`flex items-start space-x-2 max-w-[85%] ${
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
                    <div className={`rounded-lg p-4 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border'
                    }`}>
                      <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                      <div className={`text-xs mt-2 opacity-70 ${
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
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-500">Algebrain is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4 bg-gray-50 dark:bg-gray-800">
              <div className="flex space-x-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me any math question... (Press Enter to send)"
                  disabled={isLoading}
                  className="flex-1 bg-white dark:bg-gray-700"
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 px-6"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Algebrain can help with algebra, calculus, geometry, and more!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold mb-2">Adaptive Learning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adjusts explanations to your learning style and pace
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Calculator className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Step-by-Step</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Breaks down complex problems into manageable steps
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
              <h3 className="font-semibold mb-2">Instant Help</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get immediate assistance with any math concept
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Algebrain;
