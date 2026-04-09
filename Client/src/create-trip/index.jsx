import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/Options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { runGemini } from '../services/AImodel';
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';

import { doc, setDoc } from "firebase/firestore";
import { db } from '../services/FirebaseConfig';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router';

let timer

function CreateTrip() {

  const [place, setPlace] = useState('');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate()

  // =========================
  // Handle input change
  // =========================

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })

  }

  useEffect(() => {

    console.log("Form Data:", formData)

  }, [formData])



  // =========================
  // Save Trip to Firestore
  // =========================

  const SaveAiTrip = async (TripData) => {

    try {

      console.log("Saving trip to Firestore...", TripData)

      const user = JSON.parse(localStorage.getItem('user'))

      const docId = Date.now().toString()

      await setDoc(doc(db, "AiTrips", docId), {

        userSelection: formData,
        tripData: TripData,
        userEmail: user?.email,
        id: docId

      })

      console.log("Trip saved successfully!")

      toast("Trip saved successfully!")

      navigate('/view-trip/' + docId)

    } catch (error) {

      console.error("Firestore save error:", error)
      toast("Failed to save trip")

    } finally {

      setLoading(false)

    }

  }



  // =========================
  // Get Google User Profile
  // =========================

  const GetUserProfile = async (tokenInfo) => {

    try {

      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )

      console.log("User Profile:", resp.data)

      localStorage.setItem("user", JSON.stringify(resp.data))

      setOpenDialog(false)

      toast("Login successful!")

      setTimeout(() => {
        onGenerateTrip()
      }, 200)

    } catch (error) {

      console.error("Error fetching user profile:", error)

    }

  }



  // =========================
  // Google Login Hook
  // =========================

  const login = useGoogleLogin({

    onSuccess: (tokenResponse) => {

      console.log("Token Response:", tokenResponse)

      GetUserProfile(tokenResponse)

    },

    onError: (error) => console.log("Login Failed:", error)

  })



  // =========================
  // Generate Trip
  // =========================

  const onGenerateTrip = async () => {

    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {

      setOpenDialog(true)
      return

    }

    if (formData?.noOfDays > 10 || !formData?.location || !formData?.budget || !formData?.traveler) {

      toast("Please enter details properly")
      return

    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.display_name || formData?.location?.name)
      .replaceAll('{days}', formData?.noOfDays)
      .replace('{budget}', formData?.budget)
      .replace('{travelers}', formData?.traveler)

    console.log("Prompt:", FINAL_PROMPT)

    try {

      setLoading(true)

      const result = await runGemini(FINAL_PROMPT)

      if (!result) {

        toast("AI service unavailable. Please try again.")
        setLoading(false)
        return

      }

      let tripData

      try {

        tripData = JSON.parse(result)

      } catch (err) {

        console.error("JSON parse failed:", err)
        console.log("Raw Gemini output:", result)

        toast("AI returned invalid JSON")
        setLoading(false)

        return

      }

      console.log("Parsed Trip Data:", tripData)

      await SaveAiTrip(tripData)

    } catch (error) {

      console.error("Error generating trip:", error)
      toast("AI failed to generate trip")
      setLoading(false)

    }

  }



  return (

    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>

      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️</h2>

      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary.
      </p>



      <div className='mt-20 flex flex-col gap-10'>

        {/* Destination */}

        <div>

          <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>

          <div className="relative">

            <Input
              value={place}
              onChange={(e) => {

                const v = e.target.value
                setPlace(v)

                clearTimeout(timer)

                timer = setTimeout(async () => {

                  const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${v}&format=json&limit=5`)
                  const data = await res.json()

                  setSuggestions(data)

                }, 500)

              }}
            />

            {suggestions?.length > 0 && (

              <ul className="absolute bg-white border w-full mt-1 rounded-lg shadow-md z-10">

                {suggestions.map((item) => (

                  <li
                    key={item.place_id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {

                      setPlace(item.display_name)
                      handleInputChange('location', item)
                      setSuggestions([])

                    }}
                  >

                    {item.display_name}

                  </li>

                ))}

              </ul>

            )}

          </div>

        </div>



        {/* Trip Duration */}

        <div>

          <h2 className='text-xl my-3 font-medium'>Trip duration (days)?</h2>

          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />

        </div>

      </div>



      {/* Budget */}

      <div>

        <h2 className='text-xl my-3 font-medium'>Your Budget</h2>

        <div className='grid grid-cols-3 gap-5 mt-5'>

          {SelectBudgetOptions.map((item, index) => (

            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${formData?.budget == item.title && 'border-black shadow-lg'}`}
            >

              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>

            </div>

          ))}

        </div>

      </div>



      {/* Travelers */}

      <div>

        <h2 className='text-xl my-3 font-medium'>Who are you travelling with?</h2>

        <div className='grid grid-cols-3 gap-5 mt-5'>

          {SelectTravelesList.map((item, index) => (

            <div
              key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${formData?.traveler == item.people && 'border-black shadow-lg'}`}
            >

              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>

            </div>

          ))}

        </div>

      </div>



      {/* Generate Button */}

      <div className="my-10 justify-end flex">

        <Button disabled={loading} onClick={onGenerateTrip}>

          {loading
            ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
            : "Generate Trip"
          }

        </Button>

      </div>



      {/* Login Dialog */}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>

        <DialogContent>

          <DialogHeader>

            <img src="/logo.svg" className="w-12 mb-4" />

            <DialogTitle>Sign in with Google</DialogTitle>

            <DialogDescription>
              Sign in to continue and generate your AI trip
            </DialogDescription>

            <Button
              onClick={login}
              className="w-full mt-5 flex gap-4 items-center justify-center"
            >

              <FcGoogle className='h-7 w-7' />
              Sign In With Google

            </Button>

          </DialogHeader>

        </DialogContent>

      </Dialog>

    </div>

  )

}

export default CreateTrip