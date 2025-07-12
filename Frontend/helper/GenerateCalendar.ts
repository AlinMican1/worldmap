const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const GenerateCalendar = (
  currentMonth: number,
  currentYear: number
): {
  weekdayNames: string[];
  startDay: number;
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

  return { weekdayNames: weekdayNames, startDay: startDay, daysArray: daysToRender };
};
