import { useDropdown } from "@/hooks/useDropdown";
import CalendarBox from "./calendarBox";
import "./selectDate.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { DateAndTimeContext, MeetingDateContext } from "@/contexts";
import ChooseTime from "./chooseTime";
import DateAndTimeDisplay from "./dateAndTimeDisplay";
import useArray from "@/hooks/useArray";
import { getTodayDate } from "../../../helper/Formatter";

interface SelectDateProps {
  label?: string;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
}

const SelectDate = ({ label, selectedDate, setSelectedDate, width = "25vw" }: SelectDateProps) => {
  const { open, toggle, ref } = useDropdown();
  // const dateArray = useArray<string>([]);
  // setSelectedDate(getTodayDate(false))

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(getTodayDate(false));
    }
  }, [selectedDate, setSelectedDate]);

  const CalendarBoxMemo = useMemo(
    () => (
      <CalendarBox
        onDateSelect={(date: string) => {
          setSelectedDate(date); // update form
          toggle(); // close dropdown
        }}
      />
    ),
    [setSelectedDate, toggle]
  );

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
        >
          {selectedDate}
        </button>
        {open && (
          <div className="selectDate-dropDown-wrapper">
            <MeetingDateContext.Provider
              value={{
                meetingDate: selectedDate,
                setMeetingDate: setSelectedDate,
              }}
            >
              {CalendarBoxMemo}
            </MeetingDateContext.Provider>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectDate;
