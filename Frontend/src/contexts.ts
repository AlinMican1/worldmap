import { createContext, useContext } from "react";
import { ChooseDateAndTimeProps } from "./types/interfaces";

export const DateAndTimeContext = createContext<ChooseDateAndTimeProps | undefined>(undefined);

export const useDateAndTimeContext = () => {
  const dateAndTime = useContext(DateAndTimeContext);
  if (dateAndTime === undefined) {
    throw new Error("useDateAndTimeContext must be undefined and used");
  }
  return dateAndTime;
};
