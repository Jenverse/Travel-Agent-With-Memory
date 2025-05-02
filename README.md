# Travel Agent LLM Application with Memory

An enhanced conversational AI travel assistant that helps users plan their trips by recommending destinations, generating itineraries, and suggesting transportation options. This version includes a memory system that remembers user preferences and past interactions for a more personalized experience.

## Features

- **Destination Recommendations**: Get personalized destination suggestions based on your preferences (beaches, cities, mountains, etc.)
- **Customized Itineraries**: Receive detailed day-by-day itineraries for your selected destinations
- **Transportation Options**: Get suggestions for the best ways to travel to and around your destination
- **Conversational Interface**: Interact with the travel agent through a natural chat interface
- **Memory System**: Remembers your past interactions, preferences, and travel history to provide more personalized recommendations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Jenverse/Travel-Agent-With-Memory.git
   cd Travel-Agent-With-Memory
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
6. The agent will remember your preferences and past interactions for future conversations

## Example Prompts

- "I'm looking for a beach destination for my honeymoon"
- "Can you recommend mountain destinations in Europe?"
- "I want to visit Japan for 7 days. What should my itinerary look like?"
- "What's the best way to get around in Bali?"
- "I'm traveling with kids and want a family-friendly destination"
- "Remember that I prefer luxury accommodations"
- "What was that beach destination you recommended to me earlier?"

## Development

### Project Structure

- `src/components/`: React components for the UI
- `src/services/`: Services for API communication
- `src/styles/`: CSS files for styling
- `src/utils/`: Utility functions and mock data
- `src/memory/`: Memory system implementation

## License

This project is licensed under the MIT License.
