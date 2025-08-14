import axios from "axios";
import { GetFormErrors } from "../../helper/GetErrors";
import { ClientInfoProps } from "@/types/interfaces";

export const SubmitLocationForm = async (
  emailRequired: boolean,
  { location, email, name, dates }: ClientInfoProps
) => {
  const errorArray = GetFormErrors(emailRequired, { location, name, email, dates });
  if (errorArray) {
    return { success: false, errors: errorArray };
  }

  const apiURL = process.env.NEXT_PUBLIC_DEV_URL + "form";

  try {
    const res = await axios.post(apiURL, {
      location,
      email,
      name,
    });
    return { success: true, message: res.data.message, errors: [] };
  } catch (error) {
    return { success: false, message: "Server Error", error: error, errors: [] };
  }
};

export const SubmitClientSchedule = async (clients?: ClientInfoProps[]) => {
  if (!clients || clients.length === 0) {
    return {
      success: false,
      errors: [
        {
          id: "noClient",
          errorMsg: "No clients have been added. Please complete the form above to add a client.",
          error: true,
        },
      ],
    };
  }
  const apiURL = process.env.NEXT_PUBLIC_DEV_URL + "schedule";
  console.log("SS");
  try {
    await Promise.all(
      clients.map(async (client) => {
        const res = await axios.post(apiURL, {
          name: client.name,
          email: client.email,
          location: client.location,
          dates: Object.fromEntries(client.dates),
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
