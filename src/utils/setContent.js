import Spinner from "../components/spinner";
import ErrorMessage from "../components/errorMessage";
import EmptyFavourites from "../components/charFavourites/EmptyFavourites";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
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
