import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("form, file input, text area, and submit button are in the DOM", () => {
  render(<App />);

  const form = screen.getByRole("form");
  const inputFile = screen.getByLabelText("Upload your data");
  const textArea = screen.getByLabelText("Add your data below");
  const button = screen.getByRole("button", { name: "Submit" });

  expect(form).toBeInTheDocument();
  expect(inputFile).toBeInTheDocument();
  expect(textArea).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("tests textarea function that splits data string into and array", () => {});
