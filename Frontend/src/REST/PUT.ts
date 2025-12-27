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
