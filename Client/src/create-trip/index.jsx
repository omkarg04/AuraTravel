import React, { use, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/Options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'; 

let timer

function CreateTrip() {
  const [place, setPlace] = useState('');
  const [formData , setFormData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (name,value)=>{
    

  setFormData({
    ...formData,
    [name]:value
  })
}
  useEffect(()=>{
    console.log(formData);
  },[formData]) 

  const onGenerateTrip=async()=>{
    if(formData?.noOfDays>5||!formData?.location||!formData?.budget||!formData?.traveler  ){
      toast("Please enter details properly.")
      return ;
    }
    // console.log(formData);
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}',formData?.location?.name)
    .replaceAll('{days}',formData?.noOfDays)
    .replace('{budget}',formData?.budget)
    .replace('{travelers}',formData?.traveler)
    console.log(FINAL_PROMPT);

    // const  result = await 
  }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl '>Tell us your travel preferences 🏕️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information , and our trip planner will generate a customized itinerary based on your preferences</p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination ?</h2>
          <div className="relative">
  <Input
    value={place}
    onChange={(e)=>{
      const v=e.target.value
      setPlace(v)

      clearTimeout(timer)

      timer=setTimeout(async ()=>{
        const res=await fetch(`https://nominatim.openstreetmap.org/search?q=${v}&format=json&limit=5`)
        const data=await res.json()
        setSuggestions(data)
      },500)
    }}
  />

  {suggestions && suggestions.length>0 && (
    <ul className="absolute bg-white border w-full mt-1 rounded-lg shadow-md z-10">
      {suggestions.map((item)=>(
        <li
          key={item.place_id}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={()=>{
            setPlace(item.display_name)
            handleInputChange('location',item)
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
        <div>
          <h2 className='text-xl my-3 font-medium'>Your Trip duration (in days)?</h2>
          <Input placeholder={'Ex.3'} type="number"
          onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
          />

        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} 
              onClick={()=>handleInputChange('budget',item.title)}
             className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${formData?.budget==item.title&&'border-black shadow-lg'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>

            </div>

          ))}
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>Who are you travelling with?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item,index)=>(
            <div key={index} 
            onClick={()=>handleInputChange('traveler',item.people)}
            className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${formData?.traveler==item.people&&'border-black shadow-lg'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>

            </div>

          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex ">
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>

    </div>
  )
}

export default CreateTrip