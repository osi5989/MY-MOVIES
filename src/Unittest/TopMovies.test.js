import { render, screen, fireEvent } from "@testing-library/react";
import TopMovies from "../Components/TopMovies";

test("button click loads and shows movies", async () => {
  render(<TopMovies />);

  // הכפתור האמיתי כפי שמופיע בקומפוננטה
  const button = screen.getByRole("button", { name: /Show Top Movies/i });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  // מחכים לטעינת הסרטים (במקום Movie 1/2, אפשר לבדוק שהכרטיסים קיימים)
  const movieCards = await screen.findAllByRole("img"); // assuming each movie has img
  expect(movieCards.length).toBeGreaterThan(0);
});
