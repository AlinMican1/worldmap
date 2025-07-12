export const Calendar = () => {
  let monthDaysMap = new Map<string, number>([
    ["01", 31],
    ["02", 28],
    ["03", 31],
    ["04", 30],
    ["05", 31],
    ["06", 30],
    ["07", 31],
    ["08", 31],
    ["09", 30],
    ["10", 31],
    ["11", 30],
    ["12", 31],
  ]);

  const date: Date = new Date();

  const getTodayDate: string = date.toLocaleString().split(",")[0];
  let [day, month, year] = getTodayDate.split("/");
  let numericYear = Number(year);
  const getTodayCurrentTime: string = date.toLocaleString().split(", ")[1];
  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const dateArray = [];

  while (numericYear <= date.getFullYear() + 10) {
    if (isLeapYear(numericYear)) {
      monthDaysMap.set("02", 29);
    } else {
      monthDaysMap.set("02", 28);
    }

    const tempMap = new Map<string, number>();

    monthDaysMap.forEach((days, m) => {
      if (numericYear === date.getFullYear()) {
        if (Number(m) < Number(month)) return;

        if (m === month) {
          tempMap.set(m, days - Number(day));
        } else {
          tempMap.set(m, days);
        }
      } else {
        tempMap.set(m, days);
      }
    });

    dateArray.push({ year: numericYear, months: new Map(tempMap) });
    numericYear += 1;
  }

  return dateArray;
};
