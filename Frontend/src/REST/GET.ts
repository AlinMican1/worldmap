import axios from "axios";

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
    };
  } catch (error) {
    return {
      message: "Server error",
    };
  }
};
