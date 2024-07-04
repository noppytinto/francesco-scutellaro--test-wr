export function formatDateToDDMMYYYY(date: Date) {
  return new Date(date).toLocaleDateString("en-GB");
}

export function formatDateToYYYYMMDD(date: Date) {
  return date.toISOString().split("T")[0];
}

export function getDifferenceInDays(date1: Date, date2: Date) {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
