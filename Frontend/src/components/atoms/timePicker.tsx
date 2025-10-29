import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./timePicker.css";

const DEFAULT_HOUR = "12";
const DEFAULT_MINUTE = "30";

interface TimePickerParams {
  label?: string;
  name?: string;
  id?: string;

  setSelectedTime: React.Dispatch<React.SetStateAction<string | number>>;
  selectedTime: string | number;
  width?: string;
}
const TimePicker = ({
  label,
  name,
  id,
  setSelectedTime,
  selectedTime,
  width,
}: TimePickerParams) => {
  const [hour, setHour] = useState<string>(DEFAULT_HOUR);
  const [minute, setMinute] = useState<string>(DEFAULT_MINUTE);
  const minuteRef = useRef<HTMLInputElement>(null);

  const handleFocus = (setter: React.Dispatch<React.SetStateAction<string>>) => () => {
    setter(""); // clear when focused
  };

  // ---- HOUR HANDLER ----
  const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value) {
      setHour("");
      return;
    }

    // Single digit > 2 → pad automatically (3 → 03)
    if (value.length === 1 && Number(value) > 2) {
      value = value.padStart(2, "0");
      setHour(value);
      minuteRef.current?.focus();
      return;
    }

    if (value.length > 2) value = value.slice(0, 2);
    if (Number(value) > 23) value = "23";

    setHour(value);

    if (value.length === 2) minuteRef.current?.focus();
  };

  // ---- MINUTE HANDLER ----
  const handleMinuteChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value) {
      setMinute("");
      return;
    }

    if (value.length > 2) value = value.slice(0, 2);
    if (Number(value) > 59) value = "59";

    // Pad automatically if user enters >5 for first digit
    if (value.length === 1 && Number(value) > 5) {
      value = value.padStart(2, "0");
    }

    setMinute(value);
  };

  // ---- BLUR HANDLER ----
  const handleBlur = (type: "hour" | "minute") => {
    if (type === "hour") {
      if (hour === "") setHour(DEFAULT_HOUR);
    } else {
      if (minute === "") setMinute(DEFAULT_MINUTE);
    }
  };

  // ---- PREVENT ENTER SUBMISSION ----
  const preventEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    setSelectedTime(String(hour) + ":" + String(minute));
  }, [hour, minute]);

  return (
    <div>
      <label>{label}</label>
      <div className="hourMinute-wrapper">
        <input
          className="inputBox"
          value={hour}
          onChange={handleHourChange}
          onFocus={handleFocus(setHour)}
          onBlur={() => handleBlur("hour")}
          onKeyDown={preventEnter}
          type="text"
          maxLength={2}
        />
        <span className="semicolon-font">:</span>
        <input
          ref={minuteRef}
          className="inputBox"
          value={minute}
          onChange={handleMinuteChange}
          onFocus={handleFocus(setMinute)}
          onBlur={() => handleBlur("minute")}
          onKeyDown={preventEnter}
          type="text"
          maxLength={2}
        />
      </div>
    </div>
  );
};

export default TimePicker;
