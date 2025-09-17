export const formatTime = (value: string): string => {
  const result = value.split(" ");
  const time = result[1] + " " + result[2];
  return time;
};
