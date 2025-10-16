import { useDropdown } from "@/hooks/useDropdown";
import CalendarBox from "./calendarBox";
import "./selectDate.css";
import { useMemo, useState } from "react";
import { DateAndTimeContext } from "@/contexts";
import ChooseTime from "./chooseTime";
import DateAndTimeDisplay from "./dateAndTimeDisplay";
import useArray from "@/hooks/useArray";

interface SelectDateProps {
  label?: string;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
}

const SelectDate = ({ label, selectedDate, setSelectedDate, width = "25vw" }: SelectDateProps) => {
  const { open, toggle, ref } = useDropdown();
  const dateArray = useArray<string>([]);
  const [time, setTime] = useState<string>("");
  const [dateAndTimeMap, setDateAndTimeMap] = useState<Map<string, string[]>>(new Map());
  const [selectedTimezone, setSelectedTimezone] = useState("");
  // Use for context
  const dateAndTime = useMemo(
    () => ({
      dateArray,
      time,
      setTime,
      dateAndTimeMap,
      setDateAndTimeMap,
    }),
    [dateArray, time, dateAndTimeMap]
  );

  //Memoization

  const CalendarBoxMemo = useMemo(() => <CalendarBox />, [dateArray.array]);

  return (
    <div className="selectDate-wrapper">
      {label && <label>{label}</label>}

      <div className="select-wrapper" ref={ref}>
        <button
          className="button-dropdown-wrapper"
          style={{
            width,
            border: open ? "1px solid var(--color-primary-lighter)" : "0px solid transparent",
          }}
          type="button"
          onClick={toggle}
        ></button>
        {open && (
          <div className="selectDate-dropDown-wrapper">
            <DateAndTimeContext.Provider value={dateAndTime}>
              <div className="elements-row">
                {CalendarBoxMemo}
                <ChooseTime />
              </div>
              <DateAndTimeDisplay />
            </DateAndTimeContext.Provider>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectDate;
