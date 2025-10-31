import { formatDate, getDayMonthYear, getISODate, getMonthName } from "../helper/Formatter";

describe("Formatter for dates ", () => {
  test("check format of in DD-MM-YYYY passing Date Type [VALID DATA]", () => {
    const date = new Date(2024, 0, 5);
    const actualValue = formatDate(date);
    expect(actualValue).toEqual("05-01-2024");
  });

  test("check format of in DD-MM-YYYY passing Date Type [BOUNDARY DATA]", () => {
    //Cannot have feb with 30 days
    const date = new Date(2024, 1, 30);
    const actualValue = formatDate(date);
    expect(actualValue).toEqual("01-03-2024");
  });

  test("check format of in DD-MM-YYYY passing Date Type [INVALID DATA]", () => {
    const invalidDate = new Date("invalid-date");
    expect(isNaN(invalidDate.getTime())).toBe(true);
    expect(() => formatDate(invalidDate));
  });
  test("should handle null input [INVALID DATA]", () => {
    expect(() => formatDate(null as any));
  });
  test("should handle null input [INVALID DATA]", () => {
    expect(() => formatDate(undefined as any));
  });
});

// export const getDayMonthYear = (date: string) => {
//   const [day, month, year] = date.split("-");
//   return {
//     day,
//     month,
//     year,
//   };
// };

describe("Get the individual day month and year from string", () => {
  test("Get full date from date string [VALID DATA]", () => {
    const validDate = "26-04-2024";
    const result = getDayMonthYear(validDate);
    expect(result).toEqual({ day: "26", month: "04", year: "2024" });
  });

  test("Get full date from date string [INVALID DATA]", () => {
    const emptyDate = "";
    const result = getDayMonthYear(emptyDate);
    expect(result).toEqual({ day: "", month: "", year: "" });
  });
  test("Get full date from date string [INVALID DATA]", () => {
    const wrongFormat = "26/04/2024";
    const result = getDayMonthYear(wrongFormat);
    expect(result).toEqual({ day: "", month: "", year: "" });
  });
});

describe("Get the ISO Date", () => {
  test("[VALID DATA]", () => {
    const validDate = "26-04-2024";
    const result = getISODate(validDate).toISOString();

    expect(result).toEqual("2024-04-25T23:00:00.000Z");
  });

  // test("[INVALID DATA]", () => {
  //   const invalidDate = "2634-0403-2024";
  //   const result = getISODate(invalidDate);
  //   console.log(result);
  //   expect(result).toEqual();
  // });
});

describe("Get the month name", () => {
  test("[VALID DATA]", () => {
    const validDate = "26/04/2024";
    const result = getMonthName(validDate);
    console.log(result);
    expect(result).toEqual("Apr");
  });
  test("[INVALID DATA]", () => {
    const invalidFormat = "26-04-2024";
    const result = getMonthName(invalidFormat);
    console.log(result);
    expect(result).toEqual("Invalid Date");
  });
  test("[INVALID DATA]", () => {
    const invalidDate = "26-34-2024";
    const result = getMonthName(invalidDate);
    console.log(result);
    expect(result).toEqual("Invalid Date");
  });
});

describe("Gets today's date", () => {
  //FINISH
});
