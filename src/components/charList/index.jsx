import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const CharList = ({ characters, onFavourite, lastComicsRef }) => {
  const items = characters.map((item, i) => {
    let imgStyle = { objectFit: "cover" };
    if (
      item.thumbnail ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      imgStyle = { objectFit: "unset" };
    }

    const highlighted = (id) => {
      return characters.find((i) => i === id) ? "char__item_selected" : "";
    };

    if (characters.length === i + 1) {
      return (
        <li
          key={i}
          className={`char__item ${highlighted(item.id)}`}
          ref={lastComicsRef}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__info">
            <div className="char__name">{item.name}</div>
            <div className="char__divider"></div>
            <div
              className="char__favourite"
              onClick={() => onFavourite(item.id)}
            >
              Favourite
            </div>
          </div>
        </li>
      );
    }

    return (
      <li key={i} className={`char__item ${highlighted(item.id)}`}>
        <img src={item.thumbnail} alt={item.name} style={imgStyle} />
        <div className="char__info">
          <div className="char__name">{item.name}</div>
          <div className="char__divider"></div>
          <div className="char__favourite" onClick={() => onFavourite(item.id)}>
            Favourite
          </div>
        </div>
      </li>
    );
  });

  return <ul className="char__grid">{items}</ul>;
};
export default CharList;
