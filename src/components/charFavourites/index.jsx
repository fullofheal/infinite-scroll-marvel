import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import CharList from "../CharList";

const CharFavourites = () => {
  const [favourites, setFavourites] = useState([]);

  const navigate = useNavigate();
  const { getCharacter, process, setProcess } = useMarvelService();

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("marvelFavourites"));
    if (favourites && favourites.length) {
      fetchFavourites(favourites);
    } else {
      setProcess("empty");
    }
    console.log("render");
  }, []);

  // async function fetchFavourites(favourites) {
  //   for (let id of favourites) {
  //     const char = await getCharacter(id);
  //     setFavourites((items) => {
  //       return items.find((item) => item.id === char.id)
  //         ? items
  //         : [...items, char];
  //     });
  //   }
  //   setProcess("confirmed");
  // }
  async function fetchFavourites(favourites) {
    for (let id of favourites) {
      const char = await getCharacter(id);
      setFavourites((items) => {
        return items.find((item) => item.id === char.id)
          ? items
          : [...items, char];
      });
    }
    setProcess("confirmed");
  }

  const onRemove = (id) => {
    const filteredFavs = favourites.filter((char) => char.id !== id);
    setFavourites(filteredFavs);
    localStorage.setItem(
      "marvelFavourites",
      JSON.stringify(filteredFavs.map((char) => char.id))
    );
  };

  const elements = () => {
    return setContent(
      process,
      () => <CharList characters={favourites} onFavouriteToggle={onRemove} />,
      false
    );
  };

  return (
    <div className="char__list">
      {elements()}
      <button
        className="button button__main button__long"
        onClick={() => navigate("/")}
      >
        <div className="inner">Get back to scrolling!</div>
      </button>
    </div>
  );
};

// CharList.propTypes = {
//   onCharSelected: PropTypes.func.isRequired,
// };

export default CharFavourites;
