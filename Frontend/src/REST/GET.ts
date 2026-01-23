import axios from "axios";
import { UpdateUserTimezone } from "./PUT";

// export async function GetAuthenticatedUser() {
//   try {
//     const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}profile`);
//     return { success: true, data: response };
//   } catch (error) {
//     return { success: false };
//   }
// }

export const GetParticipants = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}getParticipants`, {
      withCredentials: true,
    });

    return response.data.participants;
  } catch (error) {
    return {
      message: "Server error",
    };
  }
};

export const GetTimeFromDifferentCountry = async (timezone: string, country: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DEV_URL}timezoneDetails/${country}/${timezone}`
    );
    return {
      country: response.data.country,
      timezones: response.data.timezones,
      date: response.data.date,
      time: response.data.time,
      utc_offset: response.data.utc_offset,
    };
  } catch (error) {
    return {
      message: "Server error",
    };
  }
};

export const GetAllUserMeetings = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}getMeetingDetails`, {
      withCredentials: true,
    });

    return response.data.meetings;
  } catch (error) {
    return {
      message: "Server error",
    };
  }
};

export const getUserCurrentTimezone = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}getUserTimezone`, {
      withCredentials: true,
    });
    return response.data.timezone;
  } catch (error) {
    return {
      message: "Server error",
    };
  }
};

export const GetMeetingParticipants = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}getMeetingParticipants`, {
      withCredentials: true,
    });
    return response.data.MeetingParticipants;
  } catch (error) {
    return {
      message: "Server error",
    };
  }
};

export async function GetCurrentUser() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}auth/getCurrentUser`, {
    withCredentials: true,
  });

  return response.data;
}

export async function GetLoggedInUserDetails(token: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}getUserDetails`, {
    headers: {
      // Pass the token here so the backend can see it
      Authorization: `Bearer ${token}`,
      // If your backend specifically looks for a Cookie header:
      Cookie: `access_token=${token}`,
    },
  });
  return response.data;
}
