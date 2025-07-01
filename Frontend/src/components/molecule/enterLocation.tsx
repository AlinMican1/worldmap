"use client";
import { SuggestLocation } from "../../../helper/SuggestLocation";
import { InputField } from "../atoms/inputField";
import "./enterLocation.css";

interface EnterLocationProps {
  location: string;
  setLocation: (value: string) => void;
}

const EnterLocation = ({location,setLocation}:EnterLocationProps) => {
  return (
    <div>
      <InputField
        placeholder="Location"
        type="text"
        label="Choose Location"
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
