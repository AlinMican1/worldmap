import {
  ErrorMessageProps,
  ClientInfoProps,
  MeetingDetailsProps,
  LoginDetailsProps,
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
}: MeetingDetailsProps): Map<string, ErrorMessageProps> => {
  const meetingDetailsMap = new Map<string, ErrorMessageProps>([
    ["meetingTitle", { id: "meetingTitle", errorMsg: "Required", error: false }],
  ]);

  const titleError = meetingDetailsMap.get("meetingTitle");
  if (titleError && meeting_title.trim() === "") {
    meetingDetailsMap.set("meetingTitle", { ...titleError, error: true });
  }

  //MAKE SURE TO SET PROPER NAME FOR PROPS
  return meetingDetailsMap;
};

export const GetLoginDetailsErrors = ({
  email,
  password,
  credentialsIncorrect,
}: LoginDetailsProps): Map<string, ErrorMessageProps> => {
  const LogInDetailsMap = new Map<string, ErrorMessageProps>([
    ["email", { id: "email", errorMsg: "Email Required", error: false }],
    ["password", { id: "password", errorMsg: "Password Required", error: false }],
    [
      "incorrectCredentials",
      { id: "incorrectCredentials", errorMsg: "Log In credentials are incorrect.", error: false },
    ],
  ]);
  const emailError = LogInDetailsMap.get("email");
  if (emailError && email.trim() === "") {
    LogInDetailsMap.set("email", { ...emailError, error: true });
  }
  const passwordError = LogInDetailsMap.get("password");
  if (passwordError && password.trim() === "") {
    LogInDetailsMap.set("password", { ...passwordError, error: true });
  }
  const credentialsError = LogInDetailsMap.get("incorrectCredentials");
  if (credentialsError && credentialsIncorrect === true) {
    LogInDetailsMap.set("incorrectCredentials", { ...credentialsError!, error: true });
  }

  return LogInDetailsMap;
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
