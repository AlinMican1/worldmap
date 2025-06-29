import React from "react";
import { useState } from "react";
import { SuggestLocation } from "../../../helper/SuggestLocation";
import { GetLocationTime } from "../../../helper/GetLocationTime";

const InputLocation = () => {
  const [allLocations, setAllLocations] = useState<Array<string>>([]);
  const [location, setLocation] = useState<string>("");

  const AddLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation("");
  };

  return (
    <div>
      <form onSubmit={AddLocation}>
        <input
          placeholder="Enter A Location"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        <ul>
          {SuggestLocation(location).map((place, key) => {
            if (!allLocations.includes(place)) {
              return (
                <li key={key + 1}>
                  <button
                    onClick={() => {
                      setAllLocations((prev) => [...prev, place]);
                      setLocation("");
                    }}
                  >
                    {place}
                  </button>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>

        <button>Add Location</button>
      </form>

      <ul>
        {allLocations.map((place, key) => (
          <p key={key + 1}>{place}</p>
        ))}
      </ul>

      <button
        onClick={() => {
          GetLocationTime(allLocations);
          setAllLocations([]);
        }}
      >
        ADD LOCATION{" "}
      </button>
    </div>
  );
};

export default InputLocation;
