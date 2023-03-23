import mjolnir from "../../resources/img/mjolnir.png";

const EmptyFavourites = () => {
  return (
    <div className="randomchar__static">
      <p className="randomchar__title">
        You don't have any favourite comics so far
        <br />
      </p>
      <p className="randomchar__title">
        Do you want to get back and select a few?
      </p>
      <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
    </div>
  );
};

export default EmptyFavourites;
