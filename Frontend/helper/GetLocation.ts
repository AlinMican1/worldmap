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

//The allow is for the cookies
export const GetGeoLocation = async (allow: boolean): Promise<[number, number]> => {
  if (!allow || !navigator.geolocation) {
    return [37.7595, -122.4367]; // fallback
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve([position.coords.latitude, position.coords.longitude]),
      () => resolve([37.7595, -122.4367])
    );
  });
};

export const GetGeoInfo = async (allow: boolean) => {
  if (!allow) {
    return "";
  }

  try {
    const response = await axios.get("https://ipapi.co/json/");
    return {
      "Country name": response.data.country_name,
      TimeZone: response.data.timezone,
    };
  } catch (error) {
    return {
      "Country name": "Austrlia",
      TimeZone: "12",
    };
  }
};
