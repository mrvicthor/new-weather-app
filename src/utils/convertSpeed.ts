export const convertSpeed = (
  speed: number,
  fromUnit: "km/h" | "mph"
): number => {
  let speedInMph: number;
  if (fromUnit === "mph") {
    speedInMph = speed / 1.609;
  } else {
    speedInMph = speed;
  }

  return Math.round(speedInMph);
};
