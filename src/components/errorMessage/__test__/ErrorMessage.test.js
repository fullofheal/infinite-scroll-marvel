import "@testing-library/jest-dom";
import { cleanup, screen, render } from "@testing-library/react";
import ErrorMessage from "..";
import ErrorBoundary from "../../ErrorBoundary";
import CharList from "../../CharList";

afterEach(() => {
  cleanup();
});

const favouritesIds = {
  1009224: 1009224,
  1010338: 1010338,
  1011095: 1011095,
};

const onFavouriteToggle = () => {};
const lastComicsRef = () => {};

test("should render ErrorBoundary component", () => {
  render(<ErrorMessage />);
  const ErrorMessageComponent = screen.getByTestId("ErrorMessage");
  expect(ErrorMessageComponent).toBeInTheDocument();
});

test("should render ErrorBoundary component when invalid characters are passed to CharList", () => {
  render(
    <ErrorBoundary>
      <CharList
        characters={"invalid characters"}
        onFavouriteToggle={onFavouriteToggle}
        lastComicsRef={lastComicsRef}
        favourites={favouritesIds}
      />
    </ErrorBoundary>
  );
  const ErrorMessageComponent = screen.getByTestId("ErrorMessage");
  expect(ErrorMessageComponent).toBeInTheDocument();
});
