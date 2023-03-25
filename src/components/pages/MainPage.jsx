import React, { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import AppBanner from "../AppBanner";
import ErrorBoundary from "../ErrorBoundary";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import CharList from "../CharList";

const MainPage = () => {
  const [charList, setCharList] = useState([]);
  const [hideSpinner, setHideSpinner] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const { getAllCharacters, process, setProcess } = useMarvelService();

  const observer = useRef();
  const effectUsed = useRef(false);

  useEffect(() => {
    if (effectUsed.current === false) {
      const existingFavourites = JSON.parse(
        localStorage.getItem("marvelFavourites")
      );

      if (existingFavourites && existingFavourites.length) {
        setFavourites(existingFavourites);
      }

      onRequest(offset, true);
      effectUsed.current = true;
    }
  }, []);

  const lastComicsRef = useCallback(
    (node) => {
      if (process === "loading") return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !charEnded) {
          onRequest(offset);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [process, charEnded]
  );

  const onRequest = (offset, initial) => {
    initial ? setHideSpinner(false) : setHideSpinner(true);
    updateList(offset);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    const charsWithImg = newCharList.filter(
      (char) =>
        char.thumbnail !==
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" &&
        char.thumbnail !==
          "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
    );
    setCharList((charList) => [...charList, ...charsWithImg]);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const updateList = (offset) => {
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onFavouriteToggle = (id, isFavourite) => {
    const uniqueFavourites = isFavourite
      ? favourites.filter((favId) => favId !== id)
      : [...new Set([...favourites, id])];
    setFavourites(uniqueFavourites);
    localStorage.setItem("marvelFavourites", JSON.stringify(uniqueFavourites));
  };

  const elements = () => {
    return setContent(
      process,
      () => (
        <CharList
          characters={charList}
          onFavouriteToggle={onFavouriteToggle}
          lastComicsRef={lastComicsRef}
          favourites={favourites}
        />
      ),
      hideSpinner
    );
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel characters information" />
        <title>Marvel information portal</title>
      </Helmet>
      <AppBanner page="main" />
      <div className="char__content">
        <ErrorBoundary>{elements()}</ErrorBoundary>
      </div>
    </>
  );
};

// CharList.propTypes = {
//   onCharSelected: PropTypes.func.isRequired,
// };

export default MainPage;
