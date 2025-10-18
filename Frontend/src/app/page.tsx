"use client";
import axios from "axios";
import { useMemo, useState } from "react";
import InputLocation from "@/components/atoms/inputLocation";
import CalendarBox from "@/components/molecule/calendarBox";
import useArray from "@/hooks/useArray";
import { DateAndTimeContext } from "@/contexts";
import ChooseTime from "@/components/molecule/chooseTime";
import DateAndTimeDisplay from "@/components/molecule/dateAndTimeDisplay";
export default function Home() {
  let apiURL = process.env.NEXT_PUBLIC_DEV_URL + "api/hello";
  if (process.env.NODE_ENV === "production") {
    apiURL = process.env.NEXT_PUBLIC_DEV_URL + "api/hello";
  }

  const dateArray = useArray<string>([]);
  const [time, setTime] = useState<string>("");
  const [dateAndTimeMap, setDateAndTimeMap] = useState<Map<string, string[]>>(new Map());
  const CalendarBoxMemo = useMemo(() => <CalendarBox />, [dateArray.array]);
  const [msg, setMsg] = useState<string>("");
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
  const test = async () => {
    try {
      const res = await axios.get(apiURL);
      setMsg(res.data.statuscode);
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <div>Hello World</div>
      <h1>BANG BANG</h1>
      <button onClick={test}>BANG BNAG</button>
      <h1>{msg}</h1>
      <InputLocation></InputLocation>
      <DateAndTimeContext.Provider value={dateAndTime}>
        <div className="elements-row">
          {CalendarBoxMemo}
          <ChooseTime />
        </div>
        <DateAndTimeDisplay />
      </DateAndTimeContext.Provider>
    </div>
  );
}
