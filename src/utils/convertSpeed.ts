export const convertSpeed = (
  speed: number,
  fromUnit: "km/h" | "mph"
): number => {
  if (fromUnit === "km/h") {
    return Math.round(speed);
  }

  let speedInMph: number;
  if (fromUnit === "mph") {
    speedInMph = speed / 1.609;
  } else {
    speedInMph = speed * 1.609;
  }

  return Math.round(speedInMph);
};
