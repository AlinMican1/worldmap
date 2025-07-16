export const MONTHMAP = new Map<string, string>([
  ["01", "January"],
  ["02", "February"],
  ["03", "March"],
  ["04", "April"],
  ["05", "May"],
  ["06", "June"],
  ["07", "July"],
  ["08", "August"],
  ["09", "September"],
  ["10", "October"],
  ["11", "November"],
  ["12", "December"],
]);

export const WEEKDAYS: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const GenerateCalendar = (
  currentMonth: number,
  currentYear: number
): {
  weekdayNames: string[];
  startDay: number;
  months: Map<string, string>;
  daysArray: Array<{ date: number; weekday: number }>;
} => {
  const today = new Date();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay =
    currentYear === today.getFullYear() && currentMonth === today.getMonth() ? today.getDate() : 1;
  const daysToRender = [];
  for (let d = startDay; d <= daysInMonth; d++) {
    const tempDate = new Date(currentYear, currentMonth, d);
    daysToRender.push({
      date: d,
      weekday: tempDate.getDay(),
    });
  }

  return {
    months: MONTHMAP,
    weekdayNames: WEEKDAYS,
    startDay: startDay,
    daysArray: daysToRender,
  };
};
export const isWeeknd = (currentYear: number, currentMonth: number, currentDay: number) => {
  return (
    new Date(currentYear, currentMonth, currentDay).getDay() === 0 ||
    new Date(currentYear, currentMonth, currentDay).getDay() === 6
  );
};
