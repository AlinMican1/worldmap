import React from "react";
import { useState } from "react";
import { SuggestLocation } from "../../../helper/SuggestLocation";
import { GetLocationTime } from "../../../helper/GetLocationTime";
const InputLocation = () => {
  const [inputValue] = useState<Array<string>>([]);
  const [location, setLocation] = useState<string>("");

  const SubmitLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation("");
  };

  return (
    <div>
      <form onSubmit={SubmitLocation}>
        <input
          placeholder="Enter A Location"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          
        />
        <ul>
          {SuggestLocation(location).map((place, key) => (
            <button key={key + 1} onClick={() => inputValue.push(place)}>{place}</button>
          ))}
        </ul>

        <button>Add Location</button>
      </form>
          
      <ul>
         {inputValue.map((place, key) => (
           <p key={key + 1}>{place}</p>
         ))}
       </ul>

       <button onClick={() => GetLocationTime(["France", "Romania"])}>ADD LOCATION </button>
    </div>
  );
};

export default InputLocation;
