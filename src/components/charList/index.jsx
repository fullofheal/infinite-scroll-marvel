import React from "react";
import StarIcon from "./StarIcon";

const CharList = ({
  characters,
  onFavouriteToggle,
  lastComicsRef,
  favourites,
}) => {
  const items = characters.map((item, i) => {
    let imgStyle = { objectFit: "cover" };
    if (
      item.thumbnail ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      imgStyle = { objectFit: "unset" };
    }

    const isFavourite = favourites
      ? !!favourites.find((favId) => favId === item.id)
      : true;

    const isLastElem = characters.length === i + 1;

    return (
      <li
        key={i}
        className={`char__item ${isFavourite ? "char__item_selected" : ""}`}
        ref={isLastElem ? lastComicsRef : null}
      >
        <img src={item.thumbnail} alt={item.name} style={imgStyle} />
        <div className="char__info">
          <div className="char__name">{item.name}</div>
          <div className="char__divider"></div>
          <div
            className="char__favourite"
            onClick={() => onFavouriteToggle(item.id, isFavourite)}
          >
            {isFavourite ? "Remove" : "Favourite"}
          </div>
        </div>
        <div className="char__icon">
          <StarIcon />
        </div>
      </li>
    );
  });

  return <ul className="char__grid">{items}</ul>;
};
export default CharList;
