import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Banner from "../Banner";
import ErrorBoundary from "../ErrorBoundary";
import useMarvelService from "../../services/marvelService";
import setContent from "../../utils/setContent";
import CharList from "../CharList";

const FavouritesPage = () => {
  const [favouritesData, setFavouritesData] = useState([]);

  const navigate = useNavigate();
  const { getCharacter, process, setProcess } = useMarvelService();

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("marvelFavourites"));
    if (favourites && Object.keys(favourites).length) {
      const favouritesArr = Object.keys(favourites);
      fetchFavourites(favouritesArr);
    } else {
      setProcess("empty");
    }
  }, []);

  const fetchFavourites = (favourites) => {
    favourites.forEach((charId) => {
      getCharacter(charId)
        .then((char) => {
          setFavouritesData((items) => {
            return items.find((item) => item.id === char.id)
              ? items
              : [...items, char];
          });
        })
        .then(() => setProcess("loaded"));
    });
  };

  const onRemove = (id) => {
    const filteredFavs = favouritesData.filter((char) => char.id !== id);
    setFavouritesData(filteredFavs);
    const favouritesIds = filteredFavs.reduce((acc, cur) => {
      acc[cur.id] = cur.id;
      return acc;
    }, {});
    localStorage.setItem("marvelFavourites", JSON.stringify(favouritesIds));
    if (!filteredFavs.length) {
      setProcess("empty");
    }
  };

  const elements = () => {
    return setContent(
      process,
      () => (
        <CharList characters={favouritesData} onFavouriteToggle={onRemove} />
      ),
      false
    );
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of favourite comics" />
        <title>Favourites page</title>
      </Helmet>
      <Banner page="favourites" />
      <div className="char__content">
        <ErrorBoundary>
          <div className="char__list">
            {elements()}
            <button
              className="button button__main button__long"
              onClick={() => navigate("/")}
            >
              <div className="inner">Get back to scrolling!</div>
            </button>
          </div>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default FavouritesPage;
