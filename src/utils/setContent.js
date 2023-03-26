import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyFavourites from "../components/EmptyFavourites";

const setContent = (process, Component, hideSpinner) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return hideSpinner ? <Component /> : <Spinner />;
    case "loaded":
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
