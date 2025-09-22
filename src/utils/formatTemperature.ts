export const formatTemperatureToFahrenheit = (value: number): number => {
  const result = (value * 9) / 5 + 32;
  return Math.ceil(result);
};
