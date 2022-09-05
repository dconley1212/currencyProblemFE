import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("renders app", () => {
  render(<App />);
});

test("form, file input, text area, and submit button are in the DOM", () => {
  render(<App />);

  const form = screen.getByRole("form", { name: /currency info/i });
  const inputFile = screen.getByLabelText("Upload your data");
  const textArea = screen.getByLabelText("Add your data below");
  const button = screen.getByRole("button", { name: "Submit" });

  expect(form).toBeInTheDocument();
  expect(inputFile).toBeInTheDocument();
  expect(textArea).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("testing textarea has a value when changed", () => {
  render(<App />);

  const textArea = screen.getByLabelText("Add your data below");
  fireEvent.change(textArea, { target: { value: "2222200533351113001100" } });

  expect(textArea.value).toBe("2222200533351113001100");
});
