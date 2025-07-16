export const GenerateCalendar = (
  currentMonth: number,
  currentYear: number
): {
  startDay: number;
  monthStartDay: number;
  daysArray: Array<{ date: number; weekday: number }>;
} => {
  const today = new Date();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = 1;
  // currentYear === today.getFullYear() && currentMonth === today.getMonth() ? today.getDate() : 1;
  const monthStartDay =
    currentYear === today.getFullYear() && currentMonth === today.getMonth() ? today.getDate() : 1;
  const daysToRender = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const tempDate = new Date(currentYear, currentMonth, d);
    daysToRender.push({
      date: d,
      weekday: tempDate.getDay(),
    });
  }
  return {
    startDay: startDay,
    daysArray: daysToRender,
    monthStartDay: monthStartDay,
  };
};
export const isWeekend = (currentYear: number, currentMonth: number, currentDay: number) => {
  return (
    new Date(currentYear, currentMonth, currentDay).getDay() === 0 ||
    new Date(currentYear, currentMonth, currentDay).getDay() === 6
  );
};
