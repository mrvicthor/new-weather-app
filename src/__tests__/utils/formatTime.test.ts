import { formatTime } from "../../utils/formatTime";

describe("formatTime", () => {
  test("should format time with single digit hour correctly (< 10)", () => {
    const input = "9/26/2025, 09 AM";
    const expectedOutput = "9 AM";
    expect(formatTime(input)).toBe(expectedOutput);
  });

  test("should format time with single digit hour correctly (<10) in PM", () => {
    const input = "9/26/2025, 09 PM";
    const expectedOutput = "9 PM";
    expect(formatTime(input)).toBe(expectedOutput);
  });

  test("should keep double digit hour unchanged", () => {
    const input = "9/26/2025, 10 AM";
    const expectedOutput = "10 AM";
    expect(formatTime(input)).toBe(expectedOutput);
  });

  it("should handle boundary at hour 10", () => {
    const input1 = "Today 09 AM";
    const input2 = "Today 10 AM";
    expect(formatTime(input1)).toBe("9 AM");
    expect(formatTime(input2)).toBe("10 AM");
  });
});
