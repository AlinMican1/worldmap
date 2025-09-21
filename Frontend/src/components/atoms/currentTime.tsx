import { useEffect, useState } from "react";
import { formatDate } from "../../../helper/Formatter";
import BoxDesign from "./boxDesign";
import ClockIcon from "../icons/clock";
import "./currentTime.css";

const CurrentTime = () => {
  const [time, setTime] = useState<string>("");
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    // Initialize when component mounts (client-side only)
    const now = new Date();
    setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    setTodayDate(formatDate(now));

    // Update every minute
    const timer = setInterval(() => {
      const updated = new Date();
      setTime(updated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);
  return (
    <BoxDesign variant="showTime-DesignBox" padding="small">
      <p className="showTime-Title">
        <ClockIcon className="clock-Design" /> Active Now
      </p>

      <h1 className="showTime-time">{time}</h1>
      {/* <p className="showTime-date">{todayDate}</p> */}
    </BoxDesign>
  );
};

export default CurrentTime;
