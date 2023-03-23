import { Helmet } from "react-helmet";
import AppBanner from "../appBanner/AppBanner";
import CharFavourites from "../charFavourites";
import ErrorBoundary from "../errorBoundary";

const FavouritesPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of favourite comics" />
        <title>Favourites page</title>
      </Helmet>
      <AppBanner page="favourites" />
      <div className="char__content">
        <ErrorBoundary>
          <CharFavourites />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default FavouritesPage;
