import { useDateAndTimeContext } from "@/contexts";
import "./dateAndTime.css";
import { useEffect, useRef, useState } from "react";
import { getDayMonthYear, getISODate } from "../../../helper/Formatter";
import TrashIcon from "../icons/trash";
import Button from "../atoms/button";

const DateAndTimeDisplay = () => {
  const { dateAndTimeMap } = useDateAndTimeContext();
  const [openTime, setOpenTime] = useState<string>("");
  const closeRef = useRef<HTMLDivElement | null>(null);

  //Using button refs to keep track if the buttons are pressed or not. This avoids error where modal will keep
  //datesDisplay-container and closing when pressing the button.
  const buttonRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());
  // Refactoring needed! -> This function opens up the dates when we click the time. The counter basically keeps track if that
  // button has already been pressed. When pressing time twice it will close it.

  const handleOpen = (time: string) => {
    setOpenTime((prev) => (prev === time ? "" : time));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedNode = event.target as Node;

      const isInsideCloseRef = closeRef.current?.contains(clickedNode);
      const isInsideAnyButton = Array.from(buttonRefs.current.values()).some((ref) =>
        ref?.contains(clickedNode)
      );

      if (!isInsideCloseRef && !isInsideAnyButton) {
        setOpenTime("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openTime]);

  const handleRemoveDate = (date: string, time: string) => {
    const updatedDates = dateAndTimeMap.get(time)?.filter((d) => d !== date);
    if (updatedDates !== undefined) {
      dateAndTimeMap.set(time, updatedDates);
    }
  };

  const handleRemoveAllDates = (time: string) => {
    dateAndTimeMap.delete(time);
  };
  return (
    <div className="dateTime-container">
      <h3 className="timeAndDate-header">Your Time Schedule</h3>
      {Array.from(dateAndTimeMap.entries()).map(([time, dates]) => (
        <div key={time} className="time-button-wrapper">
          <button
            type="button"
            ref={(element) => {
              buttonRefs.current.set(time, element);
            }}
            className="openTime-button"
            onClick={() => handleOpen(time)}
          >
            {time}
          </button>
          {openTime === time && (
            <div className="displayDates-container" ref={closeRef}>
              <div className="displayDates-arrow" />
              <div className="grid-display">
                {dates.map((date, index) => {
                  const month = getISODate(date).toLocaleString("default", { month: "short" });
                  const dayName = getISODate(date).toLocaleString("default", { weekday: "long" });
                  const { day, year } = getDayMonthYear(date);

                  return (
                    <div key={index} className="dateUI-container">
                      <button onClick={() => handleRemoveDate(date, time)} className="remove-date">
                        <TrashIcon className="hover-trash" />
                      </button>

                      <p className="day-name-text">{dayName}</p>
                      <p className="day-month-text">
                        {day} {month}
                      </p>
                    </div>
                  );
                })}
              </div>
              {/* <button className="remove-allDates" onClick={() => handleRemoveAllDates(time)}>
                Remove
              </button> */}
              <Button variant="primary" onClick={() => handleRemoveAllDates(time)}>
                Remove all dates
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DateAndTimeDisplay;
