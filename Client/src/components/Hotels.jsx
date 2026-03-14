// import React from 'react'

// function Hotels({trip}) {
//   return (
//     <div>
//       <h2 className='font-bold text-xl mt-5'>
//         Hotel Recommendations
//       </h2>

//       <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-2'>
//         {trip?.tripData?.hotels?.map((hotel, index) => (
//           <div key={index} className='hover:scale-105 transition-all cursor-pointer'>
//             <img src="/placeholder.png" className='rounded-xl' />
//             <div className='my-2 flx flex-col gap-2'>
//               <h2 className='font-medium'> {hotel.name}</h2>
//               <h2 className='text-sxs  text-gray-500'>📍 {hotel.address}</h2>
//               <h2 className='text-sm '> 💰{hotel.price}</h2>
//               <h2 className='text-sm '> ⭐{hotel.rating} Stars</h2>

//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   )
// }

// export default Hotels

import React, { useEffect, useState } from 'react'
import { getUnsplashImage } from '../services/UnsplashService'

function Hotels({ trip }) {

  const hotels = trip?.tripData?.hotels || []

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>
        Hotel Recommendations
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4'>

        {hotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}

      </div>
    </div>
  )
}

function HotelCard({ hotel }) {

  const [image, setImage] = useState('')

  useEffect(() => {

    let isMounted = true

    async function fetchImage() {
      const img = await getUnsplashImage(
        `${hotel.name} hotel resort building`
      )

      if (isMounted) {
        setImage(img)
      }
    }

    fetchImage()

    return () => {
      isMounted = false
    }

  }, [hotel.name])

  return (

    <div className='border rounded-xl p-2 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>

      <img
        src={image || '/placeholder.png'}
        alt={hotel.name}
        loading="lazy"
        className='rounded-xl h-40 w-full object-cover'
      />

      <div className='mt-2'>
        <h2 className='font-medium'>{hotel.name}</h2>
        <p className='text-sm text-gray-400'>{hotel.address}</p>
      </div>

    </div>

  )
}

export default Hotels
