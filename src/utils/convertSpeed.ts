export const convertSpeed = (
  speed: number,
  fromUnit: "km/h" | "mph"
): number => {
  console.log("triggered", fromUnit);
  if (fromUnit === "km/h") {
    console.log("same unit");
    return Math.ceil(speed);
  }

  let speedInMph: number;
  if (fromUnit === "mph") {
    console.log("converting to mph");
    speedInMph = speed / 1.609;
  } else {
    speedInMph = speed * 1.609;
  }

  console.log({ speedInMph });

  return Math.ceil(speedInMph);
};
