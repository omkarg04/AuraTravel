import React from 'react'

function InfoSection({trip}) {
  return (
    <div>
      <img
        src="/placeholder.png"
        className='h-85 w-full object-cover rounded-xl'
      />
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>
          {trip?.userSelection}
        </h2>
        <div>
          <h2></h2>
        </div>
      </div>
    </div>
  )
}

export default InfoSection