// import React from 'react'
// // import { FaMapLocationDot } from 'react-icons/fa6';
// // import { Button } from '@/components/ui/button';


// function PlaceCard({place}) {
//   return (
//     <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
//       <img src={`https://source.unsplash.com/600x400/?${place.placeName}`} className='w-33 h-33 rounded-xl'/>
//       <div>
//         <h3 className='font-bold text-lg'>{place.placeName}</h3>
//         <p className='text-sm text-gray-400'>{place.details}</p>
//         <h2 className='mt-2'>🕒{place.travelTime}</h2>
//         {/* <Button size="sm"><FaMapLocationDot/></Button> */}
//       </div>
//     </div>
//   )
// }

// export default PlaceCard



import React, { useEffect, useState } from 'react'
import { getUnsplashImage } from '../services/UnsplashService'

function PlaceCard({ place }) {

  const [image, setImage] = useState('')

  useEffect(() => {

    let isMounted = true

    async function fetchImage() {
      const img = await getUnsplashImage(
        `${place.placeName} tourist place landmark`
      )

      if (isMounted) {
        setImage(img)
      }
    }

    fetchImage()

    return () => {
      isMounted = false
    }

  }, [place.placeName])

  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md'>

      <img
        src={image || '/placeholder.png'}
        alt={place.placeName}
        loading="lazy"
        className='w-32 h-32 rounded-xl object-cover'
      />

      <div className='flex flex-col justify-between'>
        <h3 className='font-bold text-lg'>{place.placeName}</h3>

        <p className='text-sm text-gray-400 line-clamp-3'>
          {place.details}
        </p>

        <h2 className='mt-2 text-sm'>🕒 {place.travelTime}</h2>
      </div>

    </div>
  )
}

export default PlaceCard
