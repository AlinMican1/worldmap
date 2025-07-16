export const formatDate = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};
export const getDayMonthYear = (date: String) => {
  const [day, month, year] = date.split("-");
  return {
    day,
    month,
    year,
  };
};
