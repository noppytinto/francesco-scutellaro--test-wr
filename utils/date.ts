/**
 * Format date to dd/mm/yyyy
 * @param date
 */
export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-GB");
};
