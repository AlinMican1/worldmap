import axios from "axios";
export const GetLocationTime = (locations: Array<string>): String => {
  locations.map(async (location) => {
    const getUrl = `${process.env.NEXT_PUBLIC_TIME_API}${location}`;
    try {
      console.log(getUrl);
      // const getUrl = process.env.NEXT_PUBLIC_TIME_API + "Europe/" + location
      const response = await axios.get(getUrl);
      console.log("hi" + response.data.Country + " " + response.data.Time);
      return response;
    } catch (error) {
      return error;
    }
  });
  return "Server Error";
};
