// Mock data for testing the UI components without making API calls

export const mockDestinations = [
  {
    name: "Bali, Indonesia",
    type: "Beach",
    description: "A tropical paradise known for its beautiful beaches, lush rice terraces, and vibrant culture.",
    highlights: [
      "Stunning beaches like Kuta and Nusa Dua",
      "Sacred temples such as Uluwatu and Tanah Lot",
      "Ubud's cultural center and monkey forest",
      "Terraced rice fields in Tegallalang"
    ]
  },
  {
    name: "Kyoto, Japan",
    type: "Cultural",
    description: "Japan's former capital offers a perfect blend of traditional culture, beautiful temples, and serene gardens.",
    highlights: [
      "Fushimi Inari Shrine with thousands of torii gates",
      "Historic Gion district with geisha sightings",
      "Arashiyama Bamboo Grove",
      "Kinkaku-ji (Golden Pavilion)"
    ]
  },
  {
    name: "Swiss Alps",
    type: "Mountain",
    description: "Breathtaking mountain scenery with world-class skiing, hiking, and charming alpine villages.",
    highlights: [
      "Iconic Matterhorn peak",
      "Scenic train journeys like the Glacier Express",
      "Charming villages such as Zermatt and Grindelwald",
      "Year-round outdoor activities"
    ]
  }
];

export const mockItinerary = {
  destination: "Bali, Indonesia",
  travelDates: "June 15-22, 2023",
  days: [
    {
      day: 1,
      activities: [
        {
          time: "Morning",
          name: "Arrival and Check-in",
          description: "Arrive at Ngurah Rai International Airport, transfer to your hotel in Seminyak, and settle in."
        },
        {
          time: "Afternoon",
          name: "Seminyak Beach Exploration",
          description: "Relax at Seminyak Beach, enjoy the sunset, and have dinner at a beachfront restaurant."
        },
        {
          time: "Evening",
          name: "Spa Treatment",
          description: "Enjoy a traditional Balinese massage to recover from your journey."
        }
      ]
    },
    {
      day: 2,
      activities: [
        {
          time: "Morning",
          name: "Uluwatu Temple Visit",
          description: "Visit the clifftop Uluwatu Temple and watch the famous Kecak fire dance performance."
        },
        {
          time: "Afternoon",
          name: "Beach Club Experience",
          description: "Spend the afternoon at Potato Head or Ku De Ta beach club."
        },
        {
          time: "Evening",
          name: "Seafood Dinner at Jimbaran Bay",
          description: "Enjoy fresh seafood on the beach as the sun sets."
        }
      ]
    },
    {
      day: 3,
      activities: [
        {
          time: "Morning",
          name: "Ubud Transfer",
          description: "Travel to Ubud, stopping at the Tegallalang Rice Terraces on the way."
        },
        {
          time: "Afternoon",
          name: "Sacred Monkey Forest",
          description: "Explore the Sacred Monkey Forest Sanctuary and meet the resident macaques."
        },
        {
          time: "Evening",
          name: "Traditional Dance Performance",
          description: "Watch a traditional Balinese dance performance in Ubud center."
        }
      ]
    }
  ]
};

export const mockTransportationOptions = [
  {
    type: "Flight",
    duration: "14-16 hours (with connections)",
    cost: "$800-1,200 round trip",
    description: "Flying is the fastest way to reach Bali from most international locations. Ngurah Rai International Airport (DPS) in Denpasar is the main gateway.",
    recommended: true,
    notes: "Consider booking flights 3-4 months in advance for the best rates."
  },
  {
    type: "Local Transportation",
    duration: "Varies",
    cost: "$5-20 per day",
    description: "Once in Bali, options include renting a scooter, hiring a private driver, or using ride-hailing apps like Grab.",
    recommended: false,
    notes: "Renting a scooter is economical but requires experience with local traffic conditions."
  },
  {
    type: "Airport Transfer",
    duration: "30-90 minutes",
    cost: "$15-30",
    description: "Pre-arranged airport transfers to your accommodation are convenient and stress-free.",
    recommended: true,
    notes: "Many hotels offer complimentary airport pickup services."
  }
];
