import {
  SubmitLocationFormProps,
  ErrorMessageProps,
  ClientInfoProps,
} from "@/types/interfaces";
import { COUNTRIES } from "./SuggestLocation";

export const GetFormErrors = (
  emailRequired: boolean,
  { location, email, name }: SubmitLocationFormProps
): ErrorMessageProps[] => {
  const formErrors: ErrorMessageProps[] = [
    { id: "name", errorMsg: "No name", error: false },
    { id: "name", errorMsg: "Name too long", error: false },
    { id: "email", errorMsg: "No email", error: false },
    { id: "email", errorMsg: "Email does not exist", error: false },
    { id: "location", errorMsg: "No location", error: false },
    { id: "location", errorMsg: "Location does not exist", error: false },
  ];
  if (name.trim() === "") formErrors[0].error = true;
  if (name.length > 50) formErrors[1].error = true;
  if (email.trim() === "" && emailRequired) formErrors[2].error = true;
  if (location.trim() === "") formErrors[4].error = true;
  if (!COUNTRIES.includes(location)) formErrors[5].error = true;

  //formErrors.map((err: ErrorMessageProps) => err.error === true);
  return formErrors;
};

export const NoClientsError = (clients?: ClientInfoProps[]): ErrorMessageProps[] => {
  if (!clients || clients.length === 0 || clients === undefined) {
    return [{ id: "noClient", errorMsg: "No clients", error: true }];
  }
  return [];
};
