// import React from 'react'
// import { Button } from '@/components/ui/button';
// import  {IoIosSend}  from 'react-icons/io'

// function InfoSection({ trip }) {
//   return (
//     <div>
//       <img
//         src="/placeholder.png"
//         className='h-85 w-full object-cover rounded-xl'
//       />

//       <div className='flex justify-between  items-center'>
//         <div className='my-5 flex flex-col gap-2'>
//           <h2 className='font-bold text-2xl'>
//             {trip?.userSelection.location.display_name}
//           </h2>
//           <div className='flex gap-5'>
//             <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500  text-xs md:text-md '>📅{trip.userSelection.noOfDays}</h2>
//             <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md '>💸{trip.userSelection.budget} Budget</h2>
//             <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md '>🥂Number of travelers: {trip.userSelection.traveler}</h2>

//           </div>
//         </div>
//         <Button>
//           <IoIosSend className='mr-2' />
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default InfoSection

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { IoIosSend } from 'react-icons/io'
import { getUnsplashImage } from '../services/UnsplashService'

function InfoSection({ trip }) {

  const [image, setImage] = useState('')

  useEffect(() => {

    let isMounted = true

    async function fetchImage() {

      if (!trip?.userSelection?.location?.display_name) return

      const locationName = trip.userSelection.location.display_name

      const img = await getUnsplashImage(
        `${locationName} city landmark travel`
      )

      if (isMounted && img) {
        setImage(img)
      }
    }

    fetchImage()

    return () => {
      isMounted = false
    }

  }, [trip])

  return (
    <div>

      <img
        src={image || "/placeholder.png"}
        className='h-85 w-full object-cover rounded-xl'
        alt={trip?.userSelection?.location?.display_name}
      />

      <div className='flex justify-between items-center'>

        <div className='my-5 flex flex-col gap-2'>

          <h2 className='font-bold text-2xl'>
            {trip?.userSelection?.location?.display_name}
          </h2>

          <div className='flex gap-5'>

            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>

            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              💸 {trip?.userSelection?.budget} Budget
            </h2>

            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              🥂 Travelers: {trip?.userSelection?.traveler}
            </h2>

          </div>

        </div>

        <Button>
          <IoIosSend className='mr-2' />
        </Button>

      </div>

    </div>
  )
}

export default InfoSection