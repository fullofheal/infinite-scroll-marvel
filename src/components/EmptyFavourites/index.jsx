import mjolnir from "../../resources/img/mjolnir.png";

const EmptyFavourites = () => {
  return (
    <div className="char__empty-favourites">
      <p className="char__title">
        You don't have any favourite comics so far
        <br />
      </p>
      <p className="char__title">Do you want to get back and select a few?</p>
      <img src={mjolnir} alt="mjolnir" className="char__decoration" />
    </div>
  );
};

export default EmptyFavourites;
