"use client";
import { useCallback, useState, memo, useRef } from "react";
import BoxDesign from "../atoms/boxDesign";
import SelectBox from "../atoms/selectBox";
import "./calendarBox.css";
import "../../app/globals.css";
import { GenerateCalendar, isWeekend } from "../../../helper/GenerateCalendar";
import { MONTHMAP, WEEKDAYS } from "../../../helper/Constants";
import { formatDate, getISODate, getTodayDate } from "../../../helper/Formatter";
import { useDateAndTimeContext, useMeetingDateContext } from "@/contexts";

interface CalendarBoxProps {
  onDateSelect?: (date: string) => void;
}
const CalendarBox = ({ onDateSelect }: CalendarBoxProps) => {
  // const { dateArray } = useDateAndTimeContext();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-based month
  // console.log("BBBB", dateArray.array);
  const calendar = GenerateCalendar(currentMonth, currentYear);
  const firstWeekday = (new Date(currentYear, currentMonth, calendar.startDay).getDay() + 6) % 7;

  // const addDateToArray = useCallback(
  //   (date: string) => {
  //     const dateIndex = dateArray.array.indexOf(date);
  //     if (dateIndex > -1) {
  //       dateArray.remove(dateIndex);
  //     } else {
  //       dateArray.push(date);
  //       dateArray.setArray((prev) =>
  //         [...prev].sort((a, b) => getISODate(a).getTime() - getISODate(b).getTime())
  //       );
  //     }
  //   },
  //   [dateArray.array]
  // );
  const { meetingDate, setMeetingDate } = useMeetingDateContext();
  const handleMeetingDate = (date: string) => {
    setMeetingDate(date);
    if (onDateSelect) onDateSelect(date);
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
    <div className="calendar-container">
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
          <div key={`empty-${i}`}></div>
        ))}

        {/* Render days */}

        {calendar.daysArray.map(({ date }, i) => {
          return (
            <div key={i}>
              <SelectBox
                name={date.toString()}
                disabled={calendar.monthStartDay > date}
                dimmed={isWeekend(currentYear, currentMonth, date)}
                // onClick={() => {
                //   if (calendar.monthStartDay <= date) {
                //     addDateToArray(formatDate(new Date(currentYear, currentMonth, date)));
                //   }
                // }}
                onClick={() =>
                  handleMeetingDate(formatDate(new Date(currentYear, currentMonth, date)))
                }
                // selected={dateArray.array.includes(
                //   formatDate(new Date(currentYear, currentMonth, date))
                // )}
                selected={meetingDate.includes(
                  formatDate(new Date(currentYear, currentMonth, date))
                )}
                className="calendar-box"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(CalendarBox);
