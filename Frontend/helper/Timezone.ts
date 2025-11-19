import { getUserCurrentTimezone } from "@/REST/GET";
import { UpdateUserTimezone } from "@/REST/PUT";

export const UserTimezoneUpdateLogic = async () => {
  const saved = localStorage.getItem("user_timezone");
  const current = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const db_Timezone = await getUserCurrentTimezone();

  try {
    if (!saved && !db_Timezone) {
      // first time, no local or DB
      localStorage.setItem("user_timezone", current);
      await UpdateUserTimezone(current);
    } else if (!saved) {
      // local missing, DB exists
      if (db_Timezone !== current) {
        await UpdateUserTimezone(current);
      }
      localStorage.setItem("user_timezone", current);
    } else if (saved !== db_Timezone) {
      // local exists but backend differs
      await UpdateUserTimezone(current);
      localStorage.setItem("user_timezone", current); // keep frontend in sync
    }
  } catch (error) {
    console.error("Timezone update failed", error);
  }

  // always return current frontend timezone
  return localStorage.getItem("user_timezone") || current;
};
