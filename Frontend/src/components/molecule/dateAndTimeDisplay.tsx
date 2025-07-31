import { useDateAndTimeContext } from "@/contexts";
import { useEffect, useState } from "react";

const DateAndTimeDisplay = () => {
  const { dateAndTimeMap } = useDateAndTimeContext();

  return (
    <div>
      {Array.from(dateAndTimeMap.entries()).map(([time, dates]) => (
        <div key={time}>
          <h3>{time}</h3>
          {dates.map((date) => (
            <p key={date}>{date}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DateAndTimeDisplay;
