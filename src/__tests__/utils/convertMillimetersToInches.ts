import { convertMillimetersToInches } from "../../utils/convertMillimetersToInches";

describe("convertMillimetersToInches", () => {
  test("should return the same value if the symbol is 'mm'", () => {
    expect(convertMillimetersToInches(50, "mm")).toBe(50);
    expect(convertMillimetersToInches(0, "mm")).toBe(0);
    expect(convertMillimetersToInches(100.5, "mm")).toBe(100.5);
  });

  test("should return inches if initial symbol is mm", () => {
    expect(convertMillimetersToInches(50, "mm")).toBe(2);
  });

  test("should return mm if initial symbol is inches", () => {
    expect(convertMillimetersToInches(2, "in")).toBe(51);
  });
});
