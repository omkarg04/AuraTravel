// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';


  const ai = new GoogleGenAI({
    apiKey: import.meta.env['VITE_GEMINI_API_KEY'],
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingLevel: ThinkingLevel.HIGH,
    },
    tools,
  };
  const model = 'gemini-3.1-pro-preview';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate a travel plan for Las Vegas for a couple traveling for 3 days on a low budget.  Provide a list of hotel options including: - Hotel name - Hotel address - Price - Hotel image URL - Geo coordinates - Rating - Description  Also suggest a 3-day itinerary including: - Place name - Place details - Place image URL - Geo coordinates - Ticket pricing - Rating - Travel time between locations - Best time to visit  The itinerary should be organized day-wise for all 3 days.  Return the entire response in JSON format.`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Defining the Task**

I'm currently focused on defining the parameters of this travel plan request. The key is understanding that the entire output must be in JSON. Specifically, I need to include hotel options in Las Vegas for a couple's three-day trip. Details will include the name, address, price, image URL, geo-coordinates, rating, and description of the hotel.


**Structuring the Itinerary**

I've moved on to structuring the 3-day itinerary, breaking it down day by day. I'm focusing on incorporating key details for each place, like its name, specifics about the place, image URLs, geo-coordinates, potential ticket prices, ratings, travel times, and the best times to visit those locations. I'm aiming to craft a compelling experience within a low budget.


**Detailing the Activities**

I'm now detailing each day's activities. For day one, I'm noting the free attractions, including the Bellagio Conservatory and Fountains, and the LINQ Promenade. Day two focuses on the Neon Museum and the Fremont Street Experience. I've also identified coordinates, best times, and ratings for each location, always prioritizing low-cost options.


**Finalizing the Itinerary**

I'm finalizing day three of the itinerary, focusing on the Welcome to Fabulous Las Vegas Sign, Seven Magic Mountains (noting the travel requirement), and the New York-New York/Hershey's Chocolate World. I've included coordinates, best times, and ratings for each location, maintaining a balance between free and accessible experiences. I'll need to figure out what to include if Seven Magic Mountains isn't viable.


**Defining Place Attributes**

I'm now detailing the structure for the itinerary's \`places\`. Each place will have essential attributes. Specifically, the schema will include: \`place_name\`, \`place_details\`, a \`place_image_url\`, \`geo_coordinates\` (latitude/longitude), \`ticket_pricing\`, \`rating\`, \`travel_time_from_previous\`, and \`best_time_to_visit\`. I'm confirming this structure's completeness and clarity before moving on. I'm making sure to define how this fits into the overall itinerary.


**Formulating Image URLs**

I'm now formulating realistic image URLs for the JSON schema. I've considered placeholder options like \`https://via.placeholder.com/400x300\` but I've realized that using descriptive placeholders such as \`https://images.unsplash.com/photo-xxxx\` or similar is a better approach for the schema. I will prioritize \`https://images.unsplash.com/photo-xxxx\` as realistic, informative placeholders.



**Incorporating Coordinates**

I'm now integrating coordinate data for the itinerary's activities for days two and three. I've added the coordinates, ratings, suggested times, and travel times for each place. I am making sure to add a couple of new locations, The Venetian Grand Canal Shoppes and The LINQ Promenade for days 2 and 3, respectively.


**Validating JSON Structure**

I'm now drafting the JSON structure itself, ensuring the syntax is valid. I'm focusing on escaping quotes, placing commas correctly, and verifying that all the necessary data structures are present and accounted for. This is to ensure that the final output is in valid, well-formed JSON, suitable for immediate use.`,
        },
        {
          text: `


{
  "travel_plan": {
    "destination": "Las Vegas",
    "target_audience": "Couple",
    "budget": "Low",
    "duration": "3 Days",
    "hotel_options":[
      {
        "hotel_name": "Flamingo Las Vegas Hotel & Casino",
        "hotel_address": "3555 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$40 - $70 per night (plus resort fees)",
        "hotel_image_url": "https://example.com/images/flamingo-vegas.jpg",
        "geo_coordinates": {
          "latitude": 36.1155,
          "longitude": -115.1708
        },
        "rating": 4.0,
        "description": "Located in the heart of the Center Strip, this classic Las Vegas hotel offers a vibrant tropical theme, an amazing 15-acre pool area, and a complimentary wildlife habitat featuring real Chilean flamingos. It is highly walkable and perfect for couples on a budget."
      },
      {
        "hotel_name": "Excalibur Hotel & Casino",
        "hotel_address": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$30 - $50 per night (plus resort fees)",
        "hotel_image_url": "https://example.com/images/excalibur-vegas.jpg",
        "geo_coordinates": {
          "latitude": 36.0988,
          "longitude": -115.1754
        },
        "rating": 3.8,
        "description": "A fun, castle-themed resort situated on the South Strip. It offers very affordable room rates, a large casino, and easy access via walkways to neighboring resorts like Luxor and New York-New York."
      },
      {
        "hotel_name": "Luxor Hotel & Casino",
        "hotel_address": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
        "price": "$35 - $60 per night (plus resort fees)",
        "hotel_image_url": "https://example.com/images/luxor-vegas.jpg",
        "geo_coordinates": {
          "latitude": 36.0955,
          "longitude": -115.1761
        },
        "rating": 3.9,
        "description": "Housed in an iconic 30-story pyramid, this Egyptian-themed hotel is known for the striking beam of light shooting up into the night sky. It provides excellent budget value with plenty of entertainment options for couples."
      }
    ],
    "itinerary":[
      {
        "day": 1,
        "theme": "Iconic Sights & Strip Romance",
        "places":[
          {
            "place_name": "Welcome to Fabulous Las Vegas Sign",
            "place_details": "The iconic neon sign welcoming visitors to the city. A perfect, classic photo opportunity for couples to commemorate the trip.",
            "place_image_url": "https://example.com/images/vegas-sign.jpg",
            "geo_coordinates": {
              "latitude": 36.0820,
              "longitude": -115.1727
            },
            "ticket_pricing": "Free",
            "rating": 4.6,
            "travel_time_between_locations": "0 minutes (Start of day)",
            "best_time_to_visit": "8:00 AM (to avoid long photo lines)"
          },
          {
            "place_name": "Bellagio Conservatory & Botanical Gardens",
            "place_details": "A spectacular, massive indoor garden with intricate floral displays that change with the seasons. A highly romantic and budget-friendly stroll.",
            "place_image_url": "https://example.com/images/bellagio-gardens.jpg",
            "geo_coordinates": {
              "latitude": 36.1126,
              "longitude": -115.1767
            },
            "ticket_pricing": "Free",
            "rating": 4.8,
            "travel_time_between_locations": "10-minute drive or bus ride from the Vegas Sign",
            "best_time_to_visit": "10:30 AM"
          },
          {
            "place_name": "Fountains of Bellagio",
            "place_details": "A breathtaking water, music, and light show orchestrated in the massive lake in front of the Bellagio. Shows run every 15-30 minutes.",
            "place_image_url": "https://example.com/images/bellagio-fountains.jpg",
            "geo_coordinates": {
              "latitude": 36.1126,
              "longitude": -115.1738
            },
            "ticket_pricing": "Free",
            "rating": 4.9,
            "travel_time_between_locations": "5-minute walk from the Conservatory",
            "best_time_to_visit": "7:00 PM (enjoy the illuminated evening shows)"
          }
        ]
      },
      {
        "day": 2,
        "theme": "Old Vegas Charm & Arts District",
        "places":[
          {
            "place_name": "The LINQ Promenade & Flamingo Wildlife Habitat",
            "place_details": "An open-air shopping, dining, and entertainment district. Stop by the neighboring Flamingo hotel to see real flamingos, koi fish, and turtles for free.",
            "place_image_url": "https://example.com/images/linq-promenade.jpg",
            "geo_coordinates": {
              "latitude": 36.1176,
              "longitude": -115.1709
            },
            "ticket_pricing": "Free (costs apply only if riding the High Roller)",
            "rating": 4.5,
            "travel_time_between_locations": "0 minutes (Start of day)",
            "best_time_to_visit": "11:00 AM"
          },
          {
            "place_name": "The Neon Museum (Boneyard)",
            "place_details": "An outdoor exhibition space featuring rescued architectural landmarks and vintage Las Vegas neon signs. Great for taking unique couples' photos.",
            "place_image_url": "https://example.com/images/neon-museum.jpg",
            "geo_coordinates": {
              "latitude": 36.1770,
              "longitude": -115.1354
            },
            "ticket_pricing": "$20 - $25 per person",
            "rating": 4.6,
            "travel_time_between_locations": "15-minute drive from the Strip",
            "best_time_to_visit": "4:00 PM (Golden hour for photography)"
          },
          {
            "place_name": "Fremont Street Experience",
            "place_details": "A massive pedestrian mall in Downtown Las Vegas covered by a giant digital canopy showing spectacular visual shows, alongside free live music and street performers.",
            "place_image_url": "https://example.com/images/fremont-street.jpg",
            "geo_coordinates": {
              "latitude": 36.1699,
              "longitude": -115.1440
            },
            "ticket_pricing": "Free",
            "rating": 4.5,
            "travel_time_between_locations": "5-minute drive or 20-minute walk from the Neon Museum",
            "best_time_to_visit": "8:00 PM"
          }
        ]
      },
      {
        "day": 3,
        "theme": "Desert Art & Global Architecture",
        "places":[
          {
            "place_name": "Seven Magic Mountains",
            "place_details": "A large-scale desert art installation featuring seven towering, brightly colored stacked boulders. A short drive out of the city, but very much worth it.",
            "place_image_url": "https://example.com/images/seven-magic-mountains.jpg",
            "geo_coordinates": {
              "latitude": 35.8383,
              "longitude": -115.2710
            },
            "ticket_pricing": "Free",
            "rating": 4.5,
            "travel_time_between_locations": "30-minute drive from the Strip (Start of day)",
            "best_time_to_visit": "9:00 AM (to beat the desert heat and crowds)"
          },
          {
            "place_name": "New York-New York & The Park",
            "place_details": "Wander through the incredibly detailed replica streets of New York, visit Hershey's Chocolate World, and walk through the adjacent outdoor dining area known as The Park.",
            "place_image_url": "https://example.com/images/nyny-vegas.jpg",
            "geo_coordinates": {
              "latitude": 36.1024,
              "longitude": -115.1746
            },
            "ticket_pricing": "Free entry",
            "rating": 4.5,
            "travel_time_between_locations": "30-minute drive back from Seven Magic Mountains",
            "best_time_to_visit": "1:00 PM"
          },
          {
            "place_name": "The Venetian Grand Canal Shoppes",
            "place_details": "Indoor mall completely styled like Venice, complete with a canal and singing gondoliers. Window shopping and exploring the detailed architecture is completely free.",
            "place_image_url": "https://example.com/images/venetian-canals.jpg",
            "geo_coordinates": {
              "latitude": 36.1215,
              "longitude": -115.1685
            },
            "ticket_pricing": "Free entry (Gondola rides are extra)",
            "rating": 4.7,
            "travel_time_between_locations": "10-minute drive or 30-minute walk up the Strip",
            "best_time_to_visit": "5:00 PM"
          }
        ]
      }
    ]
  }
}`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

   const response =  ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
  }


// main();


