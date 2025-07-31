"use client";
import { memo } from "react";
import { SuggestLocation } from "../../../helper/SuggestLocation";
import { InputField } from "../atoms/inputField";
import "./enterLocation.css";

interface EnterLocationProps {
  location: string;
  setLocation: (value: string) => void;
  error: boolean;
  errorMsg: string;
  width?: string;
}

const EnterLocation = ({ location, setLocation, error, errorMsg, width }: EnterLocationProps) => {
  return (
    <div>
      <InputField
        width={width}
        placeholder="Location"
        type="text"
        label="Choose Location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        error={error}
        errorMsg={errorMsg}
      />
      {location.trim() !== "" && (
        <ul className={`dropDownContainer`}>
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
      )}
    </div>
  );
};
export default memo(EnterLocation);
