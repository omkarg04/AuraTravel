import React, { useState } from "react";

function LocationAutocomplete() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  const searchPlaces = async (value) => {
    setQuery(value);

    if (value.length < 3) {
      setPlaces([]);
      return;
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1&limit=5`
    );

    const data = await response.json();
    setPlaces(data);
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setPlaces([]);

    console.log({
      name: place.display_name
    });
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => searchPlaces(e.target.value)}
        placeholder="Enter destination"
        className="border p-3 rounded-lg w-full"
      />

      {places.length > 0 && (
        <ul className="absolute bg-white border w-full mt-1 rounded-lg shadow-lg z-10">
          {places.map((place) => (
            <li
              key={place.place_id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationAutocomplete;