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

  const observer = useRef();
  const lastComicsRef = useCallback();

  const { getAllCharacters, process, setProcess } = useMarvelService();

  useEffect(() => {
    const existingFavourites = JSON.parse(
      localStorage.getItem("marvelFavourites")
    );

    if (existingFavourites) {
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

  const onFavourite = (id) => {
    const uniqueFavourites = [...new Set([...favourites, id])];
    setFavourites(uniqueFavourites);
    localStorage.setItem("marvelFavourites", JSON.stringify(uniqueFavourites));
  };

  const highlighted = (id) => {
    return favourites.find((i) => i === id) ? "char__item_selected" : "";
  };

  const elements = () => {
    return setContent(
      process,
      () => <CharList characters={charList} onFavourite={onFavourite} />,
      newItemLoading
    );
  };

  return (
    <div className="char__list">
      {elements()}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

// CharList.propTypes = {
//   onCharSelected: PropTypes.func.isRequired,
// };

export default Characters;
