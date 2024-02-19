const formatDate = (rawDate: string) => {
  var date = new Date(rawDate);
  const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if needed
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  // Construct the formatted date string
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

const toSimplifyDate = (rawDate: string) => {
  const formattedDate = rawDate.toString().split("T")[0];
  return formattedDate;
};

export { formatDate, toSimplifyDate };
