import axios from "axios";
import {
  GetFormErrors,
  GetLoginDetailsErrors,
  GetMeetingDetailsErrors,
} from "../../helper/GetErrors";
import { ClientInfoProps, ErrorMessageProps, MeetingDetailsProps } from "@/types/interfaces";

//AUTH SYSTEM
// export const SubmitLoginCredentials = async (email: string, password: string) => {
//   //First get All Errors
//   let credentialsIncorrect = false;
//   const getAllErrors = await GetLoginDetailsErrors({
//     email,
//     password,
//     credentialsIncorrect,
//   });

//   const filteredErrors: ErrorMessageProps[] = [];
//   const mapErrors = getAllErrors.forEach((err: ErrorMessageProps) => {
//     if (err.error === true) {
//       filteredErrors.push(err);
//     }
//   });
//   if (filteredErrors.length > 0) {
//     return { success: false, errors: filteredErrors };
//   }

//   const API = process.env.NEXT_PUBLIC_DEV_URL + "auth/login";

//   try {
//     const response = await axios.post(
//       API,
//       { email, password },
//       { withCredentials: true } // Include cookies for backend
//     );
//     return { success: true, message: response.data };
//   } catch (error) {
//     credentialsIncorrect = true;
//     return { success: false, message: "Log in credentials are incorrect.", error: error };
//   }
// };

export const SubmitLoginCredentials = async (email: string, password: string) => {
  // Initial validation errors
  let credentialsIncorrect = false;
  const getAllErrors = GetLoginDetailsErrors({
    email,
    password,
    credentialsIncorrect,
  });

  const filteredErrors: ErrorMessageProps[] = [];
  getAllErrors.forEach((err: ErrorMessageProps) => {
    if (err.error === true) filteredErrors.push(err);
  });

  if (filteredErrors.length > 0) {
    return { success: false, errors: filteredErrors };
  }

  const API = process.env.NEXT_PUBLIC_DEV_URL + "auth/login";

  try {
    const response = await axios.post(API, { email, password }, { withCredentials: true });
    return { success: true, message: response.data };
  } catch (error) {
    // Set credentialsIncorrect to true
    credentialsIncorrect = true;

    // Get updated error map
    const updatedErrors = GetLoginDetailsErrors({
      email,
      password,
      credentialsIncorrect,
    });

    // Filter for errors
    const filteredErrors: ErrorMessageProps[] = [];
    updatedErrors.forEach((err: ErrorMessageProps) => {
      if (err.error === true) filteredErrors.push(err);
    });

    return { success: false, errors: filteredErrors };
  }
};

export const SubmitLogout = async () => {
  const API = process.env.NEXT_PUBLIC_DEV_URL + "auth/logout";
  try {
    const response = await axios.post(API, {}, { withCredentials: true });
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    return { success: false, message: "Logout failed", error: error };
  }
};

// export const SubmitLocationForm = async (
//   emailRequired: boolean,
//   { location, email, name, dates }: ClientInfoProps
// ) => {
//   const errorArray = GetFormErrors(emailRequired, { location, name, email, dates });
//   if (errorArray) {
//     return { success: false, errors: errorArray };
//   }

//   const apiURL = process.env.NEXT_PUBLIC_DEV_URL + "form";

//   try {
//     const res = await axios.post(apiURL, {
//       location,
//       email,
//       name,
//     });
//     return { success: true, message: res.data.message, errors: [] };
//   } catch (error) {
//     return { success: false, message: "Server Error", error: error, errors: [] };
//   }
// };

export const SubmitClientSchedule = async (
  meetingDetails: MeetingDetailsProps,
  clients?: ClientInfoProps[]
) => {
  if (clients?.filter((p) => p.selected === true).length === 0) {
    return {
      success: false,
      errors: [
        {
          id: "noClient",
          errorMsg: "No clients have been added. Please add a client.",
          error: true,
        },
      ],
    };
  } else if (meetingDetails.meeting_title.trim() === "") {
    return {
      success: false,
      errors: [
        {
          id: "noMeetingDetails",
          errorMsg: "Please complete the meeting details form",
          error: true,
        },
      ],
    };
  } else if (meetingDetails.meeting_title.trim() === "" && (!clients || clients.length === 0)) {
    return {
      success: false,
      errors: [
        {
          id: "test",
          errorMsg: "test",
          error: true,
        },
      ],
    };
  }
  const apiURL = process.env.NEXT_PUBLIC_DEV_URL + "schedule";

  try {
    await Promise.all(
      clients.map(async (client) => {
        const res = await axios.post(apiURL, {
          name: client.first_name,
          email: client.email,
          location: client.location,
          // dates: Object.fromEntries(client.d),
          userId: "ef329fd2-3043-43ce-ae2f-d6d4ae865077",
        });

        return res.data;
      })
    );

    return { success: true, message: "All clients submitted successfully", errors: [] };
  } catch (error) {
    return { success: false, message: "Server Error", error, errors: [] };
  }
};

export const SubmitAddParticipant = async (client: ClientInfoProps) => {
  const { first_name, email, location, surname, timezone } = client;
  const getAllErrors = await GetFormErrors(true, {
    first_name,
    email,
    location,
    surname,
    timezone,
  });
  const filteredErrors = getAllErrors.filter((err: ErrorMessageProps) => err.error === true);

  if (filteredErrors.length > 0) {
    return { success: false, errors: filteredErrors };
  }
  const apiURL = process.env.NEXT_PUBLIC_DEV_URL + "participant";

  try {
    const res = await axios.post(
      apiURL,
      {
        location,
        email,
        first_name,
        surname,
        timezone,
      },
      {
        withCredentials: true, // ensures cookies/session are sent for auth
      }
    );
    return { success: true, message: res.data.message, errors: [] };
  } catch (error) {
    return { success: false, message: "Server Error", error: error, errors: [] };
  }
  //Check for errors first when submit
};

export const SubmitMeetingDetails = async (meetingDetails: MeetingDetailsProps) => {
  const {
    meeting_date,
    meeting_desc,
    meeting_duration,
    meeting_link,
    meeting_time,
    meeting_title,
  } = meetingDetails;
  const getAllErrors = await GetMeetingDetailsErrors({
    meeting_title,
    meeting_date,
    meeting_desc,
    meeting_duration,
    meeting_link,
    meeting_time,
  });
  const filteredErrors: ErrorMessageProps[] = [];
  const mapErrors = getAllErrors.forEach((err: ErrorMessageProps) => {
    if (err.error === true) {
      filteredErrors.push(err);
    }
  });

  if (filteredErrors.length > 0) {
    return { success: false, errors: filteredErrors };
  }
};
