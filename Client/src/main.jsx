
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import CreateTrip from './create-trip/index.jsx'
import ViewTrip from './viewTrip/tripId/index.jsx'

import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google'
import MyTrips from './my-trips/index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <App />
      </>
    )
  },
  {
    path: "/create-trip",
    element: (
      <>
        <Header />
        <CreateTrip />
      </>
    )
  },
  {
    path: "/view-trip/:tripId",
    element: (
      <>
        <Header />
        <ViewTrip />
      </>
    )
  },
  {
    path: "/my-trips",
    element: (
      <>
        <Header />
        <MyTrips />
      </>
    )
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
      <Toaster />
    </GoogleOAuthProvider>
  </StrictMode>
)
