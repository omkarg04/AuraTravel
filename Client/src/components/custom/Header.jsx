import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button.jsx';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useNavigate } from 'react-router-dom';
import {  useGoogleLogin,googleLogout } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'sonner';
import axios from "axios";



function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
    const [openDialog, setOpenDialog] = useState(false);
  

  const navigation = useNavigate();
  useEffect(() => {
    console.log(user);
  })
  const login = useGoogleLogin({

    onSuccess: (tokenResponse) => {

      console.log("Token Response:", tokenResponse)

      GetUserProfile(tokenResponse)

    },

    onError: (error) => console.log("Login Failed:", error)

  })
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
        window.location.reload();
      }, 200)

    } catch (error) {

      console.error("Error fetching user profile:", error)

    }

  }


  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="/logo.svg" alt="" />
      <div>
        {user ? <div className='flex items-center gap-3'>
          <a href="/create-trip">
          <Button variant='outline' className='rounded-full '> + Create Trip</Button>
          </a>
          <a href="/my-trips">
          <Button variant='outline' className='rounded-full '>  My Trips</Button>
          </a>
          <Popover>
            <PopoverTrigger asChild>
              <img src={user?.picture} className='h-7  w-9 rounded-full' />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle><h2 className='curson-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2></PopoverTitle>
                {/* <PopoverDescription>Logout of AuraTravel</PopoverDescription> */}
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </div> : <Button onClick={()=>setOpenDialog(true)}>Sign In </Button>}
      </div>
        <Dialog open={openDialog}>
      
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

export default Header
