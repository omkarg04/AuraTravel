// import React, { use, useEffect } from 'react'
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { useNavigate } from 'react-router-dom';
// import { db } from '../services/FirebaseConfig'; 
// import UserTripCardItem from '../components/UserTripCardItem';

// function MyTrips() {
//     const [userTrips,setUserTrips] = useState([]);
//     const navigation = useNavigate();


//     useEffect(() => {
//         GetUserTrips();
//     }, [])
//     const GetUserTrips = async () => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (!user) {
//             navigation('/');
//             return;
//         }
//         setUserTrips([]);
//         const q = query(collection(db, 'AiTrips'), where('userEmail', '==', user?.email));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             console.log(doc.id, " => ", doc.data());
//             setUserTrips(prevVal => [...prevVal, doc.data()])
//         });

//     }
//     return (
//         <div className='sm:px-10 md:px-32 mt-10 lg:px-56 xl:px-72 px-5 mt-10 '>
//             <h2 className='font-bold  text-3xl '>My Trips </h2>
//             <div className='grid grid-cols-2  md:grid-cols-3 gap-5'>
//                 {userTrips.map((trip, index) => (
//                     <UserTripCardItem  trip={trip} />
//                 )}
//             </div>
//         </div>
//     )
// }

// export default MyTrips


import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../services/FirebaseConfig";
import UserTripCardItem from "../components/UserTripCardItem";

function MyTrips() {
  const [userTrips, setUserTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AiTrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);

    const trips = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      trips.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setUserTrips(trips);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl mb-6">My Trips</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {userTrips.length > 0
          ? userTrips.map((trip) => (
              <UserTripCardItem key={trip.id} trip={trip} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[180px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;