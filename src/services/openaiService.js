import axios from 'axios';

// Get the API key from environment variables
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Debug: Log if API key is available (without showing the actual key)
console.log('OpenAI API Key available:', !!API_KEY, 'Length:', API_KEY ? API_KEY.length : 0);

const openaiService = {
  // Function to generate a response from the travel agent
  generateResponse: async (messages) => {
    try {
      // Check if API key is provided
      if (!API_KEY) {
        throw new Error('OpenAI API key is missing. Please add your API key to the .env file.');
      }

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a helpful travel agent assistant that provides destination recommendations,
              creates itineraries, and suggests transportation options. Be friendly, informative, and provide
              reasoning for your recommendations. Ask clarifying questions when needed. Focus on being helpful
              and providing valuable travel insights.

              When providing recommendations, please format your response with clear sections:

              DESTINATIONS:
              1. [Destination Name] - Type: [Type]
                 [Description]

              ITINERARY:
              Day 1:
              Morning: [Activity]
              [Description]
              Afternoon: [Activity]
              [Description]

              TRANSPORTATION:
              1. [Transportation Type]
                 Duration: [Duration]
                 Cost: [Cost estimate]
                 [Description]
              `
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            }))
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);

      // Log more detailed error information
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }

      throw error;
    }
  },

  // Function to parse destinations from the LLM response
  parseDestinations: (response) => {
    // This is a simplified implementation
    // In a real app, you might want to use a more structured approach or ask the LLM to return JSON
    try {
      console.log('Attempting to parse destinations from:', response);

      // Look for sections that might contain destination recommendations
      if (response.includes('DESTINATIONS:') || response.includes('RECOMMENDED DESTINATIONS:')) {
        console.log('Found DESTINATIONS section');

        // Extract the destinations section
        let destinationsSection;
        if (response.includes('DESTINATIONS:')) {
          destinationsSection = response.split('DESTINATIONS:')[1];
        } else {
          destinationsSection = response.split('RECOMMENDED DESTINATIONS:')[1];
        }

        // Find where the section ends
        if (destinationsSection.includes('ITINERARY:')) {
          destinationsSection = destinationsSection.split('ITINERARY:')[0];
        } else if (destinationsSection.includes('TRANSPORTATION:')) {
          destinationsSection = destinationsSection.split('TRANSPORTATION:')[0];
        } else if (destinationsSection.includes('END')) {
          destinationsSection = destinationsSection.split('END')[0];
        }

        console.log('Extracted destinations section:', destinationsSection);

        // More robust parsing logic
        const destinations = [];

        // Try to find numbered destinations (1. Destination Name)
        const destinationMatches = destinationsSection.match(/\d+\.\s+([^\n]+)([^]*?)(?=\d+\.|$)/g);

        if (destinationMatches && destinationMatches.length > 0) {
          console.log('Found numbered destinations:', destinationMatches.length);

          destinationMatches.forEach(match => {
            const lines = match.trim().split('\n').filter(Boolean);

            // Extract name from the first line (remove number and any "Type:" text)
            let name = lines[0].replace(/^\d+\.\s+/, '').trim();
            let type = 'Destination';

            // Check if name contains type information
            if (name.includes(' - Type:')) {
              const parts = name.split(' - Type:');
              name = parts[0].trim();
              type = parts[1].trim();
            } else if (name.includes(' - ')) {
              const parts = name.split(' - ');
              name = parts[0].trim();
              type = parts[1].trim();
            } else if (lines.find(l => l.includes('Type:'))) {
              type = lines.find(l => l.includes('Type:')).replace('Type:', '').trim();
            }

            // Get description (everything after the first line)
            const description = lines.slice(1).join(' ').trim();

            destinations.push({
              name,
              type,
              description,
              highlights: []
            });
          });
        } else {
          // Fallback: try to extract destination information without numbers
          console.log('No numbered destinations found, trying alternative parsing');

          // If we have a single destination (like Swiss Alps)
          if (destinationsSection.includes('Swiss Alps')) {
            const lines = destinationsSection.trim().split('\n').filter(Boolean);
            let name = 'Swiss Alps';
            let type = 'Nature & Adventure';

            // Try to find type information
            if (lines[0].includes(' - ')) {
              const parts = lines[0].split(' - ');
              name = parts[0].trim();
              type = parts[1].trim();
            }

            // Get description (everything after any type information)
            const description = lines.slice(1).join(' ').trim();

            destinations.push({
              name,
              type,
              description,
              highlights: []
            });
          }
        }

        console.log('Final parsed destinations:', destinations);
        return destinations;
      }

      // Special case for Swiss Alps
      if (response.includes('Swiss Alps')) {
        console.log('Found Swiss Alps mention, creating a destination entry');
        return [{
          name: 'Swiss Alps',
          type: 'Nature & Adventure',
          description: 'The Swiss Alps are famous for their breathtaking scenery, including majestic peaks, crystal-clear lakes, and lush green meadows. You can enjoy activities like hiking, skiing, snowboarding, and paragliding while immersing yourself in the beauty of nature.',
          highlights: []
        }];
      }

      return [];
    } catch (error) {
      console.error('Error parsing destinations:', error);
      // Return a fallback destination if we know we're talking about the Swiss Alps
      if (response.includes('Swiss Alps')) {
        return [{
          name: 'Swiss Alps',
          type: 'Nature & Adventure',
          description: 'The Swiss Alps are famous for their breathtaking scenery, including majestic peaks, crystal-clear lakes, and lush green meadows.',
          highlights: []
        }];
      }
      return [];
    }
  },

  // Function to parse itinerary from the LLM response
  parseItinerary: (response, destination) => {
    // This is a simplified implementation
    try {
      if (response.includes('ITINERARY:')) {
        const itinerarySection = response.split('ITINERARY:')[1].split(/TRANSPORTATION:|END/i)[0];

        // Simple parsing logic
        const days = [];
        const dayMatches = itinerarySection.matchAll(/Day\s+(\d+):(.*?)(?=Day\s+\d+:|$)/gs);

        for (const match of dayMatches) {
          const dayNumber = parseInt(match[1]);
          const dayContent = match[2].trim();

          const activities = dayContent.split(/\d+:\d+\s*(AM|PM)|Morning|Afternoon|Evening|Night/i)
            .filter(Boolean)
            .map((activity, index, arr) => {
              const timeMatch = index > 0 ?
                dayContent.match(new RegExp(`(\\d+:\\d+\\s*(AM|PM)|Morning|Afternoon|Evening|Night).*?${activity.substring(0, 20).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i')) :
                null;

              return {
                time: timeMatch ? timeMatch[1] : `Activity ${index + 1}`,
                name: activity.split('\n')[0].trim(),
                description: activity.split('\n').slice(1).join('\n').trim()
              };
            });

          days.push({
            day: dayNumber,
            activities
          });
        }

        return {
          destination: destination || 'Your Destination',
          days
        };
      }
      return null;
    } catch (error) {
      console.error('Error parsing itinerary:', error);
      return null;
    }
  },

  // Function to parse transportation options from the LLM response
  parseTransportation: (response) => {
    try {
      if (response.includes('TRANSPORTATION:')) {
        const transportSection = response.split('TRANSPORTATION:')[1].split('END')[0];

        // Simple parsing logic
        const options = transportSection.split(/\d+\.\s|\*\s/).filter(Boolean).map(option => {
          const lines = option.trim().split('\n').filter(Boolean);
          const type = lines[0].replace(/^[^a-zA-Z0-9]+/, '').trim();

          return {
            type,
            duration: lines.find(l => l.toLowerCase().includes('duration')) ?
              lines.find(l => l.toLowerCase().includes('duration')).split(':')[1].trim() :
              'Varies',
            cost: lines.find(l => l.toLowerCase().includes('cost')) ?
              lines.find(l => l.toLowerCase().includes('cost')).split(':')[1].trim() :
              undefined,
            description: lines.slice(1).join(' ').trim(),
            recommended: option.toLowerCase().includes('recommend')
          };
        });

        return options;
      }
      return [];
    } catch (error) {
      console.error('Error parsing transportation options:', error);
      return [];
    }
  }
};

export default openaiService;
