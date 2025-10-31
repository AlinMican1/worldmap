export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return ""; // or you could throw new Error("Invalid date") if you prefer strictness
  }
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};
export const getDayMonthYear = (date: string) => {
  if (!date || !date.includes("-")) {
    return { day: "", month: "", year: "" };
  }
  const [day, month, year] = date.split("-");
  return {
    day,
    month,
    year,
  };
};

export const getISODate = (date: string): Date => {
  const [day, month, year] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const getMonthName = (date: string): string => {
  const [day, month, year] = date.split("/").map(Number);

  const dateStr = new Date(year, month - 1, day);

  return dateStr.toLocaleString("en-US", { month: "short" });
};

export function getTodayDate(longForm: boolean): string {
  const today = new Date();
  const [day, month, year] = formatDate(today).split("-");

  const fullDate = `${day}/${month}/${year}`;

  if (longForm === true) {
    return `${day}-${getMonthName(fullDate)}-${year}`;
  }

  // join back into "dd/mm/yyyy"
  return formatDate(today);
}
