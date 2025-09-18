export const formatTime = (value: string): string => {
  const result = value.split(" ");
  const timeToUse = Number(result[1]) < 10 ? result[1].split("")[1] : result[1];
  const time = timeToUse + " " + result[2];
  return time;
};
