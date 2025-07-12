"use client";

import { useState } from "react";
import BoxDesign from "../atoms/boxDesign";
import SelectBox from "../atoms/selectBox";
import "./calendarBox.css";
import "../../app/globals.css";
import { GenerateCalendar } from "../../../helper/GenerateCalendar";

const CalendarBox = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-based month
  const calendar = GenerateCalendar(currentMonth, currentYear);

  const firstWeekday = (new Date(currentYear, currentMonth, calendar.startDay).getDay() + 6) % 7;

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
        <div className="calendar-header">
          <button onClick={goToPreviousMonth}>⬅️</button>
          <span>
            {currentYear} - {(currentMonth + 1).toString().padStart(2, "0")}
          </span>
          <button onClick={goToNextMonth}>➡️</button>
        </div>

        <div className="calendar-grid">
          {/* Weekday headers */}
          {calendar.weekdayNames.map((dayName) => (
            <p key={dayName} className="item-string">
              {dayName}
            </p>
          ))}

          {/* Empty slots for offset */}
          {[...Array(firstWeekday)].map((_, i) => (
            <div key={`empty-${i}`}></div>
          ))}

          {/* Render days */}
          {calendar.daysArray.map(({ date }, i) => (
            <SelectBox key={i} name={date.toString()} />
          ))}
        </div>
      </BoxDesign>
    </div>
  );
};

export default CalendarBox;
