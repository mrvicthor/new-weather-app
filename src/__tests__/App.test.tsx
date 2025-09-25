import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

test("renders App without crashing", () => {
  render(<App />);
  const heading = screen.getByRole("heading", {
    name: /how’s the sky looking today\?/i,
  });
  expect(heading).toBeInTheDocument();
});
