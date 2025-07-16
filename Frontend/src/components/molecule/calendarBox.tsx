"use client";

import { useState } from "react";
import BoxDesign from "../atoms/boxDesign";
import SelectBox from "../atoms/selectBox";
import "./calendarBox.css";
import "../../app/globals.css";
import { GenerateCalendar, isWeekend } from "../../../helper/GenerateCalendar";
import { MONTHMAP, WEEKDAYS } from "../../../helper/Constants";
import { formatDate } from "../../../helper/Formatter";
import { UseArrayProps } from "@/types/interfaces";

interface CalendarBoxProps {
  dateArray: UseArrayProps<string>;
}
const CalendarBox = ({ dateArray }: CalendarBoxProps) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-based month
  const calendar = GenerateCalendar(currentMonth, currentYear);

  const firstWeekday = (new Date(currentYear, currentMonth, calendar.startDay).getDay() + 6) % 7;

  const addDateToArray = (date: string) => {
    if (dateArray.array.includes(date)) {
      for (let i = 0; i < dateArray.array.length; i++) {
        if (dateArray.array[i] === date) {
          dateArray.remove(i);
          break;
        }
      }
    } else {
      dateArray.push(date);
    }
  };

  // Handlers for month navigation
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }
  };

  const goToPreviousMonth = () => {
    // Don't allow user to go beyond our current month previously.
    if (currentYear === new Date().getFullYear() && currentMonth === new Date().getMonth()) {
      return;
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((year) => year - 1);
      } else {
        setCurrentMonth((month) => month - 1);
      }
    }
  };

  return (
    <div>
      <BoxDesign>
        {/* Header with navigation */}
        <div className="calendar-header-wrapper">
          <button className="calendar-button calendar-button-left" onClick={goToPreviousMonth}>
            {"<"}
          </button>
          <span className="calendar-heading">
            {MONTHMAP.get((currentMonth + 1).toString().padStart(2, "0"))} - {currentYear}
          </span>
          <button className="calendar-button calendar-button-right" onClick={goToNextMonth}>
            {">"}
          </button>
        </div>

        <div className="calendar-grid">
          {/* Weekday headers */}
          {WEEKDAYS.map((dayName) => (
            <p key={dayName} className="item-string">
              {dayName}
            </p>
          ))}

          {/* Empty slots for offset */}
          {[...Array(firstWeekday)].map((_, i) => (
            <div key={`empty-${i}`}>
            </div>
          ))}

          {/* Render days */}
          {calendar.daysArray.map(({ date }, i) => {
            if(calendar.monthStartDay > date){
              return(
              <SelectBox
                key={i}
                name={date.toString()}
                classname={"unselectable"}
              />
              )
            }else{
              if (isWeekend(currentYear, currentMonth, date)) {
              return (
                <SelectBox
                  onClick={() =>
                    addDateToArray(formatDate(new Date(currentYear, currentMonth, date)))
                  }
                  key={i}
                  name={date.toString() }
                  classname={
                    dateArray.array.includes(formatDate(new Date(currentYear, currentMonth, date)))
                      ? "selected"
                      : "turnDownOpacity"
                  }
                />
              );
            }
            }
            // if (isWeekend(currentYear, currentMonth, date)) {
            //   return (
            //     <SelectBox
            //       onClick={() =>
            //         addDateToArray(formatDate(new Date(currentYear, currentMonth, date)))
            //       }
            //       key={i}
            //       name={date.toString() }
            //       classname={
            //         dateArray.array.includes(formatDate(new Date(currentYear, currentMonth, date)))
            //           ? "selected"
            //           : "turnDownOpacity"
            //       }
            //     />
            //   );
            // }
            return (
              <SelectBox
                onClick={() =>
                  addDateToArray(formatDate(new Date(currentYear, currentMonth, date)))
                }
                key={i}
                name={date.toString()}
                classname={
                  dateArray.array.includes(formatDate(new Date(currentYear, currentMonth, date)))
                    ? "selected"
                    : ""
                }
              />
            );
          })}
        </div>
      </BoxDesign>
    </div>
  );
};

export default CalendarBox;
