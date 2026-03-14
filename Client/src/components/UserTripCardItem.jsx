import React, { useEffect, useState } from "react";
import { getUnsplashImage } from '../services/UnsplashService'
import { Link} from "react-router";

function UserTripCardItem({ trip }) {


  
  const [image, setImage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchImage() {
      if (!trip?.userSelection?.location?.display_name) return;

      const locationName = trip.userSelection.location.display_name;

      const img = await getUnsplashImage(
        `${locationName} city landmark travel`
      );

      if (isMounted && img) {
        setImage(img);
      }
    }

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [trip]);

  return (

    <Link to={'/view-trip/'+trip?.id}>
    <div className="hover:scale-105 transition-all cursor-pointer">
      <img
        src={image || "/placeholder.png"}
        className="object-cover rounded-xl h-45 w-full"
        alt="trip"
      />

      <div className="mt-2">
        <h2 className="font-bold text-lg">
          {trip?.userSelection?.location?.name}
        </h2>

        <h2 className="text-sm text-gray-500">
          {trip?.userSelection?.noOfDays} Days trip with{" "}
          {trip?.userSelection?.budget} budget
        </h2>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCardItem;