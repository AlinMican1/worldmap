"use client";
import { useState } from "react";
import { SuggestLocation } from "../../../helper/SuggestLocation";
import "./enterLocation.css";

const EnterLocation = () => {
  const [location, setLocation] = useState<string>("");
  function AddLocation() {
    console.log("hi");
  }

  return (
    <div>
      <input
        placeholder="Location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      />
      <ul className="dropDownContainer">
        {SuggestLocation(location).map((country, key) => {
          // If country is selected dont show again

          if (location != country) {
            return (
              <div key={key}>
                <button className="dropDownButton" onClick={() => setLocation(country)}>
                  {country}
                </button>
              </div>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
};
export default EnterLocation;
