import { useDateAndTimeContext } from "@/contexts";
import "./dateAndTime.css";
import { useEffect, useRef, useState } from "react";
import { getDayMonthYear, getISODate } from "../../../helper/Formatter";
import TrashIcon from "../icons/trash";
import Button from "../atoms/button";
import BoxDesign from "../atoms/boxDesign";
import ArrowRightIcon from "../icons/arrowRight";

const DateAndTimeDisplay = () => {
  const { dateAndTimeMap, setDateAndTimeMap } = useDateAndTimeContext();
  const [openTime, setOpenTime] = useState<string>("");
  const closeRef = useRef<HTMLDivElement | null>(null);
  //Using button refs to keep track if the buttons are pressed or not. This avoids error where modal will keep
  //datesDisplay-container and closing when pressing the button.
  const buttonRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

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
    setDateAndTimeMap((prev) => {
      const updatedDates = prev.get(time)?.filter((d) => d !== date);
      const newMap = new Map(prev);

      if (updatedDates && updatedDates.length > 0) {
        newMap.set(time, updatedDates);
      } else {
        newMap.delete(time);
      }

      return newMap;
    });
  };

  const handleRemoveAllDates = (time: string) => {
    setDateAndTimeMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(time);
      return newMap;
    });
  };
  return (
    <BoxDesign variant="fourth-DesignBox" padding="none" centered="left">
      <div>
        <h3 className="timeAndDate-header">Time Schedule</h3>
      </div>
      {dateAndTimeMap.size !== 0 ? (
        Array.from(dateAndTimeMap.entries()).map(([time, dates]) => (
          <div key={time} className="time-button-wrapper">
            <Button
              variant="primary-btn"
              type="button"
              ref={(element) => {
                buttonRefs.current.set(time, element);
              }}
              className="openTime-button"
              onClick={() => handleOpen(time)}
            >
              <span className="button-content">
                {time}
                <ArrowRightIcon className="arrowRight" />
              </span>
            </Button>
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
                        <button
                          onClick={() => handleRemoveDate(date, time)}
                          className="remove-date"
                        >
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

                <Button
                  type="button"
                  variant="primary-btn"
                  onClick={() => handleRemoveAllDates(time)}
                >
                  Remove all dates
                </Button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="paragraph-xs">
          Your schedule is currently <span>empty</span>.
        </p>
      )}
    </BoxDesign>
  );
};

export default DateAndTimeDisplay;
