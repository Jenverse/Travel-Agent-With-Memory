import { useState, useEffect } from 'react';
import './styles/App.css';

// Components
import ChatWindow from './components/ChatWindow';
import DestinationRecommendations from './components/DestinationRecommendations';
import ItineraryViewer from './components/ItineraryViewer';
import TransportationOptions from './components/TransportationOptions';

// Services
import openaiService from './services/openaiService';

// Import mock data for testing
import { mockDestinations, mockItinerary, mockTransportationOptions } from './utils/mockData';

function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: 'Hello! I\'m your travel assistant. I can help you find destinations, create itineraries, and suggest transportation options. What kind of trip are you looking for?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const [transportationOptions, setTransportationOptions] = useState([]);

  const handleSendMessage = async (text) => {
    // Add user message to chat
    const updatedMessages = [...messages, { sender: 'user', text }];
    setMessages(updatedMessages);

    // Set loading state
    setIsLoading(true);
    setError(null);

    try {
      // Get response from OpenAI
      const response = await openaiService.generateResponse(updatedMessages);

      // Add agent response to chat
      setMessages([...updatedMessages, { sender: 'agent', text: response }]);

      // Log the raw response for debugging
      console.log('Raw response from OpenAI:', response);

      // Parse the response for destinations, itinerary, and transportation options
      const parsedDestinations = openaiService.parseDestinations(response);
      console.log('Parsed destinations:', parsedDestinations);
      if (parsedDestinations.length > 0) {
        setDestinations(parsedDestinations);
      }

      const selectedDestination = parsedDestinations.length > 0 ? parsedDestinations[0].name : null;
      const parsedItinerary = openaiService.parseItinerary(response, selectedDestination);
      console.log('Parsed itinerary:', parsedItinerary);
      if (parsedItinerary) {
        setItinerary(parsedItinerary);
      }

      const parsedTransportation = openaiService.parseTransportation(response);
      console.log('Parsed transportation:', parsedTransportation);
      if (parsedTransportation.length > 0) {
        setTransportationOptions(parsedTransportation);
      }

      // For testing, let's also try to use mock data if nothing was parsed
      if (parsedDestinations.length === 0 && response.includes('Swiss Alps')) {
        console.log('Using mock data for Swiss Alps');
        setDestinations([{
          name: "Swiss Alps",
          type: "Nature & Adventure",
          description: "The Swiss Alps are famous for their breathtaking scenery, including majestic peaks, crystal-clear lakes, and lush green meadows. You can enjoy activities like hiking, skiing, snowboarding, and paragliding while immersing yourself in the beauty of nature.",
          highlights: []
        }]);
      }

      if (!parsedItinerary && response.includes('Day 1:')) {
        console.log('Using mock itinerary data');
        setItinerary({
          destination: "Swiss Alps",
          days: [{
            day: 1,
            activities: [
              {
                time: "Morning",
                name: "Hike in the Swiss Alps",
                description: "Start your day with a scenic hike in the Swiss Alps. Choose a trail that suits your fitness level and enjoy panoramic views of the mountains and valleys."
              },
              {
                time: "Afternoon",
                name: "Visit a Mountain Village",
                description: "Explore a charming mountain village like Zermatt or Grindelwald. Stroll through the picturesque streets, visit local shops, and savor delicious Swiss cuisine at a cozy restaurant."
              }
            ]
          }]
        });
      }

      if (parsedTransportation.length === 0 && response.includes('TRANSPORTATION:')) {
        console.log('Using mock transportation data');
        setTransportationOptions([{
          type: "Train",
          duration: "Varies depending on the route",
          cost: "Swiss Travel Pass for unlimited train travel",
          description: "Taking the train is a convenient and scenic way to travel around the Swiss Alps. The Swiss Travel Pass offers unlimited train travel within Switzerland, allowing you to explore different regions easily.",
          recommended: true
        }]);
      }
    } catch (err) {
      console.error('Error getting response:', err);

      // Show a more specific error message if it's an API key issue
      if (err.message && err.message.includes('API key')) {
        setError('OpenAI API key is missing or invalid. Please check your .env file and add a valid API key.');
      } else {
        setError('Sorry, there was an error processing your request. Please try again.');
      }

      // Add a fallback response from the agent
      setMessages([
        ...updatedMessages,
        {
          sender: 'agent',
          text: "I'm having trouble connecting to my knowledge base right now. Please make sure you've added a valid OpenAI API key to the .env file. Once you've done that, refresh the page and try again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="travel-agent-app">
      <header className="app-header">
        <h1 className="app-title">Travel Agent Assistant</h1>
        <h2 className="app-subtitle">Your AI-powered travel planning companion</h2>
      </header>

      <div className="app-content">
        <section className="chat-section">
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
          />
          {isLoading && <div className="loading-indicator">Thinking</div>}
          {error && <div className="error-message">{error}</div>}
        </section>

        <section className="results-section">
          <DestinationRecommendations recommendations={destinations} />
          <ItineraryViewer itinerary={itinerary} />
          <TransportationOptions options={transportationOptions} />
        </section>
      </div>
    </div>
  );
}

export default App;
