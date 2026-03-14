import React from 'react'
import PlaceCard from './PlaceCard';

function PlacestoVisit({ trip }) {

  const itinerary = trip?.tripData?.itinerary;

  return (
    <div className='my-2'>
      <h2 className='font-bold text-xl'>Places to visit</h2>

      <div>

        {itinerary && Object.entries(itinerary).map(([day, places], index) => (

          <div className='mt-5' key={index}>

            <h2 className='font-medium text-lg'>{day?.charAt(0).toUpperCase() + day?.slice(1).toLowerCase()}</h2>
            <div className='grid grid-cols-2 gap-5' >
            {places.map((place, i) => (
              <div className='' key={i}>
                <h2 className='font-medium text-sm text-orange-500'>{place.bestVisitTime}</h2>
                <PlaceCard place={place}/>
              </div>
            ))} 
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default PlacestoVisit