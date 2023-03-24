import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import CharList from "../charList";

const Characters = () => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const { getAllCharacters, process, setProcess } = useMarvelService();

  const observer = useRef();

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
      console.log(node);
    },
    [process, charEnded]
  );

  useEffect(() => {
    const existingFavourites = JSON.parse(
      localStorage.getItem("marvelFavourites")
    );

    if (existingFavourites && existingFavourites.length) {
      setFavourites(existingFavourites);
    }

    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    updateList(offset);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;

    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading(false);
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
      newItemLoading
    );
  };

  return <div className="char__list">{elements()}</div>;
};

// CharList.propTypes = {
//   onCharSelected: PropTypes.func.isRequired,
// };

export default Characters;
