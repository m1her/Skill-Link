export function isDisabledHandler({
  date,
  time,
}: {
  date: string;
  time: string;
}) {
  const sessionDateTime = new Date(`${date}T${time}`);
  const currentDateTime = new Date();

  const timeDifferenceInMinutes =
    (sessionDateTime.getTime() - currentDateTime.getTime()) / (1000 * 60);
  console.log(sessionDateTime, currentDateTime, timeDifferenceInMinutes);

  let bgColor = "bg-white";
  let isDisabled = false;

  if (sessionDateTime > currentDateTime) {
    bgColor = "bg-white";
    isDisabled = true;
  } else {
    if (timeDifferenceInMinutes >= -20 && timeDifferenceInMinutes < 0) {
      bgColor = "bg-green-100";
    } else {
      bgColor = "bg-gray-300";
      isDisabled = true;
    }
  }

  return { isDisabled, bgColor };
}
