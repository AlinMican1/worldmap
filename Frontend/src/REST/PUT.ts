import axios from "axios";

export const UpdateUserTimezone = async (timezone: string) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DEV_URL}updateUserTimezone`,
      { timezone },
      {
        withCredentials: true,
      }
    );

    return response.data.message;
  } catch (error) {
    return {
      message: "Server error",
    };
  }
};

export const UpdateTimezoneOrder = async (meetingId: string, timezoneOrder: string[]) => {
  const API = process.env.NEXT_PUBLIC_DEV_URL + `meetings/${meetingId}/timezone-order`;

  try {
    const response = await axios.put(
      API,
      { timezone_order: timezoneOrder },
      { withCredentials: true }
    );

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};
