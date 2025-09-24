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

interface GeoInfoProps {
  countryName: string;
  timeZone: string;
  latitude: number;
  longitude: number;
}

export const GetGeoInfo = async (allow: boolean): Promise<GeoInfoProps> => {
  if (!allow) {
    return {
      countryName: "Austrlia",
      timeZone: "12",
      latitude: 37.7595,
      longitude: -122.4367,
    };
  }

  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_GEO_INFO_API as string);
    return {
      countryName: response.data.country_name,
      timeZone: response.data.timezone,
      latitude: response.data.latitude,
      longitude: response.data.longitude,
    };
  } catch (error) {
    return {
      countryName: "Austrlia",
      timeZone: "12",
      latitude: 37.7595,
      longitude: -122.4367,
    };
  }
};
