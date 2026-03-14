import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/FirebaseConfig'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import InfoSection from '../../components/InfoSection'

function ViewTrip() {

  const [trip, setTrip] = useState(null)
  const { tripId } = useParams()

  useEffect(() => {
    if (tripId) {
      GetTripData()
    }
  }, [tripId])

  const GetTripData = async () => {

    try {

      const docRef = doc(db, "AiTrips", tripId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {

        console.log("Trip Data:", docSnap.data())
        setTrip(docSnap.data())

      } else {

        console.log("No such document!")
        toast("No trip found!")

      }

    } catch (error) {

      console.error("Error fetching trip:", error)
      toast("Failed to load trip")

    }

  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 '>

      {/* Information section */}
      {trip && <InfoSection trip={trip} />}

      {/* Recommended hotels section */}

      {/* Daily plan */}

      {/* Footer */}

    </div>
  )
}

export default ViewTrip