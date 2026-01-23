import { createContext, useContext } from "react";
import { ChooseDateAndTimeProps, MeetingDateProps, UserDetails } from "../types/interfaces";

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

export const LoggedInUserDetailsContext = createContext<UserDetails | undefined>(undefined);

export const useLoggedInUserDetailsContext = () => {
  const userDetails = useContext(LoggedInUserDetailsContext);
  if (userDetails === undefined) {
    throw new Error("useLoggedInUserDetails must be undefined and used");
  }
  return userDetails;
};
