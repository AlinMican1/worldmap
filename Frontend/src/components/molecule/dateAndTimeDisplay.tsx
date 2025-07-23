import { ChooseDateAndTimeProps } from "@/types/interfaces";
import ChooseDate from "./chooseDate";
import ChooseTime from "./chooseTime";
import { useDateAndTimeContext } from "@/contexts";
import { useEffect, useState } from "react";

const DateAndTimeDisplay = () => {
  const { dateArray, time } = useDateAndTimeContext();
  const [dateAndTime, setDateAndTime] = useState<Map<string, string[]>>(new Map());

  const AddDateAndTimeToMap = () => {
    setDateAndTime((prevMap) => {
      const updatedMap = new Map(prevMap);
      if (time) {
        if (updatedMap.has(time)) {
          //Check if there are duplicates
          const existingDates = updatedMap.get(time) || [];
          const newDates = dateArray.array.filter((date) => !existingDates.includes(date));

          updatedMap.get(time)?.push(...newDates);
        } else {
          updatedMap.set(time, dateArray.array);
        }
      }
      return updatedMap;
    });
  };
  // console.log(dateAndTime);
  return (
    <div>
      {/* <button onClick={AddDateAndTimeToMap}>Update DateAndTime TEST</button> */}

      <p></p>
      <p>{time}</p>
    </div>
  );
};

export default DateAndTimeDisplay;
