export const SelectTravelesList = [
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1 Person'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill seekers',
        icon:'🫂',
        people:'5 to 10 People'
    }
]


export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'🖼️',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Don\'t worry about the cost',
        icon:'💸    '
    }
]

export const AI_PROMPT='Generate a travel plan for {location} for {travelers} traveling for {days} days on a {budget} budget. Provide a list of hotel options including hotel name, hotel address, price, hotel image URL, geo coordinates, rating, and description. Also suggest a {days}-day itinerary including place name, place details, place image URL, geo coordinates, ticket pricing, rating, travel time between locations, and the best time to visit. Organize the itinerary day-wise. Return the entire response in JSON format.';