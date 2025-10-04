import { useEffect, useState } from "react";
import { GetGeoInfo } from "../../helper/GetLocation";
import { COUNTRIES, getTimezones } from "../../helper/SuggestLocation";

export function useDefaultLocation() {
  const [location, setLocation] = useState("");
  const [timezones, setTimezones] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const data = await GetGeoInfo(true);
      const loc = data.countryName || "";
      setLocation(loc);
      if (COUNTRIES[loc]) {
        setTimezones(getTimezones(loc));
      }
    })();
  }, []);

  return { location, timezones };
}
