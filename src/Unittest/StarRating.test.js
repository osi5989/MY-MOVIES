import { render, screen, fireEvent } from "@testing-library/react";
import StarRating from "../Components/StarRating";

test("calls onRate with correct value when a star is clicked", () => {
  const mockOnRate = jest.fn();
  render(<StarRating value={0} onRate={mockOnRate} />);

  // בוחרים את הכוכב השלישי לפי data-testid
  const thirdStar = screen.getByTestId("star-3");
  fireEvent.click(thirdStar);

  expect(mockOnRate).toHaveBeenCalledWith(3);
});
