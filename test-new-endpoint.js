import fetch from 'node-fetch';

async function testNewEndpoint() {
  try {
    console.log('Testing new API endpoint...');
    
    const response = await fetch('https://api.forgecode.dev/api/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-fg-v1-2e0e98fdf569036838a1fa1315d6920ebc681a300aa62cd710fc857b7bcba176',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro-preview',
        messages: [
          {
            role: 'system',
            content: 'You are Algebrain, an expert AI math tutor.'
          },
          {
            role: 'user',
            content: 'What is 1+1? Please explain step by step.'
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }

    const data = await response.json();
    console.log('Success! API Response:', JSON.stringify(data, null, 2));
    
    if (data.choices && data.choices[0]) {
      console.log('\n=== AI Response ===');
      console.log(data.choices[0].message.content);
    }
  } catch (error) {
    console.error('Network error:', error.message);
  }
}

testNewEndpoint(); 