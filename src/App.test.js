import { render, screen } from "@testing-library/react";
import App from "./App";

test('renders Movie Rating App title', () => {
  render(<App />);
  const titleElement = screen.getByText(/movie rating app/i);
  expect(titleElement).toBeInTheDocument();
});
