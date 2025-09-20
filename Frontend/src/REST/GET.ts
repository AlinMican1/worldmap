import axios from "axios";

export const GetParticipants = async (id: string) => {
  console.log("GET CLIENT");
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}getParticipants/${id}`);
    return response.data.participants;
  } catch (error) {
    return {
      message: "Server error",
    };
  }
};
