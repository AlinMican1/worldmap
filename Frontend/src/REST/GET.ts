import axios from "axios";

export const GetParticipants = async (id: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}getParticipants/${id}`);
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
