import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

console.log('VENICE_API_KEY:', process.env.VENICE_API_KEY);
console.log('VENICE_API_URL:', process.env.VENICE_API_URL);

const VENICE_API_URL = process.env.VENICE_API_URL || 'https://api.venice.ai/api/v1/chat/completions';
const API_KEY = process.env.VENICE_API_KEY || '';

interface ChatRequest {
  model: string;
  messages: { role: string; content: string }[];
  max_tokens?: number;
  temperature?: number;
}

interface ChatResponse {
  choices: { message: { content: string } }[];
}

async function sendMessageToVenice(message: string, userId: string): Promise<string> {
  const requestData: ChatRequest = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message }
    ],
    max_tokens: 1500,
    temperature: 0.7
  };

  try {
    const response = await axios.post(VENICE_API_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    const data: ChatResponse = response.data;
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error sending message to Venice API:', error);
    throw error;
  }
}

async function chatbotInteraction(userMessage: string, userId: string): Promise<void> {
  try {
    const veniceResponse = await sendMessageToVenice(userMessage, userId);
    console.log('Venice API Response:', veniceResponse);
  } catch (error) {
    console.error('Error in chatbot interaction:', error);
  }
}

// Example usage
const userMessage = 'Hello, how can you help me?';
const userId = 'user123';
chatbotInteraction(userMessage, userId); 