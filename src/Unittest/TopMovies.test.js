import { render, screen, fireEvent } from "@testing-library/react";
import TopMovies from "../Components/TopMovies";

test("button click loads and shows movies (short version)", async () => {
  render(<TopMovies />);

  // בודקים שיש את הכפתור
  const button = screen.getByRole("button", { name: /Load Movies/i });
  expect(button).toBeInTheDocument();

  // לוחצים על הכפתור
  fireEvent.click(button);

  // בודקים שהסרטים נטענים (הקפדנו שהקומפוננטה לא תקרוס גם בלי ביקורות)
  expect(await screen.findByText(/Movie 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/Movie 2/i)).toBeInTheDocument();
});
