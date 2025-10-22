import {
  ErrorMessageProps,
  ClientInfoProps,
  MeetingDetailsProps,
  ErrorMessagePro,
} from "@/types/interfaces";
import { COUNTRIES } from "./SuggestLocation";

export const GetFormErrors = (
  emailRequired: boolean,
  { location, email, first_name, surname, meeting_title /*dates*/ }: ClientInfoProps
): ErrorMessageProps[] => {
  const formErrors: ErrorMessageProps[] = [
    { id: "name", errorMsg: "No name", error: false },
    { id: "name", errorMsg: "Name too long", error: false },
    { id: "surname", errorMsg: "No surname", error: false },
    { id: "surname", errorMsg: "Surname too long", error: false },
    { id: "email", errorMsg: "No email", error: false },
    { id: "email", errorMsg: "Email does not exist", error: false },
    { id: "location", errorMsg: "No location", error: false },
    { id: "location", errorMsg: "Location does not exist", error: false },
    { id: "time", errorMsg: "No time slot selected", error: false },
    {
      id: "date",
      errorMsg: "Your time schedule is currently empty. Please add at least one time slot.",
      error: false,
    },
    { id: "meetingTitle", errorMsg: "Required", error: false },
  ];

  if (first_name.trim() === "") formErrors[0].error = true;
  if (first_name.length > 50) formErrors[1].error = true;
  if (surname.trim() === "") formErrors[2].error = true;
  if (surname.length > 50) formErrors[3].error = true;
  if (email.trim() === "" && emailRequired) formErrors[4].error = true;
  if (location.trim() === "") formErrors[6].error = true;
  if (!Object.keys(COUNTRIES).includes(location)) formErrors[7].error = true;
  if (meeting_title?.trim() === "") formErrors[8].error = true;
  // if (dates.size === 0) formErrors[7].error = true;
  // if (dates.array.length === 0) formErrors[7].error = true;

  //formErrors.map((err: ErrorMessageProps) => err.error === true);
  return formErrors;
};

export const GetMeetingDetailsErrors = ({
  meeting_date,
  meeting_desc,
  meeting_duration,
  meeting_title,
}: MeetingDetailsProps): Map<string, ErrorMessagePro> => {
  const meetingDetailsMap = new Map<string, ErrorMessagePro>([
    ["meetingTitle", { id: "meetingTitle", errorMsg: "Required", error: false }],
  ]);

  const titleError = meetingDetailsMap.get("meetingTitle");
  if (titleError && meeting_title.trim() === "") {
    meetingDetailsMap.set("meetingTitle", { ...titleError, error: true });
  }

  //MAKE SURE TO SET PROPER NAME FOR PROPS
  return meetingDetailsMap;
};

export const NoClientsError = (clients?: ClientInfoProps[]): ErrorMessageProps[] => {
  if (!clients || clients.length === 0 || clients === undefined) {
    return [
      {
        id: "noClient",
        errorMsg: "No clients have been added. Please complete the form above to add a client.",
        error: true,
      },
    ];
  }
  return [];
};
