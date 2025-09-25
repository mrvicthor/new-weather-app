export const convertMillimetersToInches = (
  unit: number,
  symbol: "mm" | "in"
): number => {
  if (symbol === "mm") {
    return unit; // already in inches
  }
  let result: number;
  if (symbol === "in") {
    result = unit * 25.4;
  } else {
    result = unit / 25.4;
  }
  return Math.round(result * 100) / 100; // rounding to 2 decimal places
};
