import { render, screen, fireEvent } from "@testing-library/react";
import App, { handleTextArea } from "../App";

test("renders app", () => {
  render(<App />);
});

test("form, file input, text area, and submit button are in the DOM", () => {
  render(<App />);

  // const form = screen.getByRole("form");
  const inputFile = screen.getByLabelText("Upload your data");
  const textArea = screen.getByLabelText("Add your data below");
  const button = screen.getByRole("button", { name: "Submit" });

  // expect(form).toBeInTheDocument();
  expect(inputFile).toBeInTheDocument();
  expect(textArea).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("tests textarea function that splits data string into and array", () => {
  render(<App />);

  const textArea = screen.getByLabelText("Add your data below");
  fireEvent.change(textArea, { target: { value: "2222200533351113001100" } });
  // const textAreaValue = textArea.value;
  // const handleChangeFunction = (textAreaValue) => textAreaValue.split(/\n/);

  const value = jest.fn(handleTextArea);

  expect(value.call()).toEqual([
    "2",
    "22",
    "2",
    "20",
    "05",
    "33",
    "35",
    "111",
    "300",
    "1100",
  ]);
});
