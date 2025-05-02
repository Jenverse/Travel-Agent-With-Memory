// Simple script to test the OpenAI API key
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.VITE_OPENAI_API_KEY;

console.log('API Key available:', !!API_KEY);
console.log('API Key length:', API_KEY ? API_KEY.length : 0);

async function testOpenAI() {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: 'Hello, how are you?'
          }
        ],
        temperature: 0.7,
        max_tokens: 100
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    console.log('API call successful!');
    console.log('Response:', response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error calling OpenAI API:');
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received');
    } else {
      console.error('Error message:', error.message);
    }
  }
}

testOpenAI();
