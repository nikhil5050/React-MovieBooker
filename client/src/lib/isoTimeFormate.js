export function isoTimeFormate(dateTime) {
  const validDate = new Date(dateTime);
  if (isNaN(validDate)) return 'Invalid time';
  return validDate.toLocaleTimeString();
}
