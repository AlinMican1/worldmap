import { createContext, useContext } from "react";
import { ChooseDateAndTimeProps, MeetingDateProps } from "./types/interfaces";

export const DateAndTimeContext = createContext<ChooseDateAndTimeProps | undefined>(undefined);

export const useDateAndTimeContext = () => {
  const dateAndTime = useContext(DateAndTimeContext);
  if (dateAndTime === undefined) {
    throw new Error("useDateAndTimeContext must be undefined and used");
  }
  return dateAndTime;
};

export const MeetingDateContext = createContext<MeetingDateProps | undefined>(undefined);

export const useMeetingDateContext = () => {
  const meetingDate = useContext(MeetingDateContext);
  if (meetingDate === undefined) {
    throw new Error("useDateAndTimeContext must be undefined and used");
  }
  return meetingDate;
};
