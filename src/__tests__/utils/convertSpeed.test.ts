import { convertSpeed } from "../../utils/convertSpeed";

describe("Convert Speed", () => {
  describe('when the fromUnit is "km/h"', () => {
    test("should return the rounded speed value unchanged", () => {
      expect(convertSpeed(100, "km/h")).toBe(100);
      expect(convertSpeed(50.4, "km/h")).toBe(50);
      expect(convertSpeed(50.6, "km/h")).toBe(51);
      expect(convertSpeed(0, "km/h")).toBe(0);
    });

    test("should handle decimal values correctly", () => {
      expect(convertSpeed(75.7, "km/h")).toBe(76);
      expect(convertSpeed(75.4, "km/h")).toBe(75);
    });
  });

  describe('when the fromUnit is "mph"', () => {
    test("should convert mph to km/h and round the result", () => {
      expect(convertSpeed(60, "mph")).toBe(37);
      expect(convertSpeed(30.5, "mph")).toBe(19);
      expect(convertSpeed(0, "mph")).toBe(0);
    });

    test("should handle decimal values correctly", () => {
      expect(convertSpeed(45.7, "mph")).toBe(28);
      expect(convertSpeed(45.4, "mph")).toBe(28);
    });
  });
});
