import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import mjolnir from "../resources/img/mjolnir.png";

const setContent = (process, Component, hideSpinner) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return hideSpinner ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "empty":
      return <EmptyFavourites />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};

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

export default setContent;
