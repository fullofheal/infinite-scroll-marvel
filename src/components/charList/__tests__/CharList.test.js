import "@testing-library/jest-dom";
import { cleanup, screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import CharList from "../index";

afterEach(() => {
  cleanup();
});

const customCharacter = {
  comics: [],
  description: "Description is not included",
  id: 1010338,
  name: "Captain Marvel (Carol Danvers)",
  thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/6/80/5269608c1be7a.jpg",
};

const favouritesIds = {
  1009224: 1009224,
  1010338: 1010338,
  1011095: 1011095,
};

const onFavouriteToggle = () => {};
const lastComicsRef = () => {};

test("should render CharList component", () => {
  render(
    <CharList
      characters={[customCharacter]}
      onFavouriteToggle={onFavouriteToggle}
      lastComicsRef={lastComicsRef}
      favourites={favouritesIds}
    />
  );
  const CharListComponent = screen.getByTestId("CharList");
  expect(CharListComponent).toBeInTheDocument();
});

test("should render mocked character within the component", () => {
  render(
    <CharList
      characters={[customCharacter]}
      onFavouriteToggle={onFavouriteToggle}
      lastComicsRef={lastComicsRef}
      favourites={favouritesIds}
    />
  );
  const CharListComponent = screen.getByTestId("CharList");
  expect(CharListComponent).toHaveTextContent("Captain Marvel (Carol Danvers)");
});

test("should display mocked character as favourite within the component", () => {
  render(
    <CharList
      characters={[customCharacter]}
      onFavouriteToggle={onFavouriteToggle}
      lastComicsRef={lastComicsRef}
      favourites={favouritesIds}
    />
  );
  const CharListComponent = screen.getByTestId("CharList");
  const StarIconComponent = screen.getByTestId("StarIcon");
  expect(CharListComponent).toContainElement(StarIconComponent);
});

test("CharList matches snapshot", () => {
  const tree = renderer
    .create(
      <CharList
        characters={[customCharacter]}
        onFavouriteToggle={onFavouriteToggle}
        lastComicsRef={lastComicsRef}
        favourites={favouritesIds}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
