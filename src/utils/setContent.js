import Spinner from "../components/spinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyFavourites from "../components/CharFavourites/EmptyFavourites";

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

export default setContent;
