import {
  formatTemperatureToFahrenheit,
  getDisplayTemperature,
} from "../../utils/formatTemperature";

describe("formatTemperatureToFahrenheit", () => {
  describe("when converting Celsius to Fahrenheit", () => {
    test("should convert and round correctly", () => {
      expect(formatTemperatureToFahrenheit(0)).toBe(32);
      expect(formatTemperatureToFahrenheit(100)).toBe(212);
      expect(formatTemperatureToFahrenheit(36.6)).toBe(98);
      expect(formatTemperatureToFahrenheit(-40)).toBe(-40);
    });
  });
});

describe("getDisplayTemperature", () => {
  describe('when selectedTemperature is "Fahrenheit"', () => {
    test("should convert Celsius to Fahrenheit and round correctly", () => {
      expect(getDisplayTemperature("Fahrenheit", 0)).toBe(32);
      expect(getDisplayTemperature("Fahrenheit", 100)).toBe(212);
      expect(getDisplayTemperature("Fahrenheit", 36.6)).toBe(98);
      expect(getDisplayTemperature("Fahrenheit", -40)).toBe(-40);
    });
  });

  describe('when selectedTemperature is "Celsius"', () => {
    test("should return the rounded Celsius temperature", () => {
      expect(getDisplayTemperature("Celsius", 0)).toBe(0);
      expect(getDisplayTemperature("Celsius", 100)).toBe(100);
      expect(getDisplayTemperature("Celsius", 36.6)).toBe(37);
      expect(getDisplayTemperature("Celsius", -40)).toBe(-40);
    });
  });
});
