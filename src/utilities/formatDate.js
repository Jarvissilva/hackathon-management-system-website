export default function formatDate(isoString) {
  if (!isoString) return "Invalid date";

  const date = new Date(isoString);

  return date.toLocaleString("en-US", {
    weekday: "long", // "Friday"
    year: "numeric", // "2323"
    month: "long", // "March"
    day: "numeric", // "31"
    hour: "2-digit", // "12"
    minute: "2-digit", // "23"
    hour12: true, // AM/PM format
  });
}
