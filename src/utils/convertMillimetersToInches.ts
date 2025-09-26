export const convertMillimetersToInches = (
  unit: number,
  symbol: "mm" | "in"
): number => {
  let result: number;
  if (symbol === "mm") {
    result = unit / 25.4;
  } else {
    result = unit;
  }

  return Math.round(result); // rounding to 2 decimal places
};
