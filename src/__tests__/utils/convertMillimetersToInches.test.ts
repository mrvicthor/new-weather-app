import { convertMillimetersToInches } from "../../utils/convertMillimetersToInches";

describe("convertMillimetersToInches", () => {
  describe('when the symbol is "mm"', () => {
    test("should convert millimeters to inches and round the result to the nearest integer", () => {
      expect(convertMillimetersToInches(25.4, "mm")).toBe(1);
      expect(convertMillimetersToInches(50.8, "mm")).toBe(2);
      expect(convertMillimetersToInches(0, "mm")).toBe(0);
      expect(convertMillimetersToInches(76.2, "mm")).toBe(3);
    });

    test("should always round up with Math.round", () => {
      expect(convertMillimetersToInches(30, "mm")).toBe(1);
      expect(convertMillimetersToInches(51, "mm")).toBe(2);
      expect(convertMillimetersToInches(76, "mm")).toBe(3);
    });

    test("should handle decimal millimeter values correctly", () => {
      expect(convertMillimetersToInches(12.7, "mm")).toBe(1);
      expect(convertMillimetersToInches(38.1, "mm")).toBe(2);
      expect(convertMillimetersToInches(63.5, "mm")).toBe(3);
    });
  });

  describe('when the symbol is "in"', () => {
    test("should return inches unchanged and rounded to the nearest integer", () => {
      expect(convertMillimetersToInches(1, "in")).toBe(1);
      expect(convertMillimetersToInches(2.5, "in")).toBe(3);
      expect(convertMillimetersToInches(0, "in")).toBe(0);
      expect(convertMillimetersToInches(3.7, "in")).toBe(4);
    });

    test("should handle decimal inch values correctly", () => {
      expect(convertMillimetersToInches(1.2, "in")).toBe(1);
      expect(convertMillimetersToInches(2.6, "in")).toBe(3);
      expect(convertMillimetersToInches(3.4, "in")).toBe(3);
    });
  });

  describe("edge cases", () => {
    test("should return 0 when the input is 0", () => {
      expect(convertMillimetersToInches(0, "mm")).toBe(0);
      expect(convertMillimetersToInches(0, "in")).toBe(0);
    });

    test("should handle negative values", () => {
      expect(convertMillimetersToInches(-25.4, "mm")).toBe(-1);
      expect(convertMillimetersToInches(-2.5, "in")).toBe(-2);
    });

    test("should handle very small positive values", () => {
      expect(convertMillimetersToInches(0.01, "mm")).toBe(0);
      expect(convertMillimetersToInches(0.001, "mm")).toBe(0);
      expect(convertMillimetersToInches(0.0001, "in")).toBe(0);
    });

    test("should handle very large values", () => {
      expect(convertMillimetersToInches(2540, "mm")).toBe(100);
      expect(convertMillimetersToInches(1000, "in")).toBe(1000);
    });
  });
});
