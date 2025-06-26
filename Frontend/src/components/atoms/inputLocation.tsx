import React from "react";
import { useState } from "react";
import { SuggestLocation } from "../../../helper/SuggestLocation";

const InputLocation = () => {
  const [inputValue] = useState<Array<string>>([]);
  const [location, setLocation] = useState<string>("");

  const SubmitLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputValue.push(location);
    setLocation("");
    console.log(location);
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
            // eslint-disable-next-line react/jsx-key
            <p key={key + 1}>{place}</p>
          ))}
        </ul>

        <button>Submit</button>
      </form>

      {/* <ul>
         {inputValue.map((place, key) => (
           <p key={key + 1}>{place}</p>
         ))}
       </ul> */}
    </div>
  );
};

export default InputLocation;
