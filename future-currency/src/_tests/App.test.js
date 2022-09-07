import { render, screen, fireEvent } from "@testing-library/react";
import App,  from "../App";

/* I added a few tests for what I was trying to accomplish but
ultimately found that TDD was harder than I imagined because I would
try and write the test but I am a visually person so I need to get in a 
better habit of writing tests before manually testing.
*/

test("renders app", () => {
  render(<App />);
});

test("form, file input, text area, and submit button are in the DOM", () => {
  render(<App />);

  const form = screen.getByTestId("form");
  const inputFile = screen.getByTestId("Upload Data");
  const textArea = screen.getByTestId("Add Data");
  const button = screen.getByText("Submit");

  expect(form).toBeInTheDocument();
  expect(inputFile).toBeInTheDocument();
  expect(textArea).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("testing textarea has a value when changed", () => {
  render(<App />);

  const textArea = screen.getByTestId("Add Data");
  fireEvent.change(textArea, { target: { value: "2222200533351113001100" } });

  expect(textArea.value).toBe("2222200533351113001100");
});

test("testing asynchronous call", () => {});
