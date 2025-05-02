# Travel Agent LLM Application

A conversational AI travel assistant that helps users plan their trips by recommending destinations, generating itineraries, and suggesting transportation options.

## Features

- **Destination Recommendations**: Get personalized destination suggestions based on your preferences (beaches, cities, mountains, etc.)
- **Customized Itineraries**: Receive detailed day-by-day itineraries for your selected destinations
- **Transportation Options**: Get suggestions for the best ways to travel to and around your destination
- **Conversational Interface**: Interact with the travel agent through a natural chat interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd travel-agent-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your OpenAI API key:
   - Open the `.env` file in the root directory
   - Replace `your-openai-api-key-here` in `VITE_OPENAI_API_KEY=your-openai-api-key-here` with your actual OpenAI API key

### Running the Application

Start the development server:
```
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Start a conversation with the travel agent by typing in the chat box
2. Ask about destinations you're interested in or specify your preferences
3. The agent will provide recommendations, which will appear in the destination section
4. Ask for an itinerary for a specific destination
5. Inquire about transportation options to and around your chosen destination

## Example Prompts

- "I'm looking for a beach destination for my honeymoon"
- "Can you recommend mountain destinations in Europe?"
- "I want to visit Japan for 7 days. What should my itinerary look like?"
- "What's the best way to get around in Bali?"
- "I'm traveling with kids and want a family-friendly destination"

## Development

### Project Structure

- `src/components/`: React components for the UI
- `src/services/`: Services for API communication
- `src/styles/`: CSS files for styling
- `src/utils/`: Utility functions and mock data

### Using Mock Data

For development without API calls, you can use the mock data provided in `src/utils/mockData.js`. To use mock data:

1. Import the mock data in your component:
   ```jsx
   import { mockDestinations, mockItinerary, mockTransportationOptions } from '../utils/mockData';
   ```

2. Use the mock data instead of API calls:
   ```jsx
   const [destinations, setDestinations] = useState(mockDestinations);
   const [itinerary, setItinerary] = useState(mockItinerary);
   const [transportationOptions, setTransportationOptions] = useState(mockTransportationOptions);
   ```

## License

This project is licensed under the MIT License.
