import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";
// https://github.com/testing-library/jest-dom/
import "@testing-library/jest-dom";

test("renders App component", () => {
  render(<App />);
  // https://testing-library.com/docs/queries/about/#textmatch
  const element = screen.getByText(/Hello World/);
  // console.log(element.innerHTML);
  expect(element).not.toBeNull();
  expect(element).toBeInTheDocument();
});
